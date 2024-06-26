function dateNow() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const dateNow = `${year}-${month}-${day}`;
    return dateNow;
}
module.exports = { dateNow };