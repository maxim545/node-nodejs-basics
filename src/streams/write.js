import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pathToFile = path.join(__dirname, 'files', 'fileToWrite.txt');

const write = async () => {
    const writeStream = fs.createWriteStream(pathToFile, 'utf-8');
    process.stdin.on('data', (chunk) => writeStream.write(chunk));
};

await write();