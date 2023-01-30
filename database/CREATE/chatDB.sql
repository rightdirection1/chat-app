CREATE TABLE users (
 UserId INT NOT NULL AUTO_INCREMENT, 
 Username varchar(255) NOT NULL, 
 Email varchar(255),
 Password varchar(255) NOT NULL, 
 DateCreated DATETIME NOT NULL,
 PRIMARY KEY (UserId)
 )

 CREATE TABLE rooms (
  RoomId INT NOT NULL ,
  Name VARCHAR(255) NOT NULL, 
  DataCreated DATETIME NOT NULL,
  UserId INT NOT NULL,
  PRIMARY KEY(RoomId)  
 )

ALTER TABLE `chat`.`rooms` 
ADD CONSTRAINT `FKRoomsUsersUserId`
  FOREIGN KEY (`UserId`)
  REFERENCES `chat`.`users` (`UserId`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;


CREATE TABLE messages (
  MessageId INT NOT NULL AUTO_INCREMENT,
  Content VARCHAR(255) NOT NULL, 
  DateCreated DATETIME NOT NULL, 
  PRIMARY KEY(MessageId),
  UserId INT NOT NULL,
  RoomId INT NOT NULL,
  FOREIGN KEY (UserId) REFERENCES users(UserId),
  FOREIGN KEY (RoomId) REFERENCES rooms(RoomId)
)


  CREATE TABLE roomUsers (
  RoomId INT NOT NULL,
  UserId INT NOT NULL,
  DateJoined DATETIME NOT NULL,
  PRIMARY KEY(RoomId, UserId)
 )

 ALTER TABLE `chat`.`roomUsers` 
ADD CONSTRAINT `FKRoomsRoomUsers`
  FOREIGN KEY (`RoomId`)
  REFERENCES `chat`.`rooms` (`RoomId`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

 
 ALTER TABLE `chat`.`roomUsers` 
ADD CONSTRAINT `FKUsersRoomUsers`
  FOREIGN KEY (`UserId`)
  REFERENCES `chat`.`users` (`UserId`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION; 
  
CREATE TABLE files (
FiledId INT NOT NULL AUTO_INCREMENT, 
FileType NVARCHAR(255) NOT NULL,
Content VARBINARY NOT NULL,
FileName NVARCHAR(255) NOT NULL,
PRIMARY KEY(FiledId),
MessageId INT,
FOREIGN KEY (MessageId) REFERENCES messages(MessageId)
)
