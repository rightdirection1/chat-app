import React, { useState } from "react";
import "./ImageContainer.css";
import { IoIosClose } from "react-icons/io";

function ContainerImage({ files, onClose }) {
  return (
    <div className="container-files">
      {files.length !== 0 ? (
        files.map((file) => (
          <div style={{ background: "#fff" }}>
            <IoIosClose className="icon" onClick={() => onClose(file)} />
            <img id="image" alt="" src={file.fileURL} />
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
}

export default ContainerImage;
