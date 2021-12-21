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
app.use(express.static(__dirname + "/pac"))



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });



io.on('connection', (socket) =>{
  fs.readFile('./db/scene.json', (err, data)=>{
    try{
      socket.emit('scene-return', JSON.parse(data))
    }catch{
      socket.emit('fuck! an error happened!')
    }
  });
  console.log(socket.id)
    socket.on('scene-change', (obje)=>{
      fs.readFile('./db/scene.json', 'utf8', (err, data)=>{
        //get the data
        try{
        let update = JSON.parse(data);
        //nav to actual scene

        // iterate through childrem
        let ifNew = true;
        for (let i = 0; i<update.object.children.length; i++){
          // set the child val to the updated sent val
            let childName = update.object.children[i].name;
            if (childName === obje.object.name){
              update.object.children[i] = obje;
              fs.writeFile('./db/scene.json', JSON.stringify(update), 'utf-8', (err)=>{console.log('oobj update')});
              socket.broadcast.emit('scene-update', (update))
              
              ifNew = false
            }else if(ifNew){
              update.object.children[i] = obje;
              
              fs.writeFile('./db/scene.json', JSON.stringify(update), 'utf-8', (err)=>{console.log('nobj update')});
              socket.broadcast.emit('scene-add', (update))
              
              
            }
            //write it back to json file
            
          }
        }catch (errer){

          socket.emit('request-full-scene')
          console.error(errer);
        }
      })
    })
    socket.on('full-scene', (scene)=>{
      fs.writeFile('./db/scene.json', JSON.stringify(scene), 'utf-8', (err)=>{console.log('fs')});
      io.emit('scene-update', JSON.stringify(scene))
    });
    socket.on('scene-get', ()=>{
      fs.readFile('./db/scene.json', (err, data)=>{
        try{
          socket.emit('scene-return', JSON.parse(data))
        }catch{
          socket.emit('fuck! an error happened!')
        }
      });
    });
});


function sendByte(byte){
    arduino.write(byte);
}



http.listen(portus, () => {
    console.log(`server running at http://localhost:${portus}/`);
  });