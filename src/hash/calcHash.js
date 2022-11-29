import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pathToFile = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt');

const calculateHash = async () => {
    const dataFromFile = await fs.promises.readFile(pathToFile, { encoding: 'utf8' })
    const hash = crypto.createHash('sha256').update(dataFromFile).digest('hex');
    console.log(hash)
};

await calculateHash();