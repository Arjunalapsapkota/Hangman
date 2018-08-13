
const Word = require("./Word.js");
const inquirer = require("inquirer");


//LIST OF WORDS 
let Words = [
    `GAME OF THRONES`,
    'GREYS ANATOMY',
    `FRIENDS`,
    `HOUSE OF CARDS`,
    `PRISON BREAK`,
    `THE SOPRANOS`,
    `SEINFELD`,
    `THE TWILIGHT ZONE`,
    `ALL IN THE FAMILY`,
    `MAD MEN`
];

const GUESS_LIMIT = 5; 
let numGuesses = GUESS_LIMIT;
let wins = 0;
let losses = 0;
let exit = false;
let guessHistory = "";


function showStats() {
    console.log(`\n\t\tWins: ${wins}\n\t\tLosses: ${losses}\n`);
}


function guessWord(word) {
    if (word.toString().includes("-") && numGuesses > 0) {

        console.log(`\nword: ${word.toString()}`);
        inquirer.prompt([
            {
                type: "input",
                name: "userChar",
                message: `Guess a letter: `,
                validate: (ans) => {
                    if (ans.length > 1) {
                        return "\nError:  Only One character is accepted\n";
                    }
                    ans = ans.toUpperCase();
                    if (guessHistory.includes(ans)) {
                        return "\nINCORRECT,  You already guessed that letter\n";
                    }
                    else {
                        guessHistory += ans;
                        return true;
                    }
                }
            }
        ]).then(ans => {
            //Save current guess
            let currentGuess = word.toString();
            //update characters that match user input
            word.resolveChars(ans.userChar.toUpperCase());
            //compare currentGuess with newGuess
            if (currentGuess == word.toString()) {
                numGuesses--;
                console.log(`INCORRECT\nRemaining guesses: ${numGuesses}`);
            }
            else {
                console.log(`CORRECT!`);
            }
            guessWord(word);
        });
    }
    else {
        if (numGuesses > 0) {

            console.log(`\n\t\t${word.toString()}\n\t\t----You win!----\n`);
            wins++;
        }
        else {
            console.log(`\n\t\t----You lose----\n`);
            losses++;
        }
        showStats();
        start();
    }
}


function start() {
    console.log('\n\n------------Hangman - Famous TV Series------------');

    if (!exit) {
        inquirer.prompt([
            {
                type: "list",
                name: "option",
                message: "\n\nSelect your option",
                choices: [`NEW GAME`, `STATS`, `EXIT`]
            }
        ]).then(ans => {

            switch (ans.option) {
                case "NEW GAME":
                    numGuesses = GUESS_LIMIT;
                    guessHistory = "";
                    let word = new Word(Words[Math.floor(Math.random() * Words.length)]);
                    word.resolveChars("");
                    guessWord(word);
                    break;

                case "STATS":
                    showStats();
                    start();
                    break;

                case "EXIT THE GAME":
                    exit = true;
                    break;
            }
        });
    }
}


start();
