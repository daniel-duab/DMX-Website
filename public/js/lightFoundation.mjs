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
    SpotLight,
    ConeBufferGeometry,
    ConeGeometry,
    MeshLambertMaterial,
    SpotLightHelper,
    Object3D,
    Light,
  } from "./vendor/three/build/three.module.js";

import {scene} from "./canvas.mjs"
import {socket} from "./sockets.mjs"
import { clickSettingsBox, closeSettings } from "./boxFoundation.mjs";
let lights = {};

function createLight(name){
    var light = new SpotLight();
    light.name = name;
    light.receiveShadow = true;
    light.castShadow = true;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;

    light.shadow.camera.near = 500;
    light.shadow.camera.far = 4000;
    light.shadow.camera.fov = 30;
    light.castShadow = true;
    
    console.log(light);
    scene.add(light);
    scene.add( light.target );
}

async function light(name){
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
        createLight(name)
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
    let delButton = document.createElement('button')
    delButton.id = 'recycle'
    delButton.innerHTML = '♲'
    delButton.className = 'recycling'
    delButton.setAttribute('onclick', "window.deleteIt(scene.getObjectByName(document.getElementsByClassName('setting-object').item(0).id))")
    
    
    let miscHeader = document.createElement('p');
    miscHeader.innerHTML = "Misc"
    miscHeader.className = 'setting-header'
    let angleLabel = document.createElement('p');
    angleLabel.className = 'setting-label'
    angleLabel.innerHTML = 'a'
    let angle = document.createElement('input');
    angle.id = 'angle'
    angle.className = 'setting'
    angle.type = 'range'
    angle.setAttribute("onchange", "document.getElementById('pangle').value = Math.pow(2, -this.value+1)")
    angle.min = 1 // was acting funny with <1/>0
    angle.max = 8 // actually 2 because when reading value i take log10(angle)
    angle.step = 0.001
    angle.value = elem.angle
    let pangle = document.createElement('input');
    pangle.id = 'pangle'
    pangle.setAttribute("onchange", "document.getElementById('angle').value = -(Math.log(this.value)-Math.log(2))/Math.log(2)")
    pangle.className = 'setting'
    pangle.type = 'number'

    pangle.step = 0.01
    pangle.value = elem.angle
    let intensityLabel = document.createElement('p');
    intensityLabel.className = 'setting-label'
    intensityLabel.innerHTML = 'i'
    let intensity = document.createElement('input');
    intensity.id = 'intensity'
    intensity.className = 'setting'
    intensity.type = 'range'
    intensity.min = 0
    intensity.max = 1
    intensity.step = 0.00001
    intensity.value = elem.intensity
    let penumbraLabel = document.createElement('p');
    penumbraLabel.className = 'setting-label'
    penumbraLabel.innerHTML = 'p'
    let penumbra = document.createElement('input');
    penumbra.id = 'penumbra'
    penumbra.className = 'setting'
    penumbra.type = 'range'
    penumbra.min = 0
    penumbra.max = 1
    penumbra.step = 0.00001
    penumbra.value = elem.penumbra

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
    color.value = "#" + fullByte((Math.floor(elem.color.r * 255)).toString(16)) + fullByte((Math.floor(elem.color.g* 255)).toString(16)) + fullByte((Math.floor(elem.color.b* 255)).toString(16))
    let lhelp = document.createElement('input');
    lhelp.id = 'helperToggle'
    lhelp.type = 'checkbox'
    lhelp.className = 'setting'

        settings.appendChild(named)
        settings.appendChild(xOut)
        settings.appendChild(delButton)
        settings.appendChild(positionHeader)

        settings.appendChild(posXLabel)
        settings.appendChild(posX)

        settings.appendChild(posYLabel)
        settings.appendChild(posY)

        settings.appendChild(posZLabel)
        settings.appendChild(posZ)


        settings.appendChild(miscHeader)

        settings.appendChild(angleLabel)
        settings.appendChild(angle)
        settings.appendChild(pangle)

        settings.appendChild(intensityLabel)
        settings.appendChild(intensity)

        settings.appendChild(penumbraLabel)
        settings.appendChild(penumbra)



        settings.appendChild(rotationHeader)

        settings.appendChild(rotXLabel)
        settings.appendChild(rotX)
        
        settings.appendChild(rotYLabel)
        settings.appendChild(rotY)

        settings.appendChild(rotZLabel)
        settings.appendChild(rotZ)

        settings.appendChild(colorHeader)

        settings.appendChild(color)
        settings.appendChild(lhelp)

        if(!scene.getObjectByName(name + "-lhp")){ //-lighthelper
            let spotLightHelper = new SpotLightHelper( scene.getObjectByName(name) );
            spotLightHelper.name = name + "-lhp"
            spotLightHelper.visible = false
            scene.add( spotLightHelper );
        }else{
            scene.getObjectByName(name + "-lhp").visible = true
        }

    setInterval(updateLightProperties, 17, lights, name)

}

async function updateLightProperties(lights, name){
    if (document.getElementById('settings-box').hasChildNodes){
        const container = document.getElementById('settings-box')
        if(document.getElementById(name)){
            
                const lightName = document.getElementById(name).innerHTML;
                window.currentName = lightName;

                const angle = document.getElementById('angle').value;
                const pangle = document.getElementById('pangle').value;
                const intensity = document.getElementById('intensity').value;
                const penumbra = document.getElementById('penumbra').value;
                
                const posX = document.getElementById('posX').value;
                const posY = document.getElementById('posY').value;
                const posZ = document.getElementById('posZ').value;

                const rotX = document.getElementById('rotX').value;
                const rotY = document.getElementById('rotY').value;
                const rotZ = document.getElementById('rotZ').value;

                const color = document.getElementById('color').value;
                

            

            if (lights[lightName]){
                
                let helper = scene.getObjectByName(name + "-lhp");

                const light = scene.getObjectByName(lightName);
                light.position.x = posX
                light.position.y = posY
                light.position.z = posZ

                light.target.position.x = rotX //* 3.14/180// scale to deg
                light.target.position.y = rotY //* 3.14/180
                light.target.position.z = rotZ //* 3.14/180

                console.log(light.target.position.x, light.target.position.y, light.target.position.z, document.getElementById("angle").value, Math.log(document.getElementById("angle").value))
                // light.rotation.x = (light.position.y-light.target.position.y)/(light.position.x-light.target.position.x)
                // light.rotation.y = (light.position.x-light.target.position.x)/(light.position.z-light.target.position.z)
                // light.rotation.z = (light.position.z-light.target.position.z)/(light.position.y-light.target.position.y)
 
                light.angle = Math.pow(2, -angle+1)
                angle.get
                light.intensity = intensity
                light.penumbra = penumbra
                
                light.color.r = parseInt(color.substr(1,2), 16) /255 // scale to flt
                light.color.g = parseInt(color.substr(3,2), 16) /255
                light.color.b = parseInt(color.substr(5,2), 16) /255
                if(document.getElementById("helperToggle").checked){
                    helper.update();
                    helper.visible = true
                }else{
                    helper.visible = false
                }
                
            }
        }
    }
    
}


function newLight(name){
    if (name != ''){
        let newLight = {};
        newLight.name = name
        lights[name] = newLight;
        light(name)
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


export { newLight, fullByte}
