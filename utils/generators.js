/*
 * Created on Tue Oct 25 2022
 * Copyright (c) 2022 Connor Doman
 *
 * Courtesy of @csharptest.net: https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
 *
 */

export class Generator {
    static makeID(length) {
        let result = "";
        let characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let charLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charLength));
        }
        return result;
    }
}

export default Generator;
