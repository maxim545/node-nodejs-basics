const parseEnv = () => {
    let allKeys = Object.keys(process.env);
    allKeys = allKeys.filter(key => key.indexOf('RSS_') === 0);
    allKeys = allKeys.map(key => key + '=' + process.env[key]);
    console.log(allKeys.join('; '));
    return allKeys.join('; ');
};

parseEnv();