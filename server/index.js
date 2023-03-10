const express = require("express");
const app = express();
const cors = require("cors");
bodyParser = require('body-parser');
mysql = require('mysql');
const http = require('http').Server(app);
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());


//setup database 
db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'chat'
})

console.log(db);




const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});


let users = [];
let rooms = [];

socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`)  

    socket.on("message", data => {
      socketIO.emit("messageResponse", data)
    })

    socket.on("typing", data => (
      socket.broadcast.emit("typingResponse", data)
    ))

    socket.on("newUser", data => {
      users.push(data) 
      socketIO.emit("newUserResponse", users)
    })
    
    socket.on("joinRoom", data => {
     
      console.log(data.room);
       debugger;
       const room = {
        roomId: data.room,
        users: users       
      };
      
       socketIO.emit("newRoomResponse", room);
    })
 

    socket.on('disconnect', () => {
      console.log('A user disconnected');
      users = users.filter(user => user.socketID !== socket.id)
      socketIO.emit("newUserResponse", users)
      socket.disconnect()
    });
});

app.get("/api", (req, res) => {
  res.json({message: "Hello"})
});

   
http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});