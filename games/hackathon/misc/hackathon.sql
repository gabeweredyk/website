CREATE TABLE judgments (
    submitTime DATETIME,
    node INT,
    offenseTeam VARCHAR(32),
    defenseTeam VARCHAR(32),
    success BOOLEAN,
    reason TINYTEXT,
    PRIMARY KEY (submitTime)
);


CREATE TABLE nodes(
    id INT,
    title VARCHAR(64),
    description TEXT,
    value INT,
    isQuiz BOOLEAN,
    j INT DEFAULT 0,
    PRIMARY KEY (id)
);

create TABLE questions(
    node INT,
    q INT,
    question VARCHAR(32),
    answerStyle INT,
    PRIMARY KEY (node, q)
);

create TABLE choices(
    node INT,
    q INT,
    i INT,
    choice VARCHAR(32)
);


INSERT INTO `nodes` (`id`, `title`, `description`, `value`) VALUES ('1', 'Web Dev - Calhoun Course Catalog', 'Using web development tools such as HTML, CSS, and Javascript, create a website that displays the courses Calhoun has to offer. You should have a web page for each department, and provide a name, description and grade level for each class. The submission with the best catalog and user experience will win.', '2');
INSERT INTO `nodes` (`id`, `title`, `description`, `value`) VALUES ('2', 'Hatch - Calhoun Merchandise Creator', 'Using Hatch, write a piece of software that can be used to design custom pieces of Calhoun merch. Your application should provide users the ability to mix and match different articles of clothing and different designs. Your application should also let the user know how much their creation would be to buy. The submission with the best user experience and the most creative designs will win.', '2');
INSERT INTO `nodes` (`id`, `title`, `description`, `value`) VALUES ('3', 'Python Processing - Interactive Test', 'Using the Processing library in Python, create a piece of testing software that goes beyond the terminal. You may test on any subject of your choosing so long as your test has at least 5 questions. Answers may be inputted by multiple choice or free response and be revealed to the user at the end of the test as well as a percentage of how many they got right. The submission with the best user experience and hardest test will win.', '2');
INSERT INTO `nodes` (`id`, `title`, `description`, `value`) VALUES ('4', 'Python - Calhoun Library System', 'Using Python, create a program that directs the user to a particular part of the library if they are looking for a specific type of book. Ask the user a series of questions about their book to determine where it would be located, and then direct them to the correct spot. The submission with the best user interface and most factual information will win.', '2');
INSERT INTO `nodes` (`id`, `title`, `description`, `value`) VALUES ('5', 'Hatch - Sports Match against Kennedy', 'Using Hatch, create a game in which you play a sports match against Kennedy. Your game must follow the structure of a sport offered here at Calhoun and have a way to keep track of score for both teams. Kennedy’s team can be controlled entirely by the program or by a second player. The submission with the best gaming experience will win.', '2');
INSERT INTO `nodes` (`id`, `title`, `description`, `value`) VALUES ('6', 'Sprite Editor - Calhoun Logo', 'Create a logo for Calhoun using the Sprite Editor app. Your logo must be a single frame but can be of any size. The submission with the best art and creative direction will win.', '2');
INSERT INTO `nodes` (`id`, `title`, `description`, `value`) VALUES ('7', 'Hatch - Class Night Game', 'Create a game in the theme of class night (ex. Tug of war, ) that pits one class of students against another (ex. Freshman vs. Seniors). You should ask the user to choose their class, keep score as the game progresses, and announce a winner at the end of the game. The submission with the best user experience and best gameplay will win.', '3');
INSERT INTO `nodes` (`id`, `title`, `description`, `value`) VALUES ('8', 'Sprite Editor - Calhoun Startup Animation', 'Create an animation that could be featured at the startup of the Calhoun computers. Your design must have animation. The submission with the best creative direction and animation will win.', '3');
INSERT INTO `nodes` (`id`, `title`, `description`, `value`) VALUES ('9', 'Python - Calhoun Choose Your Own Adventure Game', 'Using Python, create a choose your own adventure game in the terminal. Your game must have at least three different endings and failsafes for when the user inccorectly inputs data. The submission with the best story and user experience will win.', '3');
INSERT INTO `nodes` (`id`, `title`, `description`, `value`) VALUES ('10', 'Any Tool/Language - Calhoun Quiz Show', "Using any tool or language, create a game show in which players' knowledge on Calhoun trivia is tested. You may test on Calhoun's history, layout or teachers. Your program should keep a running tally of every one’s scores and present a winner by the end of the game. The submission with the best user experience and variety in questions will win.", '3');
INSERT INTO `nodes` (`id`, `title`, `description`, `value`) VALUES ('11', 'Any Tool/Language - Final Exam Boss Fight', "Using any tool or language, create a turn based combat game in which you fight a final exam. The player should have at least three different options given to them when it is their turn, and the final exam must also have three different moves it can perform. The submission with the best experience and intricacy will win.", '4');

