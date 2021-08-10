DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS qanda;
DROP TABLE IF EXISTS contentphotos;
DROP TABLE IF EXISTS photos;

CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  helpful INTEGER DEFAULT 0,
  reported BOOLEAN DEFAULT 'false',
  body VARCHAR,
  username VARCHAR(100),
  email VARCHAR(255),
  date timestamp
);

CREATE TABLE answers (
  id SERIAL PRIMARY KEY,
  helpful INTEGER DEFAULT 0,
  reported BOOLEAN DEFAULT 'false',
  body VARCHAR,
  username VARCHAR(100),
  date timestamp
);

CREATE TABLE qanda (
  id SERIAL PRIMARY KEY,
  question INTEGER NOT NULL,
  answer INTEGER NOT NULL
);

CREATE TABLE contentphotos (
  id SERIAL PRIMARY KEY,
  question INTEGER,
  answer INTEGER,
  photo INTEGER NOT NULL
);

CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  url VARCHAR NOT NULL
);
