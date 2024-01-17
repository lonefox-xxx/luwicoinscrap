const { default: axios } = require("axios");

function fetchWithRetry({ url, maxRetries = 5, initialTimeout = 10000, data = '', headers = {}, method = 'GET', params = {}, proxy = true }) {
    return new Promise(async (resolve, reject) => {
        let retryCount = 0;
        let timeout = initialTimeout;
        while (retryCount < maxRetries) {
            try {
                const response = await axios[method.toLowerCase()](url, data, {
                    headers: headers,
                    proxy: {
                        host: 'proxy-server.scraperapi.com',
                        port: 8001,
                        auth: {
                            username: 'scraperapi.device_type=mobile.keep_headers=true',
                            password: '134ecdbc1e0bf4565004cfa789f280fb'
                        },
                        protocol: 'http'
                    },
                    timeout,
                    ...params
                })
                return resolve({ succes: true, data: response, status: response.status });
            } catch (error) {
                retryCount++;
                timeout = Math.min(timeout * 2, 10000);
            }
        }
        console.log('req failed after max retries');
        return resolve({ succes: false, data: null });
    })
}

module.exports = fetchWithRetry;