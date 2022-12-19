import React, {useState} from 'react'
import {useNavigate} from "react-router-dom"

const Home = ({socket}) => {
    const navigate = useNavigate()
    const [userName, setUserName] = useState("");
    const [room, setRoom] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault()
        localStorage.setItem("userName", userName)
        localStorage.setItem("room",room);

        socket.emit("newUser", {userName,socketID: socket.id});
        
        //Join 
        socket.emit('joinRoom', {userName, room}) 
  
        navigate("/chat")
    }
  return (
    <form className='home__container' onSubmit={handleSubmit}>
        <h2 className='home__header'>Sign in to Open Chat</h2>
        <label htmlFor="username">Username</label>
        <input type="text" 
        minLength={6} 
        name="username" 
        id='username'
        className='username__input' 
        value={userName} 
        onChange={e => setUserName(e.target.value)}
        />
        <label htmlFor="room">Room</label>
        <input type ="text" minLength={6}
         name="room"
         id="room"
         className='username__input'
         value={room}
         onChange={e => setRoom(e.target.value)}
         />
        <button className='home__cta'>SIGN IN</button>
    </form>
  )
}

export default Home