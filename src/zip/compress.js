import zlib from 'zlib';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pathToFile = path.join(__dirname, 'files', 'fileToCompress.txt');
const pathToZip = path.join(__dirname, 'files', 'archive.gz');


const compress = async () => {
    const readStream = fs.createReadStream(pathToFile);
    const writeStream = fs.createWriteStream(pathToZip);

    readStream.pipe(zlib.createGzip()).pipe(writeStream)
        .on('finish', () => {
            console.log(`File compressed`)
        })

};

await compress();