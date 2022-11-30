import zlib from 'zlib';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pathToFile = path.join(__dirname, 'files', 'fileToCompress.txt');
const pathToZip = path.join(__dirname, 'files', 'archive.gz');


const decompress = async () => {
    const readStream = fs.createReadStream(pathToZip);
    const writeStream = fs.createWriteStream(pathToFile);

    readStream.pipe(zlib.createUnzip()).pipe(writeStream)
        .on('finish', () => {
            console.log(`File decompressed`)
        })

};

await decompress();