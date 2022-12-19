import React, { useState, useEffect, useContext } from 'react';
import { FiUsers } from 'react-icons/fi';
import { ThemeContext } from '../context/ThemeContext';
import ThemeChanger from './ThemeChanger'

const ChatBar = ({ socket }) => {
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] =useState([]);
  const {toggle} = useContext(ThemeContext);

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
    <div className="chat__sidebar" style={toggle ? { background: "black" } : {}}>
      <h2 style={toggle ? { color: "white" } : {}}>Open Chat</h2>
      <ThemeChanger/>
      <div>
        <h4 className="chat__header" style={toggle ? { color: "white" } : {}}><FiUsers/> ACTIVE USERS</h4>
        <div className="chat__users" style={toggle ? { color: "white" } : {}}>
          {users.map((user) => (
            <p key={user.socketID}>{user.userName}</p>
          ))}
        </div>
      </div>
      <div>
            <h4  className='chat__header' style={toggle ? { color: "white" } : {}}>ACTIVE Rooms</h4>
            <div className='chat__users' style={toggle ? { color: "white" } : {}}>
            {rooms.map((room) => (
            <p key={room}>{room}</p>
          ))}
            </div>
        </div>
    </div>
  );
};

export default ChatBar;