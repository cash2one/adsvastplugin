import playercore from 'playercore';

const promiseXhr = function(options, limit = 3, count = 0) {
    return new Promise((resolve, reject) => {
        playercore.xhr(options, function(err, resp, body) {
            if (resp.statusCode === 200) { 
                resolve(body);
            } else if (limit && count < limit){
                ++count;
                promiseXhr(options, limit, count).then(value => {
                    resolve(value);
                }).catch(err => {
                    reject(err);
                });
            } else {
                reject(err);
            }
        });
    });
};

export default promiseXhr;