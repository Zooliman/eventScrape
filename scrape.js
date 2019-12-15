
const request = require('request');
const cheerio = require('cheerio');
const events = [];
let count = 0;
const fs = require('fs');
const writeStream = fs.createWriteStream('events.csv');
writeStream.write(`Num,Title,Date,Location,Url,Img\n`)

const options = {
    url: 'https://www.eventbrite.com/d/israel/science-and-tech--events--this-month/?page=1',
    headers: {
      'User-Agent': 'PostmanRuntime/7.18.0',
    }
  };


if(count < 20) {
  request(options, (error, response, html) => {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        $('.eds-event-card--consumer').each((i, el) => {
            if(i >= 20) {
              return;
            }

            const title = $(el).find('.eds-is-hidden-accessible')[0].childNodes[0].data.replace(/,/g, " ");
            const location = $(el).find('.card-text--truncated__one').text().replace(/,/g, " ");
            const date = $(el).find('.eds-text-color--primary-brand').text().replace(/,/g, " ");
            const url = $(el).find('a').attr('href');
            const photo = $(el).find('.eds-max-img').attr('src');
            count++;

            let event = {
                num: count,
                title: title,
                date: date,
                loaction: location,
                url: url,
                photo: photo,
            };
            writeStream.write(`${count},${title}, ${date}, ${location}, ${url}, ${photo}\n`)
            events.push(event);
        });
        console.log(events);
    }
  });
}
else if(count >= 20) {
  options.url = "https://www.eventbrite.com/d/israel/science-and-tech--events--this-month/?page=2";
  request(options, (error, response, html) => {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        $('.eds-event-card--consumer').each((i, el) => {

            const title = $(el).find('.eds-is-hidden-accessible')[0].childNodes[0].data.replace(/,/g, "");
            const location = $(el).find('.card-text--truncated__one').text().replace(/,/g, "");
            const date = $(el).find('.eds-text-color--primary-brand').text().replace(/,/g, "");
            const url = $(el).find('a').attr('href');
            const photo = $(el).find('.eds-max-img').attr('src');
            count ++;

            let event = {
                num: count,
                title: title,
                date: date,
                loaction: location,
                url: url,
                photo: photo,
            };
            writeStream.write(`${count},${title}, ${date}, ${location}, ${url}, ${photo}\n`);
            events.push(event);
        });
        console.log(events);
    }
  });
}