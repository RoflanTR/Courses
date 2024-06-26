class decorationData {
    static capitalizeFirstLetter(word) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
    
    static formatString(str) {
        const sentences = str.split('. ');
    
        for (let i = 0; i < sentences.length; i++) {
            const words = sentences[i].split(' ');
    
            for (let j = 0; j < words.length; j++) {
                if (j === 0 || words[j - 1].endsWith('.')) {
                    words[j] = words[j].charAt(0).toUpperCase() + words[j].slice(1).toLowerCase();
                } else {
                    words[j] = words[j].toLowerCase();
                }
            }
    
            sentences[i] = words.join(' ');
        }
    
        const formattedString = sentences.join('. ');
        return formattedString.replace(/\s+/g, ' '); // Удаляем лишние пробелы
    }
    
    static capitalizeAfterSpace(str) {
        const words = str.split(' ');
    
        const formattedWords = words.map(word => {
            if (word.length > 0) {
                return word.charAt(0).toUpperCase() + word.slice(1);
            } else {
                return word;
            }
        });
    
        const formattedStr = formattedWords.join(' ');
        return formattedStr.replace(/\s+/g, ' '); // Удаляем лишние пробелы
    }
    
}
module.exports = decorationData