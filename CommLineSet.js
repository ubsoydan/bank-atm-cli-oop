const readline = require("readline");

module.exports = class CommLineSet {
    static ask(question) {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        return new Promise((resolve) => {
            rl.question(`${question} `, (answer) => {
                resolve(answer);
                rl.close();
            });
        });
    }

    static print(text) {
        console.log(text);
    }
};
