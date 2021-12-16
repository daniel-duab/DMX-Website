//const { param } = require("express/lib/request")

let sb = document.getElementById("settings-box")
let lightboard = {}
socket.on("brandNewLightboard", brandNewLightboard(newLightBoard))
function brandNewLightboard(newLightboard){
    lightboard = newLightboard
    for(board of lightboard){
        sb.appendChild(newBoardHead(board.name))
        for(panel of board.panels){
            let curPanel = newPanel(panel.name)
            for(light of panel.lights){
                let curLight = newLight(light.name, light.value)
                for(param in paarameters){
                    curLight.getElementsByClassName("params").item(0).appendChild(newParameter(param.name, param.channel, param.value))
                }
                curPanel.appendChild(curLight)
            }
            sb.appendChild(curPanel)
        }

    }
    
}

function newBoardHead(name){
    let settingHeadDiv = document.createElement("div")
    settingHeadDiv.setAttribute("class", "settings-header")
    
    let heading3 = document.createElement("h3")
    heading3.innerHTML = name
    
    let addDiv = document.createElement("div")
    addDiv.setAttributeI("class", "add")

    let addNameInput = document.createElement('input')
    addNameInput.placeholder = "add param"
    addNameInput.type = "text"
    addNameInput.setAttribute("class", "name")
    
    let addButton = document.createElement('button')
    addButton.innerHTML = "+"
    addButton.setAttribute("onclick", "addPanel(this.parentElement.getElementsByClassName('name').item(0).value, this.parentElement.getElementsByClassName('error').item(0))")
    
    let addError = document.createElement('p')
    addError.setAttribute("onclick", "this.hidden = true")
    addError.setAttribute("class", "error")
    addError.innerHTML = "error"
    addError.hidden = true


    addDiv.appendChild(addNameInput)
    addDiv.appendChild(addButton)
    addDiv.appendChild(addError)

    settingHeadDiv.appendChild(heading3)
    settingHeadDiv.appendChild(addDiv)

    return settingHeadDiv
}
function newPanel(name){

    let panelDiv = document.createElement("div")
    panelDiv.setAttribute("class", "light-panel")
    panelDiv.id = name // change this to storing a random uuid type string in a json corresponding with this name
    
    let headerDiv = document.createElement("div")
    headerDiv.setAttribute("class", "panel-header")

    let data = document.createElement("object")
    data.setAttribute("class", "data")
    let dataJSON = {
        "folded":false,
        "name":name,
        "type":"panel"
    }// shoud probably add an id thing thats the hashed name or smth
    data.innerHTML = JSON.stringify(dataJSON);
    data.hidden = true

    let topWordsDiv = document.createElement("div")
    topWordsDiv.setAttribute("class", "panel-top-words")
    
    let foldButton = document.createElement("button")
    foldButton.setAttribute("onclick", "fold(this.parentElement.parentElement.parentElement, this)"); // folding fucntion
    foldButton.innerHTML = "▼";
    
    let heading1 = document.createElement("h1")
    heading1.innerHTML = name;
    
    let deleteButton = document.createElement("button")
    deleteButton.innerHTML = "-"
    deleteButton.setAttribute("class", "panel-delete")
    deleteButton.setAttribute("onclick", "deleteElement(this)")

    let selected = document.createElement("p")
    selected.hidden = false // true if not selcted!
    selected.innerHTML = "(selected)"
    
    let addDiv = document.createElement("div")
    addDiv.setAttribute("class", "add")
    
    let addNameInput = document.createElement("input")
    addNameInput.type = "text"
    addNameInput.placeholder = "add light"
    addNameInput.setAttribute("class", "name")
    
    let addButton = document.createElement("button")
    addButton.setAttribute("onclick", "addLight(this.parentElement.getElementsByClassName('name').item(0).value, 0, this.parentElement.parentElement.parentElement.getElementsByClassName('lights').item(0), this.parentElement.getElementsByClassName('error').item(0))"); // make this function
    addButton.innerHTML = "+"

    let addError = document.createElement("p")
    addError.setAttribute("onclick", "this.hidden = true"); // make this function
    addError.setAttribute("class", "error")
    addError.innerHTML = "error"
    addError.hidden = true

    let lightsDiv = document.createElement("div")
    lightsDiv.setAttribute("class", "lights")

    topWordsDiv.appendChild(foldButton)
    topWordsDiv.appendChild(heading1)
    topWordsDiv.appendChild(selected)
    topWordsDiv.appendChild(deleteButton)

    addDiv.appendChild(addNameInput)
    addDiv.appendChild(addButton)
    addDiv.appendChild(addError)

    headerDiv.appendChild(data)
    headerDiv.appendChild(topWordsDiv)
    headerDiv.appendChild(addDiv)

    panelDiv.appendChild(headerDiv)

    panelDiv.appendChild(lightsDiv)

    console.log(panelDiv)

    return panelDiv;
    
    
}
function newLight(name, value){
    
    let lightDiv = document.createElement('div')
    lightDiv.setAttribute("class", "light-file")
    
    let data = document.createElement("object")
    data.setAttribute("class", "data")
    let dataJSON = {
        "name":name,
        "type":"light",
        "value":value
    }// shoud probably add an id thing thats the hashed name or smth
    data.innerHTML = JSON.stringify(dataJSON);
    data.hidden = true
    
    let headingDiv = document.createElement('div')
    headingDiv.setAttribute("class", "light-heading")
    
    let heading2 = document.createElement('h2')
    heading2.innerHTML = name;
    
    let deleteButton = document.createElement('button')
    deleteButton.innerHTML = "-"
    deleteButton.setAttribute("class", "light-delete")
    deleteButton.setAttribute("onclick", "deleteElement(this)")
    
    let addDiv = document.createElement('div')
    addDiv.setAttribute("class", "add")
    
    let addNameInput = document.createElement('input')
    addNameInput.placeholder = "add param"
    addNameInput.type = "text"
    addNameInput.setAttribute("class", "name")
    
    let addChannelInput = document.createElement('input')
    addChannelInput.placeholder = "ch"
    addChannelInput.type = "text"
    addChannelInput.style = "width: 20%;" // couldnt figure out how to style external
    addChannelInput.setAttribute("class", "channel")
    
    let addButton = document.createElement('button')
    addButton.innerHTML = "+"
    addButton.setAttribute("onclick", "addParameter(this.parentElement.getElementsByClassName('name').item(0).value, this.parentElement.getElementsByClassName('channel').item(0).value, 0, this.parentElement.parentElement.getElementsByClassName('params').item(0), this.parentElement.getElementsByClassName('error').item(0))")
    
    let addError = document.createElement('p')
    addError.setAttribute("onclick", "this.hidden = true")
    addError.setAttribute("class", "error")
    addError.innerHTML = "error"
    addError.hidden = true
    
    let paramsDiv = document.createElement('div')
    paramsDiv.setAttribute("class", "params")


    headingDiv.appendChild(heading2)
    headingDiv.appendChild(deleteButton)

    addDiv.appendChild(addNameInput)
    addDiv.appendChild(addChannelInput)
    addDiv.appendChild(addButton)
    addDiv.appendChild(addError)

    lightDiv.appendChild(data)
    lightDiv.appendChild(headingDiv)
    lightDiv.appendChild(addDiv)
    lightDiv.appendChild(paramsDiv)

    return lightDiv

}
function newParameter(name, channel, value){
    let paramDiv = document.createElement("div")
    paramDiv.setAttribute("class", "param")

    let data = document.createElement("object")
    data.setAttribute("class", "data")
    let dataJSON = {
        "name":name,
        "channel":channel,
        "value":null,
        "type":"parameter"
    }// shoud probably add an id thing thats the hashed name or smth
    data.innerHTML = JSON.stringify(dataJSON);
    data.hidden = true

    let paramSliderDiv = document.createElement('div')
    paramSliderDiv.setAttribute("class", "param-slider-div")
    
    let paramName = document.createElement("p")
    paramName.innerHTML = name + ":"

    let deleteButton = document.createElement("button")
    deleteButton.innerHTML = "-"
    deleteButton.setAttribute("class", "param-delete")
    deleteButton.setAttribute("onclick", "deleteElement(this)")

    let slider = document.createElement("input")
    slider.setAttribute("class", "light-file-setting")
    slider.type = "range"
    slider.max = "255"
    slider.min = "0"
    slider.value = value

    paramSliderDiv.appendChild(paramName)
    paramSliderDiv.appendChild(deleteButton)
    paramSliderDiv.appendChild(slider)

    paramDiv.appendChild(data)
    paramDiv.appendChild(paramSliderDiv)

    return paramDiv

}
function addPanel(name, err){
    let newName = true;
    for(check of document.getElementsByClassName("data")){
        if(JSON.parse(check.innerHTML).name == name && JSON.parse(check.innerHTML).type == "panel"){
            newName=false;
        }
        
    }
    if(newName){
        sb.appendChild(newPanel(name));
    }else{
        err.hidden = false
    }
    
}
function addLight(name, value, panel, err){
    let newName = true;
    for(check of document.getElementsByClassName("data")){
        if(JSON.parse(check.innerHTML).name == name && JSON.parse(check.innerHTML).type == "light"){
            newName=false;
        }
    }
    if(newName){
        panel.appendChild(newLight(name, value))
    }else{
        err.hidden = false
    }
}
function addParameter(name, channel, value, light, err){
    let newName = true;
    for(check of document.getElementsByClassName("data")){
        if(JSON.parse(check.innerHTML).name == name && JSON.parse(check.innerHTML).type == "parameter"){
            newName=false;
            
        }
    }

    let channelValid = false;
    if(parseInt(channel) && parseInt(channel) < 255 && parseInt(channel) > 0){
        channelValid = true
    }
    if(newName && channelValid){
        light.appendChild(newParameter(name, channel, value))
    }else{
        err.hidden = false
    }
}
function deleteElement(button){
    if (button.className == "param-delete"){
        confirmer("u sure?")
        let listen = document.addEventListener("confirmed", ()=>{
            console.log("removed")
            button.parentElement.parentElement.remove();
            document.removeEventListener("confirmer", listen)
        })
    }else
    if (button.className == "light-delete"){
        confirmer("u sure?")
        let listen = document.addEventListener("confirmed", ()=>{
            console.log("removed")
            button.parentElement.parentElement.remove();
            document.removeEventListener("confirmer", listen)
        })
    }else
    if (button.className == "panel-delete"){
        confirmer("u sure?")
        let listen = document.addEventListener("confirmed", ()=>{
            console.log("removed")
            button.parentElement.parentElement.parentElement.remove();
            document.removeEventListener("confirmer", listen)
        })
    }

        

    
}
function confirmer(string){
    let conf = document.getElementById("confirmer")
    conf.getElementsByClassName("confirm-option").item(0).innerHTML=string;
    conf.hidden = false;
}
//setTimeout(()=>{document.getElementById("settings-box").appendChild(newPanel("jjj"))}, 1000)








