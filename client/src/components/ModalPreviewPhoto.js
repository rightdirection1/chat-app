import React, { useState } from "react";
import "./ModalPreviewPhoto.css";

const ModalPreviewPhoto = (src, alt, isOpenedModal) => {
  const [modal, setModal] = useState(false);



  const onCloseModal = () => {
    console.log(src.isOpenedModal)
      if (src.isOpenedModal === true) {
        setModal(false);
        console.log(1)
      } else {
        console.log(2)
        setModal(false);
      }
   };


  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
      {
        <div className={modal === false ? "test" : "modal"}>
          <div lassName="overlay"></div>
          <div className="modal-content">
            <h2>Hello Modal</h2>
            <p>Example of modal</p>
            <img src={src.src} width="500px" alt={alt.alt} />
            <button className="close-modal" onClick={onCloseModal}>
              X
            </button>
          </div>
        </div>
      }
    </>
  );
};

export default ModalPreviewPhoto;
