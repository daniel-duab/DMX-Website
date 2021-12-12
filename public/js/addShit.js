function newPanel(name){
    let newName = true;
    for(check of document.getElementsByClassName("data")){
        if(JSON.stringify(check.innerHTML) == name){
            newName=false;
        }
    }

    if (newName){
        let panelDiv = document.createElement("div")
        panelDiv.setAttribute("class", "light-panel")
        panelDiv.id = name // change this to storing a random uuid type string in a json corresponding with this name
        
        let headerDiv = document.createElement("div")
        headerDiv.setAttribute("class", "panel-header")

        let data = document.createElement("object")
        data.setAttribute("class", "data")
        let dataJSON = {
            "folded":false,
            "name":name
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
        
        let selected = document.createElement("p")
        selected.hidden = false // true if not selcted!
        selected.innerHTML = "(selected)"
        
        let addDiv = document.createElement("div")
        addDiv.setAttribute("class", "add")
        
        let addNameInput = document.createElement("input")
        addNameInput.type = "text"
        addNameInput.placeholder = "add light"
        
        let addButton = document.createElement("button")
        addButton.setAttribute("onclick", "addLight()"); // make this function
        addButton.innerHTML = "+"

        topWordsDiv.appendChild(foldButton)
        topWordsDiv.appendChild(heading1)
        topWordsDiv.appendChild(selected)

        addDiv.appendChild(addNameInput)
        addDiv.appendChild(addButton)

        headerDiv.appendChild(data)
        headerDiv.appendChild(topWordsDiv)
        headerDiv.appendChild(addDiv)

        panelDiv.appendChild(headerDiv)
        console.log(panelDiv)

        return panelDiv;
    }
    
}
function newLight(name){
    let lightDiv = document.createElement('div')

    let headingDiv = document.createElement('div')

    let heading2 = document.createElement('h2')

    let deleteButton = document.createElement('button')

    let addDiv = document.createElement('div')

    let addNameInput = document.createElement('input')

    let addChannelInput = document.createElement('input')
    
    let addButton = document.createElement('button')

    let paramsDiv = document.createElement('div')
}
function newParameter(name, channel, light){

}
function addPanel(name){
    document.getElementById("w").appendChild(newPanel(name));
}
function addLight(name, panel){
    
}
setTimeout(()=>{document.getElementById("w").appendChild(newPanel("jjj"))}, 1000)








