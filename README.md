# fck-covid 🫂
Command Line tool to Notify user if the slot is available in a location(pincode).

### Pre-requisite
- Node (Install from here:  https://nodejs.org/en/download/) 

### Setup Instructions
Run the following commands 
1. Install the repo <br>`git clone https://github.com/tans105/fck-covid.git`
2. Goto directory `fck-covid`. For Linux or Mac users<br> `cd fck-covid`
3. Run the command<br> `node runner.js --minAge 45 --pin 560102 --dosage 1 --checkTillDays 5`

### Args 
`--pin or --pincode` : 'pincode of the location', default is `560103`<br><br>
`--minAge`: Minimum Age limit, default is `18`<br><br>
`--dosage`: Dosage Number (can be 1 or 2)<br><br>
`--checkTillDays`: Number of days to which you wish to check, value 3 implies current date and next 2 day as well.<br><br>

### Sample command 
`node runner.js --minAge 45 --pin 560102 --dosage 1 --checkTillDays 5`

### Sample Output
```
Checking for:	  {
  Pincode: 560102,
  'Minimum Age': 45,
  'Dosage #': 1,
  'Checking For Dates': [
    '24-05-2021',
    '25-05-2021',
    '26-05-2021',
    '27-05-2021',
    '28-05-2021'
  ]
}
No Slot available for 24-05-2021,25-05-2021,26-05-2021,27-05-2021,28-05-2021

```
### Application
1. Read the logs and shoot a mail/desktop notification/push notification whenever slot is available. Use it with a mailing tool
2. Add a `cron` job which runs every n minutes and sit back and relax while it notifies for available slot.


## Coming Soon
1. Ability to send mail on slot availability
2. Get the slots from district/center
