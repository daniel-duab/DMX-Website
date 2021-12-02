var nom, neccessary = 10;
            var ll = []
            var ll2 = []
            var socket = io();
            var idn;
            var mouseDown = false;
            socket.on('id', (idw)=>{
                idn = idw;

                console.log('id; ' + socket.id);
                socket.emit('est', socket.id);
            });
            socket.on('sliders', (sliders)=>{
                
                //if (ids!==idn){
                console.log('sliders');
                if(sliders){
                    var slidBox = "";
                for (i=0; i<sliders.length; i++){
                    
                    slidBox+="<div class=\"cont\"><input ondragleave=\"mouseDown = false;\" ondragstart=\"mouseDown = true;\" class=\"slide\" orient=\"vertical\" min=\"0\" step=\"1\" max=\"255\" type=\"range\" value=\"" + sliders[i][2] + "\" id=\"" + sliders[i][0] + "\">" 
                    slidBox+="<p class = \"titles\">" + sliders[i][0] + "<br>" + sliders[i][1] + "</p></div>"//"<p>" + sliders[i][2] + "</p>"
                }
                /*for (i=0; i<sliders.length; i++){
                    slidBox+="<p class = \"titles\">" + sliders[i][0] + "</p><p>" + sliders[i][2] + "</p>"
                }*/
                document.getElementById('lightboard').innerHTML = slidBox
            //}
        }
            });
            socket.on('stop', ()=>{
                neccessary = 100;
            });

            socket.on('nsliders', (sliders, ids)=>{
        
                if (ids!==idn){
                console.log('sliders');
                if(sliders){
                    var slidBox = "";
                    for (i=0; i<sliders.length; i++){
                    
                    slidBox+="<div class=\"cont\"><input class=\"slide\" min=\"0\" max=\"255\" type=\"range\" value=\"" + sliders[i][2] + "\" id=\"" + sliders[i][0] + "\">" 
                    slidBox+="<p class = \"titles\">" + sliders[i][0] + "<br>" + sliders[i][1] + "</p></div>"//"<p>" + sliders[i][2] + "</p>"
                }
                document.getElementById('lightboard').innerHTML = slidBox
            
            
        }
    }
            });
            
            function updater(){
                //console.log(mouseDown);
                if (mouseDown){
                ll2 = ll;
                ll = [];
                    for(i=0; i<document.getElementsByClassName('slide').length; i++){
                        
                        let v = document.getElementsByClassName('slide')[i].value
                        ll.push(v);
                        //console.log('i: '+i)
                        var n = i
                        
                    if (ll[i]!=ll2[i]){
                        
                        socket.emit('updateSlider', [n, v, socket.id])
                        //console.log('change')
                    }
                }
                ll2[i] = ll[i];
            
                
                    
            }
            setInterval(nec, 1);
            }
            document.addEventListener('mousedown', (e)=>{
                mouseDown = true;
            });
            document.addEventListener('mouseup', (e)=>{
                mouseDown = false;
            });
            document.addEventListener('touchstart', (e)=>{
                mouseDown = true;
            });
            document.addEventListener('touchend', (e)=>{
                mouseDown = false;
            });
            setInterval(updater, 100)