const path = require('path');

const { pool, client } = require('../../helpers/database');

const [,, modeArg, pathArg] = process.argv;

const initializeDatabase = async () => {

};

const parseAndInsertData = () => {

};

if (modeArg === 1) {
  initializeDatabase();
  //
} else if (modeArg === 2) {
  parseAndInsertData();
  //
}

const dataFilePath = path.join(__dirname, pathArg);

process.stdout.write(`${dataFilePath}\n`);
