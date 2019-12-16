const EventProvider = require('./eventbriteProvider');

main();

async function main() {
    let eventProvider = new EventProvider();

    // events[]
    let result1 = await eventProvider.provide('https://www.eventbrite.com/d/israel/business--events--this-month/');
    // events[]
    let result2 = await eventProvider.provide('https://www.eventbrite.com/d/israel/science-and-tech--events--this-month/');
}
