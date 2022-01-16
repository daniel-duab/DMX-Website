const { error } = require('console');
const express = require('express');
const { json } = require('express/lib/response');
const app = express();

const http = require('http').Server(app); 

const io = require('socket.io')(http); 

const fs = require('fs'); 
const { Socket } = require('socket.io-client');

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
  socket.on('load-scene', (name)=>{

    let newScene;
    let data = fs.readFileSync("./scenes.json", "utf8")
    
    let newScenes = JSON.parse(data)
    newScene = newScenes.scenes[name]

    socket.emit('load-scene-return', JSON.stringify(newScene), false)

  });

  socket.on('save-scene', (name, newSceneSTR)=>{
    let newScene = JSON.parse(newSceneSTR)
    let scenes = 'defual';
    let data = fs.readFileSync("./scenes.json", "utf8" )
    
    //if (err) return reject(err);
    scenes = JSON.parse(data)
    scenes.scenes[name] = newScene
    console.log(scenes)
  
    
    console.log(scenes)
    if (scenes!="defual") fs.writeFileSync("./scenes.json", JSON.stringify(scenes), (e)=>{console.log('suces')})

    socket.emit('save-scene-return', JSON.stringify(newScene), false)
  });

});
function readScene(name, newScene) {
  return new Promise((resolve, reject)=>{
    fs.readFile("./scenes.json", "utf8", (err, data)=>{
      //if (err) return reject(err);
      scenes = JSON.parse(data)
      scenes.scenes[name] = newScene
      console.log(scenes)
      resolve();
    })
  })
} 

function sendByte(byte){
    arduino.write(byte);
}



http.listen(portus, () => {
    console.log(`server running at http://localhost:${portus}/`);
  });