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
  process.stdout.write('\x1b[36m\x1b[1mParse Products Script Started...\x1b[0m\n');
  for await (const record of parser) {
    count += 1;
    if (count > 1) {
      if (!(count % 50)) process.stdout.write(`${count} | ${record.join(',')}\n\n`);
      // Resume at a record
      // if (record[0] < 88256444) continue;
      const client = await pool.connect();
      try {
        await client.query(`
          INSERT INTO products (
            id,
            product_name,
            slogan,
            description,
            category,
            default_price
          ) VALUES ($1, $2, $3, $4, $5, $6)
        `, record);
      } catch (e) {
        process.stdout.write(`${e.stack}\n`);
      } finally {
        client.release();
      }
    }
  }
  process.stdout.write(`\x1b[32m\x1b[1mOperation Complete. ${count} records processed.\x1b[0m\n\n`);
  return 1;
};

const parseQuestions = async () => {
  const somePath = path.join(__dirname, './data/questions.csv');
  const parser = fs.createReadStream(path.join(somePath))
    .pipe(parse());
  let count = 0;
  process.stdout.write('\x1b[36m\x1b[1mParse Questions Script Started...\x1b[0m\n');
  for await (const record of parser) {
    count += 1;
    if (count > 1) {
      // if (count < 10) return;
      if (!(count % 50)) process.stdout.write(`${count} | ${record.join(',')}\n\n`);
      // Resume at a record
      // if (record[0] < 88256444) continue;
      const dateObject = new Date(Number(record[3]));
      record[3] = dateObject.toISOString();
      const client = await pool.connect();
      try {
        await client.query(`
          INSERT INTO questions (
            id,
            product_id,
            body,
            created_at,
            username,
            email,
            reported,
            helpful
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `, record);
      } catch (e) {
        process.stdout.write(`${e.stack}\n`);
      } finally {
        client.release();
      }
    } else {
      process.stdout.write(`${record}\n`);
    }
  }
  process.stdout.write(`\x1b[32m\x1b[1mOperation Complete. ${count} records processed.\x1b[0m\n\n`);
  return 1;
};

const parseAnswers = async () => {
  const somePath = path.join(__dirname, './data/answers.csv');
  const parser = fs.createReadStream(path.join(somePath))
    .pipe(parse());
  let count = 0;
  process.stdout.write('\x1b[36m\x1b[1mParse Answers Script Started...\x1b[0m\n');
  for await (const record of parser) {
    count += 1;
    if (count > 1) {
      // if (count > 10) return;
      if (!(count % 50)) process.stdout.write(`${count} | ${record.join(',')}\n\n`);
      // Resume at a record
      // if (record[0] < 88256444) continue;
      const dateObject = new Date(Number(record[3]));
      record[3] = dateObject.toISOString();
      const client = await pool.connect();
      try {
        await client.query(`
          INSERT INTO answers (
            id,
            question_id,
            body,
            created_at,
            username,
            email,
            reported,
            helpful
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `, record);
      } catch (e) {
        process.stdout.write(`${e.stack}\n`);
      } finally {
        client.release();
      }
    } else {
      process.stdout.write(`${record}\n`);
    }
  }
  process.stdout.write(`\x1b[32m\x1b[1mOperation Complete. ${count} records processed.\x1b[0m\n\n`);
  return 1;
};

const parseAnswerPhotos = async () => {
  const somePath = path.join(__dirname, './data/answers_photos.csv');
  const parser = fs.createReadStream(path.join(somePath))
    .pipe(parse());
  let count = 0;
  process.stdout.write('\x1b[36m\x1b[1mParse Answers Script Started...\x1b[0m\n');
  for await (const record of parser) {
    count += 1;
    if (count > 1) {
      // if (count > 10) return;
      if (!(count % 50)) process.stdout.write(`${count} | ${record.join(',')}\n\n`);
      // Resume at a record
      // if (record[0] < 88256444) continue;
      const client = await pool.connect();
      try {
        await client.query(`
          INSERT INTO photos (
            id,
            answer_id,
            photo_url
          ) VALUES ($1, $2, $3)
        `, record);
      } catch (e) {
        process.stdout.write(`${e.stack}\n`);
      } finally {
        client.release();
      }
    } else {
      process.stdout.write(`${record}\n`);
    }
  }
  process.stdout.write(`\x1b[32m\x1b[1mOperation Complete. ${count} records processed.\x1b[0m\n\n`);
  return 1;
};

const parseAll = async () => {
  await parseProducts();
  await parseQuestions();
  await parseAnswers();
  await parseAnswerPhotos();
  pool.end();
};

const parseMethods = {
  products: parseProducts,
  questions: parseQuestions,
  answers: parseAnswers,
  photos: parseAnswerPhotos,
  all: parseAll,
};

parseMethods[datasetName]();
