require('dotenv').config(); // for env variables
const { MongoClient } = require('mongodb');

const URL = process.env.MONGODB_URI;

class Connector {
  constructor() {
    this.con = this.connect();
  }

  connect() {
    if (this.con) {
      return this.con;
    }
    return MongoClient.connect(URL).then((client) => {
      this.client = client;
      this.db = client.db(process.env.DB_NAME);
    }).catch(console.log);
  }

  find(collectionName, query) {
    return this.getCollection(collectionName).find(query).toArray();
  }

  findOne(collectionName, query) {
    return this.getCollection(collectionName).findOne(query).toArray();
  }

  createCollection(name, options) {
    return this.db.createCollection(name, options);
  }

  createIndex(col, params, options) {
    return col.createIndex(params, options);
  }

  dropCollection(name) {
    return this.db.collection(name).drop();
  }

  getCollection(name) {
    return this.db.collection(name);
  }

  insert(collectionName, entry) {
    return this.getCollection(collectionName).insertOne(entry);
  }

  insertMany(col, data) {
    return col.insertMany(data, { ordered: false }).catch(err => console.log('InsertMany failed: ', err));
  }

  close() {
    this.client.close();
    this.db = null;
    this.con = null;
  }
}


module.exports = new Connector(URL);
