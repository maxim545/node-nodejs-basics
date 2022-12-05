import path from 'path';
import { fileURLToPath } from 'url';
import child_process from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pathToFile = path.join(__dirname, 'files', 'script.js');

const spawnChildProcess = async (args) => {
    const cp = child_process.spawn('node', [pathToFile, ...args]);
    process.stdin.pipe(cp.stdin)

    cp.stdout.on('data', (data) => {
        console.log(`${data}`);
    });

    cp.stderr.on('data', (data) => {
        console.error(`${data}`);
    });

    cp.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });

};

spawnChildProcess(process.argv);