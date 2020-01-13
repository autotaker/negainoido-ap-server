CREATE TABLE IF NOT EXISTS problem (
    id INT(10) NOT NULL auto_increment PRIMARY KEY,
    name VARCHAR(30) NOT NULL UNIQUE,
    description TEXT,
    url TEXT
);
