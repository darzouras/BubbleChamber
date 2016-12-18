CREATE TABLE users (
  id INT(6) AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(16) NOT NULL,
  name VARCHAR(16) NOT NULL,
  sizeSetting INT(2),
  saveLocation VARCHAR(255),
  UNIQUE (username)
);
