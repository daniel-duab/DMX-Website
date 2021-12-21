import { renderer, camera } from "./canvas.mjs"


function switchView(){
    let stage = document.getElementById("stage")
    let sub = document.getElementById("sub-stage")
    let stageItem = stage.childNodes.item(0)
    let subItem = sub.childNodes.item(0)

    stage.appendChild(subItem)
    sub.appendChild(stageItem)

    stage.childNodes.forEach(elem => {
        if (elem === stageItem) stage.removeChild(elem)
    });
    sub.childNodes.forEach(elem => {
        if (elem === subItem) sub.removeChild(elem)
    });

    renderer.domElement.width = renderer.domElement.parentElement.clientWidth
    renderer.domElement.height = renderer.domElement.parentElement.clientHeight

}

export { switchView }