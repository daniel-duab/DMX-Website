const express = require('express');
const app = express();

const http = require('http').Server(app); 

const io = require('socket.io')(http); 

const { lookupService } = require('dns'); 

const fs = require('fs'); 

const portus = process.env.PORT || 3000; 

var arduino;

/*
  const SerialPort = require("serialport");
  arduino = new SerialPort("/dev/cu.usbserial-14140", 9600);

  let Readline = Serial Port.parsers.Readline; 
  let parser = new Readline(); 
  arduino.pipe(parser); 

  arduino.on("open", () => {
      console.log('serial port open');
  });
*/


app.use(express.static(__dirname + "/public"))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });




io.on('connection', (socket) =>{
    
});


function sendByte(byte){
    arduino.write(byte);
}



http.listen(portus, () => {
    console.log(`server running at http://localhost:${portus}/`);
  });