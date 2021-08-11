/* eslint-disable no-restricted-syntax */
const parse = require('csv-parse');
const fs = require('fs');
const path = require('path');

const { pool } = require('../../helpers/database');

const datasetName = process.argv[2];

const parseProducts = async () => {
  const somePath = path.join(__dirname, './data/product.csv');
  const parser = fs.createReadStream(path.join(somePath))
    .pipe(parse());
  let count = 0;
  process.stdout.write('Start\n');
  for await (const record of parser) {
    count += 1;
    if (count > 1) {
      console.log(record);
      try {
        await pool.query(`
          INSERT INTO products (
            id,
            product_name,
            slogan,
            description,
            category,
            default_price
          ) VALUES ($1, $2, $3, $4, $5, $6)
        `, record)} catch(e){console.log(e)}
    }
    if (count === 5) return;
  }
  process.stdout.write(`Operation Complete. ${count} records processed.\n`);
};

const parseQuestions = async () => {
  const somePath = path.join(__dirname, './data/questions.csv');
  const parser = fs.createReadStream(path.join(somePath))
    // .pipe(parse({ quote: '' })); // for photos?
    .pipe(parse());

  // Intialise count
  let count = 0;
  // Report start
  process.stdout.write('Start\n');
  // Iterate through each records
  for await (const record of parser) {
    // Report current line
    count++;
    //if (count === 1) continue;
    console.log(record);
    //process.stdout.write(`${count++} ${record.join(',')}\n`);
    if (count === 100) return;
  }
  // Report end
  process.stdout.write('Done\n');
  // Validation
};

const parseAnswers = async () => {
  const somePath = path.join(__dirname, './data/answers.csv');
  const parser = fs.createReadStream(path.join(somePath))
    // .pipe(parse({ quote: '' })); // for photos?
    .pipe(parse());

  // Intialise count
  let count = 0;
  // Report start
  process.stdout.write('Start\n');
  // Iterate through each records
  for await (const record of parser) {
    // Report current line
    count++;
    //if (count === 1) continue;
    console.log(record);
    //process.stdout.write(`${count++} ${record.join(',')}\n`);
    if (count === 100) return;
  }
  // Report end
  process.stdout.write('Done\n');
  // Validation
};

const parseAnswerPhotos = async () => {
  const somePath = path.join(__dirname, './data/answers_photos.csv');
  const parser = fs.createReadStream(path.join(somePath))
    // .pipe(parse({ quote: '' })); // for photos?
    .pipe(parse());

  // Intialise count
  let count = 0;
  // Report start
  process.stdout.write('Start\n');
  // Iterate through each records
  for await (const record of parser) {
    // Report current line
    count++;
    //if (count === 1) continue;
    console.log(record);
    //process.stdout.write(`${count++} ${record.join(',')}\n`);
    if (count === 100) return;
  }
  // Report end
  process.stdout.write('Done\n');
  // Validation
};

const parseMethods = {
  products: parseProducts,
  questions: parseQuestions,
  answers: parseAnswers,
  photos: parseAnswerPhotos,
};

parseMethods[datasetName]();
