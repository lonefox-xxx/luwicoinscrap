const getTokenandCookie = require("./helper/gettokenandcookie");
const register = require("./helper/register");
const getUserAgent = require("./utils/getUseragent");

let tottalref = 0;

async function main() {
    const { useragent, err } = await getUserAgent();
    const { success, cookies, tokenValue } = await getTokenandCookie(useragent);

    if (err) return console.log('error in user agent', err);
    if (!success) {
        console.log("Error getting token and cookies");
        return;
    }

    const { res, status } = await register(cookies, tokenValue, useragent);

    return { res, status };
}

async function handleReferBypass() {
    const { status } = await main();

    const totalref = +process.env.tottal;
    if (tottalref >= totalref) {
        console.log('total refer reached')
        return process.exit();
    };

    if (status === 200) {
        tottalref += 1;
        console.log(`refer success , total : ${tottalref}`);
        return await handleReferBypass();
    }

    console.log('error happened in refer bypass');
}


module.exports = handleReferBypass