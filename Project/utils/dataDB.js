const { dateNow } = require('./dateNow')
const fs = require('fs');
const DecorData = require('../utils/decorationData')
const path = require('path');
const sequelize = require('sequelize')
const { Op } = require('sequelize');
const Category = require('../models/category')
const Courses = require('../models/courses')
const SpecialConditions = require('../models/specialConditions')
const MainResult = require('../models/mainResult')
const Clients = require('../models/clients')
const ProgramsCourses = require('../models/programsCourses')
const Reviews = require('../models/reviews')
const Sold = require('../models/sold')
const ContentCourse = require('../models/contentCourse');
const mainResult = require('../models/mainResult');
const School = require('../models/school')

Category.hasMany(Courses, { foreignKey: 'category' });
Courses.belongsTo(Category, { foreignKey: 'category' });
Courses.belongsTo(School, { foreignKey: 'school' });
Clients.hasMany(Reviews, { foreignKey: 'id_client' });
Reviews.belongsTo(Clients, { foreignKey: 'id_client' });
Sold.belongsTo(Courses, { foreignKey: 'id_course', targetKey: 'id' });
Sold.belongsTo(Clients, { foreignKey: 'id_client' });
Reviews.belongsTo(Courses, { foreignKey: 'id_course', targetKey: 'id' });

class dataDB {

    static findAccount(login){
        return Clients.findOne({
            where: { login: login },
            attributes: ['id','login','number', 'password','role']
          })
    }
    
    static allCategory() {
        return Category.findAll()
    }
    static allCourse() {
        return Courses.findAll({
            include: [
                {
                    model: School,
                    attributes: ['name']
                }
            ],
        })
    }
    static categoryCourseById(id) {
        return Category.findOne({
            where: { id: id }
        })
    }
    static listCourseByCategory(id) {
        return Courses.findAll({
            where: { category: id },
        })
    }
    static courseById(idCourse) {
        return Courses.findOne({
            where: { id: idCourse },
            include: Category,
            include: [
                {
                    model: School,

                },
                {
                    model: Category
                }
            ],
        })
    }
    static async isBuyCourse(idCourse, idUser) {
        return await Sold.findOne({
            where: { id_course: idCourse, id_client: idUser }
        }) != null ? true : false;
    }
    static async isCreateReviewUser(idCourse, idUser) {
        return await Reviews.findOne({
            where: { id_course: idCourse, id_client: idUser }
        }) != null ? true : false;
    }
    static infoCourse(idCourse, mode) {
        if (mode == 'specialConditions') {
            return SpecialConditions.findAll({
                where: { id_course: idCourse }
            })
        }
        if (mode == 'mainResult') {
            return MainResult.findOne({
                where: { id_course: idCourse }
            })
        }
        if (mode == 'programCourse') {
            return ProgramsCourses.findAll({
                where: { id_course: idCourse }
            })
        }
    }
    static createAccount(name, lastname,email,phone,login,hashPassword){
        Clients.create({
            name: DecorData.capitalizeFirstLetter(name),
            last_name: DecorData.capitalizeFirstLetter(lastname),
            email: email.toLowerCase(),
            number: phone,
            login: DecorData.capitalizeFirstLetter(login),
            password: hashPassword
          })
    }
    static async listReviews(idCourse) {
        let reviews = [];
        await Reviews.findAll({
            where: { id_course: idCourse },
            include: Clients
        }).then(review => {
            reviews = review.map(review => review.get({ plain: true }));
        });
        return reviews
    }
    static infoUser(user) {
        return Clients.findOne({ where: { id: user } })
    }

