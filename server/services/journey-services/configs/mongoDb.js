const { MongoClient } = require("mongodb");

const uri = process.env.DATABASE_URL;

const client = new MongoClient(uri);

let db = null;

function clientDB() {
  return db;
}

async function connectDB() {
  try {
    await client.connect();
    const database = await client.db("Wanderia");
    db = database;
    return database;
  } catch (err) {
    await client.close();
    throw err;
  }
}

module.exports = { connectDB, clientDB };