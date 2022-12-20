import React, { useState } from "react";
import InputEmoji from "react-input-emoji";
import { ThemeContext } from "../context/ThemeContext";
import './ChatFooter.css';

const ChatFooter = ({ socket }) => {
  const [message, setMessage] = useState("");
  const { toggle } = React.useContext(ThemeContext);
  const [img, setImg] = useState();

  const handleTyping = () =>
    socket.emit("typing", `${localStorage.getItem("userName")} is typing`);


  const getTime = () => {
    let date = new Date();
    let hours = (date.getHours() < 10 ? "0" : "") + date.getHours();
    let minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
    return hours + ":" + minutes;
  };


  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem("userName")) {
      socket.emit("message", {
        text: message,
        name: localStorage.getItem("userName"),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
        time: getTime(),
        image: img
      });
    }
    setMessage("");
  };

  const onImageChange = (e) => {
    const [file] = e.target.files;
    console.log(file);
    setImg(URL.createObjectURL(file));
    console.log(img);
  };

  return (
    <div className="chat__footer" style={toggle ? { background: "black" } : {}}>
      <form className="form" onSubmit={handleSendMessage}>
        
        <InputEmoji
          id="input"
          value={message}
          onChange={setMessage}
          borderColor="yellow"
          placeholder="Type a message"
          theme="dark"
        />
        <div>
        <label for="myfile">Select a file:</label>
        <input type="file" id="myfile" onChange={onImageChange} name="myfile"/>
        </div>
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;
