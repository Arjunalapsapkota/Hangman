
const Letter = function (character) {
    this.character = character;
    this.guessed = false;
    this.printChar = function () {
        return this.guessed ? this.character : "-";
    };
    this.resolveChar = function (userChar) {
        //if it's already guessed, skip it
        if (!this.guessed) {
            this.guessed = this.character == " " || this.character == userChar ? true : false;
        }
    }
}

module.exports = Letter;