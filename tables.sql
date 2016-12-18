CREATE TABLE users (
  id INT(11) AUTO_INCREMENT,
  username VARCHAR(16) NOT NULL,
  password VARCHAR(16) NOT NULL,
  name VARCHAR(16) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (username)
);

CREATE TABLE drawings (
  imgID INT(11) AUTO_INCREMENT PRIMARY KEY,
  userID INT(11) NOT NULL,
  img BLOB NOT NULL,
  PRIMARY KEY (imgID),
  FOREIGN KEY (userID) REFERENCES users (id)
)

INSERT INTO users (username, password, name) VALUES ('testuser', 'sqltest', 'Testy');
