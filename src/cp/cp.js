import path from 'path';
import { fileURLToPath } from 'url';
import child_process from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pathToFile = path.join(__dirname, 'files', 'script.js');

const spawnChildProcess = async (args) => {
    child_process.fork(pathToFile, [...args], {
        stdio: [0, 1, 2, 'ipc'],
    });
};

spawnChildProcess(process.argv);