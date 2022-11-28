import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const create = async () => {
    const dirPath = path.join(__dirname, 'files', 'fresh.txt');
    fs.access(dirPath, err => {
        if (err) {
            fs.promises.writeFile(dirPath, "I am fresh and young");
        } else {
            throw new Error('FS operation failed');
        }
    })
};
await create();