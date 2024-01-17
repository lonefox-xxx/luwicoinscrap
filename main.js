const getTokenandCookie = require("./helper/gettokenandcookie");
const register = require("./helper/register");
const getUserAgent = require("./utils/getUseragent");

let tottalref = 0;

async function main(refcode) {
    const { useragent, err } = await getUserAgent();
    const { success, cookies, tokenValue } = await getTokenandCookie(useragent, refcode);

    if (err) return console.log('error in user agent', err);
    if (!success) {
        console.log("Error getting token and cookies");
        return;
    }

    const { res, status } = await register(cookies, tokenValue, useragent, refcode);

    return { res, status };
}

async function handleReferBypass(totalrefcount, refcode, selflose = true) {
    const { status } = await main(refcode);

    const totalref = totalrefcount || +process.env.tottal;
    if (tottalref >= totalref) {
        console.log('total refer reached')
        return process.exit();
    };

    tottalref += 1;
    if (status === 200) {
        console.log(`refer success , total : ${tottalref}`);
    } else console.log('error happened in refer bypass');


    if (tottalref >= totalref) {
        console.log('All refer completed')
        tottalref = 0;
        return selflose && process.exit();
    };
    return await handleReferBypass(totalrefcount, refcode);

}


module.exports = handleReferBypass