import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BsEmojiSmile } from "react-icons/bs";
import { GrDocumentTxt } from "react-icons/gr";
import { ThemeContext } from "../context/ThemeContext";
import "./ChatBody.css";
import RecordView from "./ExampleComponent";
import ModalPreviewPhoto from "./ModalPreviewPhoto";

const ChatBody = ({ messages, typingStatus, lastMessageRef }) => {
  const navigate = useNavigate();
  const { toggle } = useContext(ThemeContext);

  const [img, setImg] = useState({
    src: "placeholder",
    alt: "Upload an Image",
    isOpenModal: false,
  });

  const handleLeaveChat = () => {
    localStorage.removeItem("userName");
    navigate("/");
    window.location.reload();
  };

  const openModal = (fileURL, name) => {
    ///
    setImg({
      src: fileURL,
      alt: name,
      isOpenModal: true,
    });
    console.log(img);
  };

  return (
    <>
      <RecordView />
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

      <div
        className="message__container"
        style={toggle ? { background: "#240B06" } : {}}
      >
        {messages.map((message) =>
          message.name === localStorage.getItem("userName") ? (
            <div className="message__chats" key={message.id}>
              <p className="sender__name">You</p>
              <div
                className="message__sender"
                style={toggle ? { background: "#C0B83B" } : {}}
              >
                <p>{message.time}</p>
                <p>{message.text}</p>
                {message.files.map((file) =>
                  file.fileType.includes("image") ? (
                    <img
                      id="image"
                      alt={file.name}
                      onClick={() => openModal(file.fileURL, file.name)}
                      src={file.fileURL}
                    />
                  ) : (
                    <a href={file.fileURL} target="_blank" download={file.name}>
                      <GrDocumentTxt />
                      {file.name}
                    </a>
                  )
                )}
              </div>
            </div>
          ) : (
            <div className="message__chats" key={message.id}>
              <p>{message.name}</p>
              <div
                className="message__recipient"
                style={toggle ? { background: "#C03BA0" } : {}}
              >
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

      {img.isOpenModal ? (
        <ModalPreviewPhoto
          isOpenedModal={img.isOpenModal}
          src={img.src}
          alt={img.alt}
        />
      ) : null}
    </>
  );
};

export default ChatBody;
