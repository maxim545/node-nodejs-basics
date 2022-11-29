const parseArgs = () => {
    let allArgs = process.argv.filter(arg => arg.indexOf('--') === 0);
    allArgs = allArgs.map(arg => {
        const currentIndex = process.argv.findIndex(item => item === arg);
        return arg.slice(2) + ' is ' + process.argv[currentIndex + 1];
    });
    console.log(allArgs.join(', '));
};

parseArgs();