    static buyCourse(idCourse, user) {
        const date = dateNow()
        return Sold.create({ id_course: idCourse, id_client: user, date_sold: date })
    }
    static checkReviewUser(idCourse, user) {
        return Reviews.findOne({ where: { id_course: idCourse, id_client: user } })
    }
    static reviewCreate(idCourse, user, textReview, score) {
        const date = dateNow()
        return Reviews.create({ id_client: user, id_course: idCourse, text_review: textReview, score: score, date_create: date })
    }
    static async listBuyCourses(user) {
        let buyCourses = [];
        await Sold.findAll({
            where: { id_client: user },
            include: [
                {
                    model: Courses,
                    attributes: ['id', 'name', 'school', 'description', 'count_lesson', 'time', 'img'],
                    include: [
                        {
                            model: School,
                            attributes: ['name']
                        }
                    ],
                }
            ],
        }).then(soldData => {
            buyCourses = soldData.map(item => item.toJSON());
        }).catch(err => {
            console.error(err);
        });
        return buyCourses;
    }
    static async userReviews(user) {
        let userReviews = [];
        await Reviews.findAll({
            where: { id_client: user },
            include: [
                {
                    model: Courses,
                    attributes: ['id', 'name', 'school', 'description', 'count_lesson', 'time', 'img'],
                    include: [
                        {
                            model: School,
                            attributes: ['name']
                        }
                    ],
                }
            ]
        }).then(reviewData => {
            userReviews = reviewData.map(item => {
                const reviewItem = item.toJSON();
                if (reviewItem.date_create) {
                    const dateParts = reviewItem.date_create.split('-');
                    reviewItem.date_create = `${dateParts[2].padStart(2, '0')}-${dateParts[1].padStart(2, '0')}-${dateParts[0]}`;
                }
                return reviewItem;
            }
            );
        }).catch(e => {
            console.error(e);
        });
        return userReviews;
    }
    static updateDataClient(name, lastname, email, user) {
        return Clients.update({
            name: name,
            last_name: lastname,
            email: email,
        }, {
            where: {
                id: user
            }
        }).then(() => {
            console.log('Запись успешно изменена');

        }).catch((e) => {
            console.error(e);
        });
    }
    static isClientFeedback(reviewId) {
        return Reviews.findOne(
            {
                where: { id: reviewId },
                attributes: ['id_client']
            },
        )
    }
    static reviewDataUpdate(review, estimation, edit) {
        const date = dateNow()
        return Reviews.update({
            text_review: review,
            score: estimation,
            date_create: date
        }, {
            where: {
                id: edit
            }
        }).then(() => {
            console.log('Запись успешно изменена');
        }).catch((e) => {
            console.error(e);
        })
    }
    static deleteReview(idRewiev) {
        return Reviews.destroy({
            where: {
                id: idRewiev
            }
        });
    }
    static linkVideoStart(idCourse) {
        return ContentCourse.findOne({
            where: { id_course: idCourse, number_lesson: 1 },
            attributes: ['link_video', 'name_lesson', 'id_course']
        })
    }
    static listLesson(idCourse) {
        return ContentCourse.findAll({ where: { id_course: idCourse } })
    }
    static linkVideo(idCourse, numberLesson) {
        return ContentCourse.findOne({ where: { id_course: idCourse, number_lesson: numberLesson }, attributes: ['link_video', 'name_lesson', 'id_course'] })
    }
    static async popularCourses() {
        let popularCourses = [];
        await Sold.findAll({
            attributes: ['id_course', [sequelize.fn('COUNT', 'id_course'), 'total_count']],
            group: ['id_course'],
            order: [[sequelize.literal('total_count'), 'DESC']],
            limit: 5,
            include: [
                {
                    model: Courses,
                    include: [
                        {
                            model: School,
                            attributes: ['name']
                        }
                    ],
                }
            ]
        }).then(data => {
            popularCourses = data.map(item => item.toJSON());
        }).catch(err => {
            console.error(err);
        });
        return popularCourses
    }
    static async filterCourse(school, category, score = '', min_price = '', max_price = '', courseName = '') {
        var response = [];

        await Courses.findAll({
            include: [
                {
                    model: School,
                    attributes: ['name']
                },
                {
                    model: Category,
                    attributes: ['name_category']
                }
            ]

        }).then(courses => {
            response = courses.map(course => course.dataValues)
        });
        if (school != '') {
            response = response.filter(p => p.School.dataValues.name == school)
        }
        if (category != 'all') {
            response = response.filter(p => p.Category.name_category == category)
        }
        if (score != '') {
            response = response.filter(p => p.average_score >= score)
        }
        if (min_price != '' && max_price != '') {
            response = response.filter(p => p.price >= min_price && p.price <= max_price)
        }
        if (courseName != '') {
            response = response.filter(p => p.name.toLowerCase().includes(courseName.toLowerCase()))
        }
        return response
    }
    static availabilityLecture(idCourse, idLesson) {
        return ContentCourse.findOne({ where: { id_course: idCourse, number_lesson: idLesson } })
    }
    static getLinkTgChat(idCourse) {
        return Courses.findOne({ where: { id: idCourse }, attributes: ['link_tg'] })
    }
    static async getListNameCourses() {
        try {
            const data = await Courses.findAll({ attributes: ['name'] });
            const listNameCourses = data.map(item => item.name);
            const uniqueListNameCourses = [...new Set(listNameCourses)];
            return uniqueListNameCourses;
        } catch (err) {
            console.error(err);
            return [];
        }
    }

