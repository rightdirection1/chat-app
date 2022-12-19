import React, { useState, useEffect } from 'react';
import { FiUsers } from 'react-icons/fi';

const ChatBar = ({ socket }) => {
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] =useState([]);

  useEffect(() => {
    socket.on('newUserResponse', (data) => setUsers(data));

    //Does not work 
    socket.on('newRoomResponse', data => {
      //let test = [data.roomId];
      ///(test);
      setRooms([data.roomId]);
      setUsers(data.users);
      console.log(data.roomId.room);
      console.log(rooms);
     });
  }, [socket, users]);

  return (
    <div className="chat__sidebar">
      <h2>Open Chat</h2>
      <div>
        <h4 className="chat__header"><FiUsers/> ACTIVE USERS</h4>
        <div className="chat__users">
          {users.map((user) => (
            <p key={user.socketID}>{user.userName}</p>
          ))}
        </div>
      </div>
      <div>
            <h4  className='chat__header'>ACTIVE Rooms</h4>
            <div className='chat__users'>
            {rooms.map((room) => (
            <p key={room}>{room}</p>
          ))}
            </div>
        </div>
    </div>
  );
};

export default ChatBar;