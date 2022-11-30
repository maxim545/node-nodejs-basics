import { Transform } from "stream";

const transform = async () => {
    const reverseStr = new Transform({
        transform(chunk, encoding, callback) {
            this.push(chunk.toString().split('').reverse().join(''));
            callback();
        }
    })
    process.stdin.pipe(reverseStr).pipe(process.stdout);
};

await transform();