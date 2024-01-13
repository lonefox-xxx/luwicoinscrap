const fs = require('fs');

function getUserAgent() {
    const filePath = './useragents.txt';
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            const lines = data.split('\n');
            const randomIndex = Math.floor(Math.random() * lines.length);
            const randomLine = lines[randomIndex].trim();
            resolve({ useragent: randomLine, err })
        });
    })
}

module.exports = getUserAgent;