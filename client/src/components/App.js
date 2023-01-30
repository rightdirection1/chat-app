import { useContext } from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./Home"
import ChatPage from "./ChatPage";
import ModalPreviewPhoto from "./ModalPreviewPhoto"
import socketIO from "socket.io-client"
const socket = socketIO.connect("http://localhost:4000")


function App() {
  return (
    <BrowserRouter>
      <div>
       <Routes>
         <Route path="/" element={<Home socket={socket} />}></Route>
          <Route path="/chat" element={<ChatPage socket={socket} />}></Route>
        </Routes>
       </div>
     </BrowserRouter>
  );
}

export default App;