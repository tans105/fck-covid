const moment = require('moment')
const _ = require('lodash');

const {isSlotAvailableForDate} = require('./parse-util');
const {getCenters} = require('./client');
const Mailer = require('./mailer');

const args = process.argv.slice(2);
const pin = args[0] || 500033;
const checkTillDays = args[1] || 3;
const minAge = args[2] || 45;
const dosage = args[3] || 2;

let slotFound = false;

const getDates = (checkTillDays) => {
    let currentDate = moment();
    const dates = [];

    for (let i = 0; i < checkTillDays; i++) {
        dates[i] = currentDate.format('DD-MM-YYYY');
        currentDate = currentDate.add(1, 'DAY');
    }

    return dates;
}

const dates = getDates(checkTillDays);
let mailPayload = {};

getCenters(dates, pin, (err, data) => {
    dates.forEach(date => {
        const res = JSON.parse(data[date]);
        const availableSlotsForDate = isSlotAvailableForDate(date, _.get(res, 'centers', []), minAge, dosage)[date]

        if (availableSlotsForDate && availableSlotsForDate.length > 0) {
            slotFound = true;
            mailPayload[date] = availableSlotsForDate;
            console.log(`Slot Available for ${date}`);
        } else {
            console.log(`No Slot available for ${date}`)
        }
    })

    if (slotFound) {
        console.log('Sending Mail.');
        let mailer = new Mailer(mailPayload);
        mailer.send();
    }
});

