import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pathToFile = path.join(__dirname, 'files', 'fileToRead.txt');

const read = async () => {
    const readStream = fs.createReadStream(pathToFile, 'utf-8');
    let str = '';
    readStream.on('data', chunk => str += chunk);
    readStream.on('end', () => process.stdout.write(str));
};

await read();