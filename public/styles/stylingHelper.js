
document.addEventListener("keyup", (a)=>{
for(let d of document.getElementsByClassName("board-elem")){
    for(e of d.children){

    if(e.type = "range"){
        e.clientWidth = d.clientHeight
    }
    }
}
console.log("updated slide pos")
})