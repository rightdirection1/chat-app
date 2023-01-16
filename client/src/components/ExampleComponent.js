import { useReactMediaRecorder } from "react-media-recorder";
import React, { useState } from "react";

const RecordView = () => {
  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
    clearBlobUrl
  } = useReactMediaRecorder({ audio: true });

  const [url, setUrl] = useState(mediaBlobUrl);
  const resetRecording = () => {
    console.log("clicked");
   
    clearBlobUrl();
  };

  return (
    <div>
      <p>{status}</p>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      <audio src={mediaBlobUrl} controls />
      <button onClick={clearBlobUrl}>Reset Recording</button>
    </div>
  );
};

export default RecordView;
