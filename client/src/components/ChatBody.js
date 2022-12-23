import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BsEmojiSmile } from "react-icons/bs";
import { ThemeContext } from "../context/ThemeContext";
import {Link} from 'react-router-dom';
import './ChatBody.css';
import RecordView from "./ExampleComponent";

const ChatBody = ({ messages, typingStatus, lastMessageRef }) => {
  const navigate = useNavigate();
  const { toggle } = useContext(ThemeContext);

  const handleLeaveChat = () => {
    localStorage.removeItem("userName");
    navigate("/");
    window.location.reload();
  };

  console.log(messages);

  return (
    <>
     <RecordView/>
      <header
        className="chat__mainHeader"
        style={toggle ? { background: "black" } : {}}
      >
        <p style={toggle ? { color: "white" } : {}}>
          <BsEmojiSmile /> Hangout with friends <BsEmojiSmile />
        </p>
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>

      <div className="message__container" style={toggle ? { background: "#240B06" } : {}}>
        {messages.map((message) =>
          message.name === localStorage.getItem("userName") ? (
            <div className="message__chats" key={message.id} >
              <p className="sender__name">You</p>
              <div className="message__sender" style={toggle? {background: '#C0B83B'}: {}}>
                <p>{message.time}</p>
                <p>{message.text}</p>
                {
                  message.files.map(file => (
                    <a href={file} target="_blank" download><img id="image" src={file} /></a>
                  ))
                }
                
              </div>
            </div>
          ) : (
            <div className="message__chats" key={message.id}>
              <p>{message.name}</p>
              <div className="message__recipient" style={toggle? {background: "#C03BA0"}: {}}>
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}

        <div className="message__status">
          <p>{typingStatus}</p>
        </div>
        <div ref={lastMessageRef} />
      </div>
    </>
  );
};

export default ChatBody;
