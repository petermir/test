const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let mongodbUrl = 'mongodb://127.0.0.1:27017'

// process OBj -> made available by NodeJS
// .env -> OBj which contains all the environment variables that are exposed
// to our NodeJS, by the environment
if (process.env.MONGO_URL) {
  mongodbUrl = process.env.MONGO_URL
}

let database;

async function initDatabase() {
  const client = await MongoClient.connect(mongodbUrl);
  database = client.db('deployment');
}

function getDb() {
  if (!database) {
    throw new Error('No database connected!');
  }

  return database;
}

module.exports = {
  initDatabase: initDatabase,
  getDb: getDb,
};
