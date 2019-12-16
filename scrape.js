
var request = require('request-promise-native');
const cheerio = require('cheerio');
const events = [];
let count = 0;
const fs = require('fs');
const writeStream = fs.createWriteStream('events.csv');
writeStream.write(`Num,Title,Date,Location,Url,Img\n`)

let pageCount = 1;
let baseUrl = 'https://www.eventbrite.com/d/israel/science-and-tech--events--this-month/?page=';
let shouldKeepPaging = true; 

main();

async function main() { 
  while(shouldKeepPaging) {
    try {
      const options = {
          url: baseUrl + pageCount,
          headers: {
            'User-Agent': 'PostmanRuntime/7.18.0',
          }
        };

      console.log(`waiting for request for page ${pageCount} ...`)
      let html = await request(options); 
      let eventsOfPage = parseHtmlToEvents(html);
      events.push(...eventsOfPage)
      pageCount++; 
    } catch(error) {
      console.log(error);
    }
  }

  console.log('Total events collected: ' + events.length);

  for(let event of events) {
    console.log(`${event.num}: ${event.title}`);
  }

  return events;
  
}



function parseHtmlToEvents(html) {
      let eventsTemp = [];
      const $ = cheerio.load(html);

      const noResultFound = $('.eds-l-pad-top-6').text();
      if(noResultFound !== '') {
        shouldKeepPaging = false;
        return [];
      }

      let length =  $('.eds-event-card--consumer').length;
      $('.eds-event-card--consumer').each((i, el) => {
          if(i >= length / 2) {
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
          eventsTemp.push(event);
      });

      console.log(`Result recieved: ${eventsTemp.length}`);
      return eventsTemp;
}



