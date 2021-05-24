const _ = require('lodash')
const parseArgs = require('minimist')

const isSlotAvailableForDate = (date, centers, minAge, dosage) => {
    let slotData = {};

    centers.forEach(center => {
        const sessions = _.get(center, 'sessions', []);
        sessions.forEach(session => {
            const ageLimit = _.get(session, 'min_age_limit', 99);
            let dosageField;

            if (ageLimit > minAge) return;

            if (dosage === 1) {
                dosageField = 'available_capacity_dose1'
            } else {
                dosageField = 'available_capacity_dose2'
            }

            if (session[dosageField] > 0) { //Slot available
                let payload = {
                    name: center.name,
                    address: center.address,
                    available_capacity_dose1: session.available_capacity_dose1,
                    available_capacity_dose2: session.available_capacity_dose2,
                    fee: _.get(center, 'vaccine_fees.fee', 'Free'),
                    vaccine_name: _.get(session, 'vaccine', null)
                };

                if (!_.has(slotData, date)) {
                    slotData[date] = [];
                }

                slotData[date].push(payload)
            }
        })
    })

    return slotData;
}

const parseCommandLineArgs = () => {
    let args = parseArgs(process.argv);

    const pin = args['pin'] || args['pincode'] || 560103;
    const checkTillDays = args['checkTillDays'] || 3;
    const minAge = args['minAge'] || 18;
    const dosage = args['dosage'] || 1;

    return {pin, checkTillDays, minAge, dosage}
}

module.exports = {
    isSlotAvailableForDate,
    parseCommandLineArgs
}