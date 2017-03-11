DROP DATABASE IF EXISTS game_collection;

CREATE DATABASE game_collection;

USE game_collection;

CREATE TABLE collection (
  id int NOT NULL,
  game_name varchar(255) NOT NULL,
  max_players varchar(50) NOT NULL,
  PRIMARY KEY (ID)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