CREATE TABLE paths(
    nodeA INT,
    nodeB INT,
    PRIMARY KEY(nodeA, nodeB)
);

CREATE TABLE points(
    node INT,
    i INT,
    x DEC(4, 3),
    y DEC(4, 3),
    PRIMARY KEY(node, i)
);

CREATE TABLE settings (
    judgePassword CHAR(64),
    startTime DATETIME,
    endTime DATETIME,
    inuse BOOLEAN,
    PRIMARY KEY (startTime)
);

INSERT INTO settings VALUES('6cab584ce094bc5d9e0052359b1d196b764f5d4981263196805c6bec0bb65083', "2023-02-15 14:30:00", "2023-02-15 15:30:00", 1);
INSERT INTO settings VALUES('6cab584ce094bc5d9e0052359b1d196b764f5d4981263196805c6bec0bb65083', "2023-02-13 18:10:00", "2023-02-15 18:30:00", 1);

CREATE TABLE submissions (
    node INT,
    team VARCHAR(32),
    submitTime DATETIME, 
    description TINYTEXT,
    link VARCHAR(128),
    holding BOOLEAN, 
    PRIMARY KEY(node, team)
);

CREATE TABLE teams(
    name VARCHAR(32),
    color CHAR(6),
    img VARCHAR(32),
    PIN CHAR(64),
    holding INT DEFAULT 0,
    PRIMARY KEY(name)
);

CREATE TABLE student(
    name VARCHAR(32),
    team VARCHAR(32),
    PRIMARY KEY(name)
);


INSERT INTO teams VALUES('Calhoun', '3B5091', 'calhoun.png', 'de068f662a8fc7314580eec3035053e6e708dd21d3a43deb7e2788f6107620ec', 0); --Sanford8
INSERT INTO teams VALUES('Kennedy', '2E5240', 'kennedy.png', 'cd404a13f7e2c78c6e3c498eecaea719fa9ca0b3ee5eed4b14c42782caa90b04', 0); --John6
INSERT INTO teams VALUES('Mepham', '812626', 'mepham.png', '7d0837cfbec2d56c0ec12a09528cf1126f3f187a94b78784c92836e6e28afe0e', 0); --Wellington3

INSERT INTO teams VALUES('Gabe', '218433', 'ff7ad865264932e608f6b884ddad47d5fe0e5d14a124b3ebe7ebda265ffe66d3', 0); --gabew
INSERT INTO teams VALUES('Jared', '885cce', '37acf70ae4cc6978aef955734dc99293e0ad0eb224c44c5ae2244458a026f14e', 0); --jaredp
INSERT INTO teams VALUES('Hayden', '46b2af', '1a30dfd3b054067f9a8e3d9b6fa04c23bf4e9545d2853c6538d159d17388d2ec', 0); --haydeno

TRUNCATE TABLE submissions; TRUNCATE TABLE judgments; UPDATE teams SET holding = 0; UPDATE nodes SET j = 0;
