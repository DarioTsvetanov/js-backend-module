const fs = require('fs');
const readStream = fs.createReadStream('./index.html');
const writeStream = fs.createWriteStream('./jdasd.docx');

readStream.on('data', (data) => {
    console.log('New chunk loaded');
    writeStream.write(data);
});

readStream.on('end', () => {
    console.log('reading ended');
    writeStream.end();
});