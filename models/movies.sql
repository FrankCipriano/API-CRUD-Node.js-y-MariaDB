DROP DATABASE IF EXISTS Movies;

CREATE DATABASE IF NOT EXISTS Movies;
USE Movies;

CREATE TABLE IF NOT EXISTS Movie(
	MovieID				VARCHAR(12),
	Title				VARCHAR(100),
	ReleaseMovie		VARCHAR(4),
	Rating				DECIMAL(2,1),
	Image				VARCHAR(155),
	constraint pk_Movie primary key(MovieID)
);

