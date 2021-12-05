import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    BoxGeometry,
    MeshPhongMaterial,
    Mesh,
    PointLight,
    AmbientLight,
    Float16BufferAttribute,
  } from "./vendor/three/build/three.module.js";

import {scene} from "./canvas.mjs"
import {socket} from "./sockets.mjs"
let boxes = {};


function closeSettings(){
    clearInterval(updateBoxProperties);
    document.getElementById('settings-box').innerHTML = ""
    window.currentName = '';
}
function clickSettingsBox(){
    if(scene.getObjectByName(currentName) != ''){
    socket.emit('scene-change', scene.getObjectByName(currentName));
    console.log(currentName);
}
    

}
function createPrism(name){
    var box = new BoxGeometry(1, 1, 1);
    var mat = new MeshPhongMaterial({ color: "rgb(0, 0, 0)" });
    var cube = new Mesh(box, mat);
    cube.name = name;
    cube.receiveShadow = true;
    cube.castShadow = true;
    console.log(cube);
    scene.add(cube);
}

async function box(name){
    console.log(scene)
    let nameCheck = false;
    for (let i = 0; i<scene.children.length; i++){
        let childName = scene.children[i].name
        if (childName === name){
            nameCheck = true;
        }
    }



    closeSettings();

    if(!nameCheck){
        createPrism(name)
    }

    
    let elem = scene.getObjectByName(name);
    let settings = document.getElementById('settings-box')
    settings.setAttribute('onclick', "window.clickSettingsBox()")
    let named = document.createElement('p');
    named.id = name
    named.innerHTML = name
    named.className = 'setting-object'
    
    

    let xOut = document.createElement('button')
    xOut.id = 'x'
    xOut.innerHTML = 'x'
    xOut.className = 'x-button'
    xOut.setAttribute('onclick', 'window.closeSettings()')
    
    
    let dimensionHeader = document.createElement('p');
    dimensionHeader.innerHTML = "Dimensions"
    dimensionHeader.className = 'setting-header'
    let dimYLabel = document.createElement('p');
    dimYLabel.className = 'setting-label'
    dimYLabel.innerHTML = 'Y'
    let dimY = document.createElement('input');
    dimY.id = 'dimY'
    dimY.className = 'setting'
    dimY.type = 'number'
    dimY.value = elem.scale.y
    let dimXLabel = document.createElement('p');
    dimXLabel.className = 'setting-label'
    dimXLabel.innerHTML = 'X'
    let  dimX = document.createElement('input');
    dimX.id = 'dimX'
    dimX.className = 'setting'
    dimX.type = 'number'
    dimX.value = elem.scale.x
    let dimZLabel = document.createElement('p');
    dimZLabel.className = 'setting-label'
    dimZLabel.innerHTML = 'Z'
    let dimZ = document.createElement('input');
    dimZ.id = 'dimZ'
    dimZ.className = 'setting'
    dimZ.type = 'number'
    dimZ.value = elem.scale.z

    let positionHeader = document.createElement('p');
    positionHeader.className = 'setting-header'
    positionHeader.innerHTML = "Position"
    let posYLabel = document.createElement('p');
    posYLabel.className = 'setting-label'
    posYLabel.innerHTML = 'Y'
    let posY = document.createElement('input');
    posY.id = 'posY'
    posY.className = 'setting'
    posY.type = 'number'
    posY.value = elem.position.y
    let posXLabel = document.createElement('p');
    posXLabel.className = 'setting-label'
    posXLabel.innerHTML = 'X'
    let posX = document.createElement('input');
    posX.id = 'posX'
    posX.className = 'setting'
    posX.type = 'number'
    posX.value = elem.position.x
    let posZLabel = document.createElement('p');
    posZLabel.className = 'setting-label'
    posZLabel.innerHTML = 'Z'
    let posZ = document.createElement('input');
    posZ.id = 'posZ'
    posZ.className = 'setting'
    posZ.type = 'number'
    posZ.value = elem.position.z

    let rotationHeader = document.createElement('p');
    rotationHeader.className = 'setting-header'
    rotationHeader.innerHTML = "Rotation"
    let rotYLabel = document.createElement('p');
    rotYLabel.className = 'setting-label'
    rotYLabel.innerHTML = 'Y'
    let rotY = document.createElement('input');
    rotY.id = 'rotY'
    rotY.max = 360;
    rotY.min = 0;
    rotY.type = 'number'
    rotY.className = 'setting'
    rotY.value = elem.rotation.y * 180/3.14
    let rotXLabel = document.createElement('p');
    rotXLabel.className = 'setting-label'
    rotXLabel.innerHTML = 'X'
    let rotX = document.createElement('input');
    rotX.id = 'rotX'
    rotX.max = 360;
    rotX.min = 0;
    rotX.type = 'number'
    rotX.className = 'setting'
    rotX.value = elem.rotation.x * 180/3.14
    let rotZLabel = document.createElement('p');
    rotZLabel.className = 'setting-label'
    rotZLabel.innerHTML = 'Z'
    let rotZ = document.createElement('input');
    rotZ.id = 'rotZ'
    rotZ.max = 360;
    rotZ.min = 0;
    rotZ.type = 'number'
    rotZ.className = 'setting'
    rotZ.value = elem.rotation.z * 180/3.14

    let colorHeader = document.createElement('p');
    colorHeader.className = 'setting-header'
    colorHeader.innerHTML = "Color"
    let color = document.createElement('input');
    color.id = 'color'
    color.type = 'color'
    color.className = 'setting'
    color.value = "#" + fullByte((Math.floor(elem.material.color.r * 255)).toString(16)) + fullByte((Math.floor(elem.material.color.g* 255)).toString(16)) + fullByte((Math.floor(elem.material.color.b* 255)).toString(16))
    

        settings.appendChild(named)
        settings.appendChild(xOut)

        settings.appendChild(positionHeader)

        settings.appendChild(posXLabel)
        settings.appendChild(posX)

        settings.appendChild(posYLabel)
        settings.appendChild(posY)

        settings.appendChild(posZLabel)
        settings.appendChild(posZ)


        settings.appendChild(dimensionHeader)

        settings.appendChild(dimXLabel)
        settings.appendChild(dimX)

        settings.appendChild(dimYLabel)
        settings.appendChild(dimY)

        settings.appendChild(dimZLabel)
        settings.appendChild(dimZ)


        settings.appendChild(rotationHeader)

        settings.appendChild(rotXLabel)
        settings.appendChild(rotX)
        
        settings.appendChild(rotYLabel)
        settings.appendChild(rotY)

        settings.appendChild(rotZLabel)
        settings.appendChild(rotZ)

        settings.appendChild(colorHeader)

        settings.appendChild(color)
    

    setInterval(updateBoxProperties, 17, boxes, name)

}

