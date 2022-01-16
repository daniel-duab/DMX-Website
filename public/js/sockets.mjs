import { boxes, getBoxes, refreshBoxes } from "./boxFoundation.mjs";
import { scene } from "./canvas.mjs";
import { getLights, lights, refreshLights } from "./lightFoundation.mjs";
import { Color, ObjectLoader } from "./vendor/three/build/three.module.js";

//import { io } from "socket.io-client/dist/socket.io"
let socket = io();

document.addEventListener("keydown", (e)=>{
    if(e.keyCode == 38){
    document.getElementById("stage").innerHTML = `
<div class="board-elem">
    <input class="board-light" type="range">
    <h6 class="board-label">Right Center Well</h6>
    <p class="board-channel">40</p>
    <input class="board-value" value="200">
</div>
<div class="board-elem">
    <input class="board-light" type="range">
    <h6 class="board-label">Left Center Well</h6>
    <p class="board-channel">41</p>
    <input class="board-value" value="200">
</div>
<div class="board-elem">
    <input class="board-light" type="range">
    <h6 class="board-label">Center Well</h6>
    <p class="board-channel">20</p>
    <input class="board-value" value="200">
</div>`
    }
})

document.addEventListener("keydown", e=>{
    console.log("d")
    if (e.keyCode == 75) console.log(getBoxes())
    if (e.keyCode == 74) console.log(getLights())
})

function resetLigtsAndBoxes(){
    refreshBoxes()
    refreshLights()
}

function saveScene(){
    socket.emit('save-scene', document.getElementById("inBox").value, JSON.stringify(scene.toJSON()))
}

function updateScene(){
    socket.emit('update-scene', JSON.stringify(scene.toJSON()))
}

function loadScene(){
    socket.emit('load-scene', document.getElementById("inBox").value)
}

function parseLoadedSceneJSON(sceneJSON){
    scene.clear();
    let rScene = new ObjectLoader().parse(sceneJSON)
    console.log('plsjtop')
    console.log(sceneJSON)
    for(let object of sceneJSON.object.children){
        
        scene.add(rScene.getObjectByProperty('uuid', object.uuid))
    }

    resetLigtsAndBoxes()
    console.log(boxes)
}

function parseLoadedSceneLightsJSON(sceneJSON){ // TODO: this by the id system set up in testing file!
    for(let object of sceneJSON.object.children){
        if(object.type === "SpotLight"){
            scene.getObjectById(object.id).intensity = object.intensity
            scene.getObjectById(object.id).target = object.target
        }
    }
}

socket.on('load-scene-return', (sceneSTR, err)=>{
    if(!err){
        parseLoadedSceneJSON(JSON.parse(sceneSTR))
        console.log("Socket Success: load scene return")
    }else{
        console.error("Socket Error: load scene return")
    }
})

socket.on('update-scene-return', (sceneSTR, err)=>{
    if(!err){
        parseLoadedSceneLightsJSON(JSON.parse(sceneSTR))
        console.log("Socket Success: load scene return")
    }else{
        console.error("Socket Error: load scene return")
    }
})

socket.on('save-scene-return', (sceneSTR, err)=>{
    if(!err){
        parseLoadedSceneJSON(JSON.parse(sceneSTR))
        console.log("Socket Success: save scene return")
    }else{
        console.log("Socket Error: save scene return")
    }
})

export {socket, loadScene, updateScene, saveScene}
