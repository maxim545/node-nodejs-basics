import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';
import { Worker, parentPort, workerData } from 'node:worker_threads';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pathToWorker = path.join(__dirname, 'worker.js');
const cpuCount = os.cpus().length;
const workerArr = [];

function makeWorker(script) {
    return new Promise((resolve, reject) => {
        const worker = new Worker(pathToWorker, {
            workerData: script,
        });
        worker.on('message', (data) => resolve({ status: 'resolved', data }));
        worker.on('error', (data) => reject({ status: 'error', data: null }));
        worker.on('exit', (code) => {
            if (code !== 0)
                reject(new Error(`Worker stopped with exit code ${code}`));
        });
    });
};

const performCalculations = async () => {
    for (let i = 0; i < cpuCount; i++) {
        const worker = makeWorker(i + 10);
        workerArr.push(worker);
    }
    Promise.allSettled(workerArr).then((data) => {
        const values = data.map(value => value.value);
        console.log(values);
    });
};

await performCalculations();