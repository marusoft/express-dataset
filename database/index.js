
const Datastore = require('nedb');
const db = new Datastore({ filename: 'database/data.db', autoload: true });

module.exports = db;