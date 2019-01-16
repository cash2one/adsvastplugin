import playercore from 'playercore';

const promiseXhr = function (options) {
    return new Promise((resolve, reject) => {
        playercore.xhr({
            timeout: 5000,
            ...options
        }, function (err, resp, body) {
            if (resp.statusCode === 200) {
                resolve(body);
            } else {
                reject(err);
            }
        });
    });
};

export default promiseXhr;