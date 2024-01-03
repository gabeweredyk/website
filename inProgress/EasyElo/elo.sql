CREATE TABLE tournaments(
    name VARCHAR(32),
    pass CHAR(64),
    id INT AUTO_INCREMENT,
    PRIMARY KEY(id)
);

CREATE TABLE players(
    name VARCHAR(32),
    rating INT,
    tournament INT,
    PRIMARY KEY(name, tournament)
);

CREATE TABLE matches(
    tournament INT,
    playerA VARCHAR(32),
    playerB VARCHAR(32),
    result INT,
    timestamp DATETIME,
    PRIMARY KEY(timestamp)
);