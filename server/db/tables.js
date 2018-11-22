/* eslint-disable no-console */
const { Pool } = require('pg');

const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

pool.on('connect', () => {
  console.log('connected to the db');
});

/**
 * Create Tables
 */
const createParcelTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      parcelorders(
        id UUID PRIMARY KEY,
        sender_id UUID NOT NULL,
        item_name VARCHAR(300) NOT NULL,
        destination_address VARCHAR(300) NOT NULL,
        pickup_address VARCHAR(300) NOT NULL,
        currentLocation VARCHAR(300) NOT NULL,
        created_date TIMESTAMP,
        receiver_name VARCHAR(300) NOT NULL,
        receiver_email VARCHAR(300) NOT NULL,
        item_weight REAL NOT NULL,
        status VARCHAR(40) NOT NULL,
        FOREIGN KEY (sender_id) REFERENCES users (id) ON DELETE CASCADE
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop Tables
 */
const dropParcelTable = () => {
  const queryText = 'DROP TABLE IF EXISTS parcelorders returning *';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Create User Table
 */
const createUserTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      users(
        id UUID PRIMARY KEY NOT NULL,
        fullname VARCHAR(255) NOT NULL,
        email VARCHAR(128) UNIQUE NOT NULL,
        password VARCHAR(128) NOT NULL,
        isAdmin BOOLEAN DEFAULT false,
        created_date DATE DEFAULT CURRENT_DATE     
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop User Table
 */
const dropUserTable = () => {
  const queryText = 'DROP TABLE IF EXISTS users returning *';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Create All Tables
 */
const createAllTables = () => {
  createUserTable();
  createParcelTable();
};
/**
 * Drop All Tables
 */
const dropAllTables = () => {
  dropUserTable();
  dropParcelTable();
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});


module.exports = {
  createParcelTable,
  createUserTable,
  createAllTables,
  dropUserTable,
  dropParcelTable,
  dropAllTables,
};

require('make-runnable');
