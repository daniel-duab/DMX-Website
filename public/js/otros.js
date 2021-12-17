
function fold(element, button){
    //let elem = document.getElementById("ee")
    let elementData = JSON.parse(element.getElementsByClassName("data").item(0).innerHTML)
    
    
    if (button.innerHTML == "▶"){
        button.innerHTML = "▼"
    }else{
        button.innerHTML = "▶"
    }
    if(elementData.folded == false){
        elementData.folded = true
        element.getElementsByClassName("data").item(0).innerHTML = JSON.stringify(elementData)
        for(tohide of element.childNodes){
            if (tohide.className == "panel-header"){
                
            }else{
                tohide.hidden=true;
            }
        }
    }else{
        elementData.folded = false;
        element.getElementsByClassName("data").item(0).innerHTML = JSON.stringify(elementData)
        for(tohide of element.childNodes){
            if(tohide.className != "data")
                tohide.hidden = false
        }

    }

}