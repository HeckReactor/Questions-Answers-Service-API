const parse = require('csv-parse');
const fs = require('fs');
const path = require('path');

(async () => {
  //const somePath = path.join(__dirname, './data/reviews.csv');
  const somePath = path.join(__dirname, './data/photos.csv');
  const parser = fs.createReadStream(path.join(somePath))
    .pipe(parse({ quote: '' }));

  // Intialise count
  let count = 0;
  // Report start
  process.stdout.write('Start\n');
  // Iterate through each records
  for await (const record of parser) {
    // Report current line
    process.stdout.write(`${count++} ${record.join(',')}\n`);
    if (count === 5) return;
    // Fake asynchronous operation
    // await new Promise((resolve) => setTimeout(resolve, 100))
  }
  // Report end
  process.stdout.write('Done\n');
  // Validation
})()