const getTokenandCookie = require("./helper/gettokenandcookie");
const register = require("./helper/register");
const getUserAgent = require("./utils/getUseragent");

let tottalref = 0;

async function main(refcode) {
    const { useragent, err } = await getUserAgent();
    const { success, cookies, tokenValue } = await getTokenandCookie(useragent);

    if (err) return console.log('error in user agent', err);
    if (!success) {
        console.log("Error getting token and cookies");
        return;
    }

    const { res, status } = await register(cookies, tokenValue, useragent, refcode);

    return { res, status };
}

async function handleReferBypass(totalrefcount, refcode) {
    const { status } = await main(refcode);

    const totalref = totalrefcount || +process.env.tottal;
    if (tottalref >= totalref) {
        console.log('total refer reached')
        return process.exit();
    };

    if (status === 200) {
        tottalref += 1;
        console.log(`refer success , total : ${tottalref}`);

        if (tottalref >= totalref) {
            console.log('total refer reached')
            return process.exit();
        };
        return await handleReferBypass(totalrefcount, refcode);
    }

    console.log('error happened in refer bypass');
}


module.exports = handleReferBypass