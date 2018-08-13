
let Letter = require("./Letter.js");
const Word = function (word) {

    this.createLetters = function () {
        let temp = [];

        // word.split("").forEach(char => {
        [...word].forEach(char => {
            let letter = new Letter(char);
            temp.push(letter);
        });
        return temp;
    };

    this.letters = this.createLetters();

    this.toString = function () {
        let temp = "";
        this.letters.forEach(letter => {
            temp += letter.printChar();
        });
        return temp;
    };

    this.resolveChars = function (userChar) {
        this.letters.forEach(letter => {
            letter.resolveChar(userChar);
        });
    }
};

module.exports = Word;