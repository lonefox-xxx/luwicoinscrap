function parseArgs(arguments) {

    const args = arguments.slice(2);
    const parsedArgs = {};
    for (let i = 0; i < args.length; i += 2) {
        const key = args[i].replace(/^-+/, '');
        const value = args[i + 1];
        parsedArgs[key] = value;
    }
    return parsedArgs;
}

module.exports = parseArgs;
