import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pathFrom = path.join(__dirname, 'files');
const pathTo = path.join(__dirname, 'files_copy');


const getFolders = async () =>
    (await fs.promises
        .readdir(__dirname, { withFileTypes: true }))
        .filter(item => item.isDirectory())
        .map(item => item.name)


async function copyFolder(src, dest) {
    try {
        await fs.promises.mkdir(dest, { recursive: true });
        const files = await fs.promises.readdir(src, { withFileTypes: true });

        for (let file of files) {
            const srcPath = path.join(src, file.name);
            const destPath = path.join(dest, file.name);

            if (file.isDirectory()) {
                await copyFolder(srcPath, destPath);
            }
            else {
                await fs.promises.copyFile(srcPath, destPath);
            }
        }
    }
    catch (err) {
        console.log(err);
    }
}

const copy = async () => {
    const allFolders = await getFolders()
    if (allFolders.includes('files_copy') || !allFolders.includes('files')) {
        throw new Error('FS operation failed');
    } else {
        copyFolder(pathFrom, pathTo);
    }
};

copy();