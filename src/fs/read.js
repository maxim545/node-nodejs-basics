import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pathTo = path.join(__dirname, 'files', 'fileToRead.txt');

const read = async () => {
    fs.access(pathTo, err => {
        if (err) {
            throw new Error('FS operation failed');
        } else {
            (async () => {
                const dataFromFile = await fs.promises.readFile(pathTo, { encoding: 'utf8' });
                console.log(dataFromFile);
            })();
        }
    })
};

await read();