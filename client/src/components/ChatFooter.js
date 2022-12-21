import React, { useState } from "react";
import InputEmoji from "react-input-emoji";
import { ThemeContext } from "../context/ThemeContext";
import "./ChatFooter.css";
import { fileTypes } from "../utilities/fileTypes";
import ContainerImage from "./ContainerImage";

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
        image: img,
      });
    }
    setMessage("");
  };

  const onImageChange = (e) => {
    const [file] = e.target.files;

    if(!fileTypes.includes(file.type)) {
      alert("Wrong Format file. Upload the correct one!");
      return;
    }

     /*Maximum allowed size in bytes
        5MB Example
        Change first operand(multiplier) for your needs*/
        const maxAllowedSize = 5 * 1024 * 1024;
      
        if (e.target.files[0].size > maxAllowedSize) {
          // Here you can ask your users to load correct file
           e.target.value = ''
           alert("File is too big!")
        } 

    console.log(file);
    setImg(URL.createObjectURL(file));
   
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
        <div className="images">
          <ContainerImage image={img}/>
        </div>
        <div className="file-container">          
          <label className="label-file" forhtml="myfile">Select a file</label>
          <input
            type="file"
            id="myfile"
            name = "myfile_uploads"
            onChange={onImageChange}
            multiple
          />
        </div>
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;
