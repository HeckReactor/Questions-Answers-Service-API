DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS questions;

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
  question_id INTEGER NOT NULL REFERENCES questions(id),
  helpful INTEGER DEFAULT 0,
  reported BOOLEAN DEFAULT 'false',
  body VARCHAR,
  username VARCHAR(100),
  date timestamp
);

CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  answer INTEGER REFERENCES answers(id),
  photo_url VARCHAR(255) NOT NULL
);