
let i = {}
let e = {
    "test":{
        "that":{
            "thatThing":"TROLLED"
        }
    }
}

let anID = "test:that:thatThing:" // format of id !!! REQUIRES COLON AT END FOR PARSE !!!

function parseID(id, json){
    let val = json
    let curId = ""
    for(let c of id){
        let next = false
        if (c == ":"){
            next = true
        }
        if (next){
            val = val[curId]
            curId = ""
        }else{
            curId += c
        }
    }
    return val;
}

console.log(parseID(anID, e))







