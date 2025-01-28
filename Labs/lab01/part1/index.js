import _ from 'lodash';

var holidays = [
    { "name": "Christmas", "date": "2025-12-25" },
    { "name": "New Years", "date": "2025-12-31" },
    { "name": "Canada Day", "date": "2025-07-01" },
    { "name": "Halloween", "date": "2025-10-31" },
    { "name": "Thanksgiving", "date": "2025-11-27" },
];

function countdown(date) {
    var now = new Date();
    var holiday = new Date(date);
    var daysUntil = Math.floor((holiday - now) / (1000 * 60 * 60 * 24));
    return daysUntil;
}

holidays.forEach(holiday => {
    const days = countdown(holiday.date);
    console.log(`There are ${days} days until ${holiday.name}`);
});

function randomHoliday() {
    var now = new Date();
    var random = _.sample(holidays);
    var daysUntilRandom = Math.floor((new Date(random.date) - now) / (1000 * 60 * 60 * 24));
    return { name: random.name, daysUntilRandom };
}
const randomHoli = randomHoliday();
console.log(`There are ${randomHoli.daysUntilRandom} days until ${randomHoli.name}`);