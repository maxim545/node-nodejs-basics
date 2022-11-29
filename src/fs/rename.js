import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pathFrom = path.join(__dirname, 'files', 'wrongFilename.txt');
const pathTo = path.join(__dirname, 'files', 'properFilename.md');

const rename = async () => {
    fs.access(pathFrom, err => {
        if (err) {
            throw new Error('FS operation failed');
        } else {
            fs.promises.rename(pathFrom, pathTo)
        }
    })

    fs.access(pathTo, err => {
        if (err) {
            fs.promises.rename(pathFrom, pathTo)
        } else {
            throw new Error('FS operation failed');
        }
    })
};
await rename();