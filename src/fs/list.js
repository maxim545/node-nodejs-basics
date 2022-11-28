import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pathTo = path.join(__dirname, 'files');

const list = async () => {
    fs.access(pathTo, err => {
        if (err) {
            throw new Error('FS operation failed');
        } else {
            (async () => {
                const files = await fs.promises.readdir(pathTo)
                for (const file of files) {
                    console.log(file)
                }
            })();
        }
    })
};

await list();