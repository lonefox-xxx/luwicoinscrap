const { default: axios } = require("axios");
const cheerio = require('cheerio');

async function getTokenandCookie(useragent) {

    try {
        const url = 'https://luwicoin.app/register/soulfox';

        const headers = {
            'Host': 'luwicoin.app',
            'Cache-Control': 'max-age=0',
            'Sec-Ch-Ua': '"Not_A Brand";v="8", "Chromium";v="120"',
            'Sec-Ch-Ua-Mobile': '?0',
            'Sec-Ch-Ua-Platform': '"Windows"',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': `${useragent}`,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'Sec-Fetch-Site': 'none',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-User': '?1',
            'Sec-Fetch-Dest': 'document',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.9',
            'Priority': 'u=0, i'
        };

        
        const { data, headers : resheaders } = await axios.get(url, { headers })

        // getting cookies
        const cookies = {}
        resheaders['set-cookie'].forEach(element => {
            const cookie = element.split(';')[0]
            const key = cookie.split('=')[0]
            const value = cookie.split('=')[1]
            cookies[key] = value
        });

        // getting token
        const $ = cheerio.load(data);
        const tokenValue = $('input[name="_token"]').val();

        return { success: true, cookies, tokenValue }

    } catch (error) {
        return { success: true, cookies, tokenValue }
    }
}

module.exports = getTokenandCookie;