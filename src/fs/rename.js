import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pathToFolder = path.join(__dirname, 'files');
const pathFrom = path.join(__dirname, 'files', 'wrongFilename.txt');
const pathTo = path.join(__dirname, 'files', 'properFilename.md');


const getFiles = async () =>
    (await fs.promises
        .readdir(pathToFolder, { withFileTypes: true }))
        .filter(item => item.isFile())
        .map(item => item.name)

const rename = async () => {
    const allFiles = await getFiles()
    if (allFiles.includes('properFilename.md') || !allFiles.includes('wrongFilename.txt')) {
        throw new Error('FS operation failed');
    } else {
        fs.promises.rename(pathFrom, pathTo)
    }
};
await rename();