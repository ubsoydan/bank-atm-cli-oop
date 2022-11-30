const fs = require("fs");

module.exports = class FileSystem {
    static read(path) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, (err, data) => {
                err ? reject(err) : undefined;
                // this.#balance = parsefloat(data);
                resolve(data);
            });
        });
    }

    static write(path, content) {
        return new Promise((resolve, reject) => {
            fs.writeFile(path, content.toString(), (err) => {
                err ? reject(err) : resolve();
            });
        });
    }
};
