CREATE TABLE whiteboard(
    img MEDIUMBLOB,
    parent VARCHAR(32),
    depth INT,
    id INT,
    PRIMARY KEY(parent, depth, id)
);

CREATE TABLE directory(
    name VARCHAR(32),
    depth INT,
    parent VARCHAR(32),
    PRIMARY KEY(name, depth)
);
