const async = require('async');
const request = require('request');

const getCenters = (dates, pin, cb) => {
    const requests = {};

    dates.forEach((date) => {
        let url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pin}&date=${date}`;

        requests[date] = (cb) => {
            request(url, function (error, response, html) {
                cb(error, html);
            })
        }
    })

    return async.parallel(requests, cb)
}

module.exports = {
    getCenters
}