const app = require('express')();

const i2c = require("i2c-bus");

const http = require('http').Server(app); 

const io = require('socket.io')(http); 

const { lookupService } = require('dns'); 

const fs = require('fs'); 

const portus = process.env.PORT || 25656; 

//const SerialPort = require("serialport"); 
//var arduino = new SerialPort("/dev/cu.usbserial-14140", 9600);

//let Readline = SerialPort.parsers.Readline; 
//let parser = new Readline(); 
//arduino.pipe(parser); 

let ids = [];
let ons = [];
let gets = [];
let sliders = [
["Jake", [1], 0], 
["Finn", [1], 0], 
["GrassWizard", [1], 0], 
["BMO", [1], 0], 
["Default", [1, 2, 3, 4], 0]
];


//arduino.write("1c100v")

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

  function clons(){
    for(i=0; i<512; i++){
        gets[i] = [false, -1];
        ons[i] = false;
    }
  }
function start(){
    for(i=0; i<512; i++){
        ons.push(false);
        gets.push([false, -1]);
    }
    console.log('Ons Created!');
    console.log('gets Created!');
}
start();
  

app.get('/new', (req, res) => {
    res.sendFile(__dirname + '/newCues.html');
  });
  app.get('/del', (req, res) => {
    res.sendFile(__dirname + '/delSliders.html');
  });
  app.get('/btns', (req, res) => {
    res.sendFile(__dirname + '/btns.html');
  });

  arduino.on("open", () => {
    console.log('serial port open');
  });
  parser.on('data', data=>{
      //console.log(data);
  })


io.on('connection', (socket) =>{
    socket.emit('id', socket.id)
    socket.emit('sliders', sliders);
    ids.push(socket.id);
    socket.on('est', (id)=>{
        console.log(id + ' CONNECTED');
    });

    socket.on('estMK', (id)=>{
        console.log(id + ' CONNECTED MK');
    });

socket.on('pause', ()=>{
    io.emit('stop');
});

    socket.on('disconnect', ()=>{
        //console.log(socket.id + " DISCONNNECTED");
        for (i=0; i<ids.length; i++) {
            if (ids[i] == socket.id){
                ids.splice(i, 0);
            }
        }
    });

    socket.on('newSlider', (newSlider)=>{
        
        sliders.unshift(newSlider);
        io.emit('sliders', sliders);
        //sendallBytes();
        
    });
    
    socket.on('updateSlider', (l)=>{
            if(l[0]<sliders.length){
            console.log("n: " + l[0] + "   v: " + l[1] + "  id: " + l[2])
            sliders[l[0]][2] = l[1]
            io.emit('nsliders', sliders, l[2]);
            //sendallBytes();
        }
        
        
    });
socket.on('newBytes', sendallBytes);
    socket.on('delSlider', (data)=>{
            for(i=0; i<sliders[data][1].length; i++){
                var sendDat = sliders[data][1][i] + 'c0v'
            }
            sliders.splice(data, 1);
            //console.log('deleted slider #' + data);
            io.emit('sliders', sliders);
            
        })
    });
    /* THIS FUNCTION NEEDS TO BE REFACTORED FOR I2C INSTEAD OF THE UART SERIAl I WAS USING BEFORE!!!

    function sendallBytes(){
        
        for(i=0; i<sliders.length; i++){
            for(e=0; e<sliders[i][1].length; e++){
                if (sliders[i][2] > 0){
                    gets[sliders[i][1][e]] = [true];
                }
                
            }
            for(e=0; e<sliders[i][1].length; e++){
                
                    //console.log('a');
                    //if(ons[sliders[i][1][e]] === false){
                    if (ons[sliders[i][1][e]] === false){
                        console.log(sliders)
                        
                        var bite = sliders[i][1][e] + 'c' + sliders[i][2] + 'v';
                        //arduino.write(bite);
                        
                        console.log(bite);
                        //console.log(sliders[i][2])
                        
                        if(gets[sliders[i][1][e]][0]){
                            ons[sliders[i][1][e]] = true;
                            arduino.write(bite);
                        }else{
                            arduino.write(sliders[i][1][e] + 'c0v')
                        }
                        
                    }else{console.log('written')}
                    }
            //}else{console.log('no ' + ri)}
        }
        clons()
            

        }*/
        function ser(dat){
            arduino.write(dat)
        }
        function sendByte(bite){
            arduino.write(bite);
        }



http.listen(portus, () => {
    console.log(`server running at http://localhost:${portus}/`);
  });


