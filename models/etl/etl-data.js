const path = require('path');
const fs = require('fs');

const { pool, client } = require('../../helpers/database');

const [,, modeArg, pathArg] = process.argv;

const initializeDatabase = async () => {
  const dataFilePath = path.join(__dirname, 'qa.sql');
  try {
    const sqlFileContent = fs.readFileSync(dataFilePath).toString();
    // console.log(sqlFileContent);
    console.log('here');
    const createDatabase = await client.query(sqlFileContent, (err, data) => {
      console.log(err);
      console.log(data);
    });
    console.log(createDatabase);
    console.log('finishing');
    console.log(createDatabase);
  } catch (e) {
    console.log(e);
  }
  // console.log(sqlFile.toString());
};

const parseAndInsertData = () => {

};

if (modeArg === '1') {
  initializeDatabase();
} else if (modeArg === 2) {
  parseAndInsertData();
}

// process.stdout.write(`${dataFilePath}\n`);
