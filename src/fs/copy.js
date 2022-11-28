import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pathFrom = path.join(__dirname, 'files');
const pathTo = path.join(__dirname, 'files_copy');


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

    fs.access(pathFrom, err => {
        if (err) {
            throw new Error('FS operation failed');
        } else {
            copyFolder(pathFrom, pathTo);
        }
    })

    fs.access(pathTo, err => {
        if (err) {
            copyFolder(pathFrom, pathTo);
        } else {
            throw new Error('FS operation failed');
        }
    })
};

copy();