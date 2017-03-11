DROP DATABASE IF EXISTS games;
CREATE DATABASE games;
USE games;

-- DROP TABLE IF EXISTS collection;

CREATE TABLE collection (
  id INT NOT NULL,
  game_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (id, game_name)
);
/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
