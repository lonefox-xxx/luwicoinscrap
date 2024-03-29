const { default: axios } = require("axios");
const getFakeData = require("../utils/getfakeData");
const fetchWithRetry = require("../utils/fetchWithretry");

async function register(coookie, token, useragent, refcode) {
    try {

        const XSRFTOKEN = coookie['XSRF-TOKEN']
        const laravel_session = coookie['laravel_session']

        const { email, password, phone, username } = getFakeData();
        const ref = refcode || process.env.refcode
        const data = `_token=${token}&reffered_by=${ref}&username=${username}&phone=${phone}&email=${encodeURIComponent(email)}&country=IN&password=${password}&password_confirmation=${password}`;

        const headers = {
            'Cookie': `XSRF-TOKEN=${XSRFTOKEN}; laravel_session=${laravel_session}`,
            'Content-Length': `${data.length}`,
            'Cache-Control': 'max-age=0',
            'Sec-Ch-Ua': '"Not_A Brand";v="8", "Chromium";v="120"',
            'Sec-Ch-Ua-Mobile': '?0',
            'Sec-Ch-Ua-Platform': '"Windows"',
            'Upgrade-Insecure-Requests': '1',
            'Origin': 'https://luwicoin.app',
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': `${useragent}`,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-User': '?1',
            'Sec-Fetch-Dest': 'document',
            'Referer': 'https://luwicoin.app/register',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.9',
            'Priority': 'u=0, i'
        };

        const { data: { data: res }, status } = await fetchWithRetry({ url: `https://luwicoin.app/register`, headers, method: 'POST', data, });
        return { res, status }
    } catch (error) {
        console.log(error)
        return { res: null }
    }

}

module.exports = register;