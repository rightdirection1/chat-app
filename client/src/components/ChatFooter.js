import React, { useState } from "react";
import InputEmoji from "react-input-emoji";
import { ThemeContext } from "../context/ThemeContext";
import "./ChatFooter.css";
import { fileTypes } from "../utilities/fileTypes";
import ContainerImage from "./ContainerImage";
import { RiFileUploadLine } from "react-icons/ri";
import uniqid from "uniqid";

const ChatFooter = ({ socket }) => {
  const [message, setMessage] = useState("");
  const { toggle } = React.useContext(ThemeContext);
  const [files, setFiles] = useState([]);

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

    const data = {
      text: message,
      name: localStorage.getItem("userName"),
      id: `${socket.id}${Math.random()}`,
      socketID: socket.id,
      time: getTime(),
      files: files,
    };

    if (message.trim() && localStorage.getItem("userName")) {
      socket.emit("message", data);
    }
    setMessage("");

    if (files) {
      setFiles([]);
    }
  };

  const onImageChange = (e) => {
    const maxAllowedSize = 200 * 1024 * 1024; // bytes

    const selectedFiles = [...e.target.files];
    let blobFiles = [];

    for (const file of selectedFiles) {
      if (!fileTypes.includes(file.type)) {
        alert("Wrong Format file. Upload the correct one!");
        return;
      }

      if (file.size > maxAllowedSize) {
        e.target.value = "";
        alert("File is too big!");
        return;
      }

      blobFiles.push({
        fileURL: URL.createObjectURL(file),
        id: uniqid("id-"),
        fileType: file.type,
        name: file.name,
      });
      setFiles(blobFiles);
      console.log(blobFiles);
    }

    e.target.value = "";
  };

  const onCloseFile = (currentFile) => {
    setFiles(files.filter((file) => file.id !== currentFile.id));
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
          <ContainerImage files={files} onClose={onCloseFile} />
        </div>
        <div className="file-container">
          <label className="label-file" forhtml="myfile">
            <RiFileUploadLine />
          </label>
          <input
            type="file"
            id="myfile"
            name="myfile_uploads"
            onChange={onImageChange}
            multiple="multiple"
            placeholder="Choose a file..."
          />
        </div>
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;