    static getListNameSchool() {
        return School.findAll({ attributes: ['name'] })
    }
    static async getAllOrders() {
        let orders = [];
        await Sold.findAll({
            attributes: ['id', 'date_sold'],
            include: [
                {
                    model: Courses,
                    attributes: ['name', 'price'],
                    include: [
                        {
                            model: Category,
                            attributes: ['name_category']
                        },
                        {
                            model: School,
                            attributes: ['name']
                        }

                    ]
                },
                {
                    model: Clients,
                    attributes: ['name', 'last_name']
                }
            ]
        }).then(data => {
            orders = data.map(data => data.toJSON());

        });
        return orders
    }
    static async filterOrders(school, category, courseName, date,) {
        let allOrders = await this.getAllOrders();

        if (school != '') {
            allOrders = allOrders.filter(p => p.Course.School.name == school)
        }
        if (category != '') {
            allOrders = allOrders.filter(p => p.Course.Category.name_category == category)
        }
        if (courseName != '') {
            allOrders = allOrders.filter(p => p.Course.name.toLowerCase().includes(courseName.toLowerCase()))
        }
        if (date != '') {
            const today = new Date();
            if (date == `1`) {
                const startMonth = new Date(today.getFullYear(), today.getMonth(), 1);
                allOrders = allOrders.filter(element => new Date(element.date_sold) >= startMonth && new Date(element.date_sold) <= today);
                return allOrders
            }
            if (date == '2') {
                const startThreeMonthAgo = new Date(today.getFullYear(), today.getMonth() - 3, today.getDate());
                allOrders = allOrders.filter(element => new Date(element.date_sold) >= startThreeMonthAgo && new Date(element.date_sold) <= today);
                return allOrders
            }
            if (date == '3') {
                const yearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
                allOrders = allOrders.filter(element => new Date(element.date_sold) >= yearAgo && new Date(element.date_sold) <= today);
                return allOrders
            }
        }
        return allOrders
    }
    static async addCourse(name, school_name, description, time, count_lesson, price, category, program_course, img_course, link_tg, condition_course, main_result, name_lesson, video_lesson) {

        var isCourse = await Courses.findOne({ where: { name: name, school: school_name } })
        var isAdd = false;
        if (isCourse != null || video_lesson == null) {
            isAdd = false;
        }
        else {
            var whetherСategory = await Category.findOne({ where: { name_category: DecorData.capitalizeAfterSpace(category) }, attributes: ['id'] })
            var newCategory
            if (whetherСategory == null) {
                await Category.create({ name_category: DecorData.capitalizeAfterSpace(category) })
                var item = await Category.findOne({ where: { name_category: DecorData.capitalizeAfterSpace(category) }, attributes: ['id'] })
                newCategory = item.dataValues.id
            }
            else {
                newCategory = whetherСategory.dataValues.id
            }

            const isName = await Courses.findAll({ where: { name: DecorData.formatString(name) }, attributes: ['name'] })
            const formatImg = img_course.originalname.slice(img_course.originalname.lastIndexOf('.') + 1);
            var nameImg;
            if (isName) {
                nameImg = `${DecorData.formatString(name).replace(/ /g, '')}_${isName.length + 1}.${formatImg}`;
            }
            else {
                nameImg = `${DecorData.formatString(name).replace(/ /g, '')}.${formatImg}`;
            }

            const pathFolderImg = path.join(__dirname, '../public/assets/imgCourses');
            const timeFilesPath = path.join(__dirname, '../public/assets/timeFiles');

            fs.readdir(timeFilesPath, (err, files) => {
                if (err) {
                    console.error('Ошибка чтения директории:', err);
                    return;
                }

                const timeFilePath = files.find(filename => filename.includes('img_course'));

                if (timeFilePath) {
                    console.log('Найден файл:', timeFilePath);

                    const imgFilePath = path.join(pathFolderImg, nameImg);

                    fs.rename(path.join(timeFilesPath, timeFilePath), imgFilePath, (err) => {
                        if (err) {
                            console.error('Ошибка переименования файла:', err);
                            return;
                        }

                        console.log('Файл успешно переименован и перемещен');
                    });
                } else {
                    console.log('Файл с подстрокой "img_course" не найден');
                }
            });

            var schoolName = await School.findOne({ where: { name: DecorData.capitalizeAfterSpace(school_name) } })
            var schoolNameForTableCourses;
            if (schoolName != null) {
                schoolNameForTableCourses = schoolName.dataValues.id
            }
            else {
                await School.create({
                    name: DecorData.capitalizeAfterSpace(school_name)
                })
                var newNameChool = await School.findOne({ where: { name: DecorData.capitalizeAfterSpace(school_name) } })
                schoolNameForTableCourses = newNameChool.dataValues.id
            }

            await Courses.create({
                name: DecorData.formatString(name),
                school: schoolNameForTableCourses,
                description: DecorData.formatString(description),
                time: time,
                count_lesson: count_lesson,
                price: price,
                category: newCategory,
                img: nameImg,
                link_tg: link_tg
            })
            var idNewCourse = await Courses.findOne({ where: { school: schoolNameForTableCourses, name: DecorData.formatString(name) }, attributes: ['id'] })


            if (Array.isArray(program_course)) {
                const programCourse = program_course.map(item => ({
                    id_course: idNewCourse.dataValues.id,
                    program_step: DecorData.formatString(item)
                }));
                await ProgramsCourses.bulkCreate(programCourse);
            }
            else {
                await ProgramsCourses.create({
                    id_course: idNewCourse.dataValues.id,
                    program_step: DecorData.formatString(program_course)
                });
            }


            if (Array.isArray(condition_course)) {
                const specialConditions = condition_course.map(item => ({
                    id_course: idNewCourse.dataValues.id,
                    condition_course: DecorData.formatString(item)
                }));

                await SpecialConditions.bulkCreate(specialConditions);
            }
            else {
                await SpecialConditions.create({
                    id_course: idNewCourse.dataValues.id,
                    condition_course: DecorData.formatString(condition_course)
                });
            }

            await mainResult.create({
                id_course: idNewCourse.dataValues.id,
                result: DecorData.formatString(main_result)
            })

            /*получение и сохранение видео */

            const sourceFolderPath = path.join(__dirname, '../public/assets/timeFiles');
            const destinationFolderPath = path.join(__dirname, '../public/assets/video');
            var newFileName;
            var countLesson = 1;
            var nameVideoList = [];

            fs.readdir(sourceFolderPath, async (err, files) => {
                if (err) {
                    console.error('Ошибка чтения папки:', err);
                    return;
                }

                // Обрабатываем каждый файл в sourceFolderPath
                for (const file of files) {
                    const sourceFilePath = path.join(sourceFolderPath, file);
                    if (isName != null) {
                        newFileName = `${DecorData.formatString(name)}${isName.length + 1}-lesson${countLesson}.${file.split('.').pop()}`;
                    } else {
                        newFileName = `${DecorData.formatString(name)}-lesson${countLesson}.${file.split('.').pop()}`;
                    }

                    const destinationFilePath = path.join(destinationFolderPath, newFileName);

                    try {
                        await moveFile(sourceFilePath, destinationFilePath);
                        console.log(`Файл ${file} успешно перемещен и переименован в ${newFileName}`);
                    } catch (err) {
                        console.error(`Ошибка при перемещении файла ${file}:`, err);
                        continue;
                    }

                    countLesson++;
                }
                insertRecordsToDatabase();
            });

            // Асинхронная функция для перемещения файла
            async function moveFile(source, destination) {
                return new Promise((resolve, reject) => {
                    fs.rename(source, destination, (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                });
            }

            // Функция вставки записей в базу данных
            function insertRecordsToDatabase() {
                fs.readdir(destinationFolderPath, async (err, files) => {
                    if (err) {
                        console.error('Ошибка чтения папки:', err);
                        return;
                    }

                    var partName;
                    if (isName) {
                        partName = DecorData.formatString(name) + `${isName.length + 1}`;
                    } else {
                        partName = DecorData.formatString(name);
                    }

                    nameVideoList = files.filter(file => file.includes(`${partName}`));

                    for (let i = 0; i < nameVideoList.length; i++) {
                        try {
                            const content = await ContentCourse.create({
                                id_course: idNewCourse.dataValues.id,
                                number_lesson: i + 1,
                                name_lesson: Array.isArray(name_lesson) ? DecorData.formatString(name_lesson[i]) : DecorData.formatString(name_lesson),
                                link_video: nameVideoList[i]
                            });
                            console.log('Содержимое курса успешно создано:', content);
                        } catch (err) {
                            console.error('Ошибка при создании содержимого курса:', err);
                        }
                    }
                });
            }



            isAdd = true
        }
        if (!isAdd) {
            console.log('ERROR')
            const timeFilesPath = path.join(__dirname, '../public/assets/timeFiles');
            if (fs.existsSync(timeFilesPath)) {
                fs.readdirSync(timeFilesPath).forEach((file) => {
                    const curPath = path.join(timeFilesPath, file);
                    if (fs.lstatSync(curPath).isDirectory()) {
                        deleteFolderRecursive(curPath);
                    } else {
                        fs.unlinkSync(curPath);
                    }
                });
            }
            console.log(`Папка ${timeFilesPath} успешно очищена.`);
        }
        return isAdd
    }
    static async deleteCourse(idCourse) {

        /*Удаление файлов из папок сервера */

        var nameImg = await Courses.findOne({
            where: { id: idCourse },
            attributes: ['img']
        })
        if (nameImg != null) {
            var nameVideo = [];
            await ContentCourse.findAll({
                where: { id_course: idCourse },
                attributes: ['link_video']
            }).then(data => {
                nameVideo = data.map(item => item.link_video);
            });

            const fileImgPath = `${path.join(__dirname, '../public/assets/imgCourses')}/${nameImg.dataValues.img}`;
            fs.unlink(fileImgPath, (err) => {
                if (err) {
                    console.error('Ошибка при удалении файла:', err);
                    return;
                }
                console.log('Файл успешно удален');
            });


            const folderPath = path.join(__dirname, '../public/assets/video')
            fs.readdir(folderPath, (err, files) => {
                if (err) {
                    console.error('Ошибка чтения папки:', err);
                    return;
                }
                files.forEach(file => {
                    if (nameVideo.includes(file)) {
                        const filePath = path.join(folderPath, file);
                        fs.unlink(filePath, err => {
                            if (err) {
                                console.error(`Ошибка при удалении файла ${file}:`, err);
                            } else {
                                console.log(`Файл ${file} успешно удален.`);
                            }
                        });
                    }
                });
            });

            await Courses.destroy({ where: { id: idCourse } })

            return true
        }
        else {
            return false
        }
    }
    static async editCourse(idCourse, name, school_name, description, time, count_lesson, price, category, program_course, img_course, link_tg, condition_course, main_result) {

        var success = false;
        try {
            const existingSchool = await School.findOne({ where: { name: school_name }, attributes: ['id'] })
            var schoolForTableCourses;
            if (existingSchool != null) {
                schoolForTableCourses = existingSchool.dataValues.id
            }
            else {
                await School.create({
                    name: DecorData.capitalizeAfterSpace(school_name)
                })
                const newSchoolId = await School.findOne({ where: { name: DecorData.capitalizeAfterSpace(school_name) }, attributes: ['id'] })
                schoolForTableCourses = newSchoolId.dataValues.id
            }

            const existingCategory = await Category.findOne({ where: { name_category: category }, attributes: ['id'] })
            var CategoryForTableCourses;
            if (existingCategory != null) {
                CategoryForTableCourses = existingCategory.dataValues.id
            }
            else {
                await Category.create({ name_category: DecorData.capitalizeAfterSpace(category) })
                var newCategoryId = await Category.findOne({ where: { name_category: DecorData.capitalizeAfterSpace(category) }, attributes: ['id'] })
                CategoryForTableCourses = newCategoryId.dataValues.id
            }

            const oldImgName = await Courses.findOne({ where: { id: idCourse }, attributes: ['img'] })
            const isName = await Courses.findAll({ where: { name: DecorData.formatString(name) }, attributes: ['name'] })
            const directoryImg = path.join(__dirname, '../public/assets/imgCourses');
            const formatImg = img_course.originalname.slice(img_course.originalname.lastIndexOf('.') + 1);
            var nameImg;
            if (isName) {
                nameImg = `${DecorData.formatString(name).replace(/ /g, '')}_${isName.length + 1}.${formatImg}`;
            }
            else {
                nameImg = `${DecorData.formatString(name).replace(/ /g, '')}.${formatImg}`;
            }

            /*удаление старой картинки */

            const filePath = path.join(directoryImg, oldImgName.dataValues.img);
            if (fs.existsSync(filePath)) {
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error('Ошибка при удалении файла:', err);
                    } else {
                        console.log('Файл успешно удален');
                    }
                });
            } else {
                console.log('Файл не найден');
            }

            /*Добавление новой картинки*/

            const timeFilesPath = path.join(__dirname, '../public/assets/timeFiles');
            fs.readdir(timeFilesPath, (err, files) => {
                if (err) {
                    console.error('Ошибка чтения директории:', err);
                    return;
                }

                const timeFilePath = files.find(filename => filename.includes('img_course'));

                if (timeFilePath) {
                    console.log('Найден файл:', timeFilePath);

                    const imgFilePath = path.join(directoryImg, nameImg);

                    fs.rename(path.join(timeFilesPath, timeFilePath), imgFilePath, (err) => {
                        if (err) {
                            console.error('Ошибка переименования файла:', err);
                            return;
                        }

                        console.log('Файл успешно переименован и перемещен');
                    });
                } else {
                    console.log('Файл с подстрокой "img_course" не найден');
                }
            });

            await Courses.update({
                name: DecorData.formatString(name),
                school: schoolForTableCourses,
                description: DecorData.formatString(description),
                time: time,
                count_lesson: count_lesson,
                price: price,
                category: CategoryForTableCourses,
                img: nameImg,
                link_tg: link_tg
            }, {
                where: {
                    id: idCourse
                }
            });

            /*Программа курса */
            await ProgramsCourses.destroy({
                where: { id_course: idCourse }
            })

            if (Array.isArray(program_course)) {
                const programCourse = program_course.map(item => ({
                    id_course: idCourse,
                    program_step: DecorData.formatString(item)
                }));
                await ProgramsCourses.bulkCreate(programCourse);
            }
            else {
                await ProgramsCourses.create({
                    id_course: idCourse,
                    program_step: DecorData.formatString(program_course)
                });
            }
            /*Специальные условия курса */

            await SpecialConditions.destroy({
                where: { id_course: idCourse }
            })
            if (Array.isArray(condition_course)) {
                const specialConditions = condition_course.map(item => ({
                    id_course: idCourse,
                    condition_course: DecorData.formatString(item)
                }));

                await SpecialConditions.bulkCreate(specialConditions);
            }
            else {
                await SpecialConditions.create({
                    id_course: idCourse,
                    condition_course: DecorData.formatString(condition_course)
                });
            }

            await mainResult.update({
                id_course: idCourse,
                result: DecorData.formatString(main_result)
            }, {
                where: {
                    id_course: idCourse
                }
            });
            success = true;
        } catch (error) {
            console.log(error)
            const timeFilesPath = path.join(__dirname, '../public/assets/timeFiles');
            if (fs.existsSync(timeFilesPath)) {
                fs.readdirSync(timeFilesPath).forEach((file) => {
                    const curPath = path.join(timeFilesPath, file);
                    if (fs.lstatSync(curPath).isDirectory()) {
                        deleteFolderRecursive(curPath);
                    } else {
                        fs.unlinkSync(curPath);
                    }
                });
            }
            success = false
        }
        return success
    }
}
module.exports = dataDB


