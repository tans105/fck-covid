const moment = require('moment')
const _ = require('lodash');

/* Runtime scripts */
const {isSlotAvailableForDate, parseCommandLineArgs} = require('./scripts/parse-util');
const {getCenters} = require('./scripts/client');
const Mailer = require('./scripts/mailer');
/**/

let {
    pin,
    checkTillDays,
    minAge,
    dosage
} = parseCommandLineArgs(process.argv);

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
console.log('Checking for:\t ', {
    'Pincode': pin,
    'Minimum Age': minAge,
    'Dosage #': dosage,
    'Checking For Dates': dates
})
let mailPayload = {};

getCenters(dates, pin, (err, data) => {
    dates.forEach(date => {
        const res = JSON.parse(data[date]);
        const availableSlotsForDate = isSlotAvailableForDate(date, _.get(res, 'centers', []), minAge, dosage)[date]

        if (availableSlotsForDate && availableSlotsForDate.length > 0) {
            console.log('Slot found for ', date);
            slotFound = true;
            mailPayload[date] = availableSlotsForDate;
        }
    })

    if (slotFound) {
        console.log('Slot(s) were found, Sending Mail.');
        console.log(mailPayload)
        let mailer = new Mailer(mailPayload);
        mailer.send();
    } else {
        console.log(`No Slot available for ${dates}`)
    }
});