async function updateBoxProperties(boxes, name){
    if (document.getElementById('settings-box').hasChildNodes){
        const container = document.getElementById('settings-box')
        if(document.getElementById(name)){
            
                const boxName = document.getElementById(name).innerHTML;
                window.currentName = boxName;
                const dimX = document.getElementById('dimX').value;
                const dimY = document.getElementById('dimY').value;
                const dimZ = document.getElementById('dimZ').value;
                
                const posX = document.getElementById('posX').value;
                const posY = document.getElementById('posY').value;
                const posZ = document.getElementById('posZ').value;

                const rotX = document.getElementById('rotX').value;
                const rotY = document.getElementById('rotY').value;
                const rotZ = document.getElementById('rotZ').value;

                const color = document.getElementById('color').value;
            

            

            if (boxes[boxName]){
                const prism = scene.getObjectByName(boxName);
                prism.position.x = posX
                prism.position.y = posY
                prism.position.z = posZ

                prism.rotation.x = rotX * 3.14/180 // scale to deg
                prism.rotation.y = rotY * 3.14/180
                prism.rotation.z = rotZ * 3.14/180 

                prism.scale.x = dimX
                prism.scale.y = dimY
                prism.scale.z = dimZ

                prism.material.color.r = parseInt(color.substr(1,2), 16) /255 // scale to flt
                prism.material.color.g = parseInt(color.substr(3,2), 16) /255
                prism.material.color.b = parseInt(color.substr(5,2), 16) /255
                
                //socket.emit('scene-change', scene, scene.getObjectByName(boxName));
                /*
                boxes[boxName].dimX = dimX
                boxes[boxName].dimY = dimY
                boxes[boxName].dimZ = dimZ

                boxes[boxName].posX = posX
                boxes[boxName].posY = posY
                boxes[boxName].posZ = posZ

                boxes[boxName].rotX = rotX
                boxes[boxName].rotY = rotY
                boxes[boxName].rotZ = rotZ

                boxes[boxName].color = color */
                
            }
        }
    }
    
}


function newBox(name){
    if (name != ''){
        let newBox = {};
        newBox.name = name
        boxes[name] = newBox;
        box(name)
    }else{
        closeSettings();
    }
}

function fullByte(string){
    if(string.length == 1){
        return '0' + string
    }
    else if(string.length == 0){
        return '00'
    }else{
        return string;
    }
}


export { newBox, closeSettings, clickSettingsBox, fullByte}
