import { OrbitControls } from "./vendor/three/examples/jsm/controls/OrbitControls.js";
import { OBJLoader } from "./vendor/three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "./vendor/three/examples/jsm/loaders/MTLLoader.js";
import { DDSLoader } from "./vendor/three/examples/jsm/loaders/DDSLoader.js";




import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  MeshPhongMaterial,
  Mesh,
  PointLight,
  AmbientLight,
  Raycaster,
  Vector2,
  MathUtils,
  ObjectLoader,
  JSONLoader,
  TextureLoader,
  SpotLightHelper,
  LoadingManager
} from "./vendor/three/build/three.module.js";
import { fullByte, newBox } from "./boxFoundation.mjs";
import { socket } from "./sockets.mjs";



// creating scene and socket shit
let scene = new Scene();
// socket.emit('scene-get')
// socket.on('scene-update', (update) => {
//   console.log('upDEE')
  
//   let newScene = new ObjectLoader().parse( JSON.parse(update) )
//   console.log(newScene, "\n up to date")
//   console.log(newScene.children.length)
//   for(let i = 0; i<newScene.children; i++){
    
//     for(let e = 0; e<scene.children; e++){
//       console.log(scene.children[e].name)
//       if(scene.children[e].name == newScene.chilren[i]){
//         console.log('name', scene.children[e].name)
//         scene.children[e] = new ObjectLoader().parse( JSON.parse(newScene.children[i]))
        
//         if(scene.children[e].name == window.currentName){
//           updateDOM(scene.children[e])
//         }
//       }
      
//     }
    

//   }
// })
// socket.on('scene-add', (update)=>{
//   let newScene = new ObjectLoader().parse( update )
//   for(let i = 0; i<newScene.children; i++){
//     scene.add(new ObjectLoader().parse( JSON.parse(newScene.children[i])));
    
//   }
  
// })
// socket.on('scene-return', (returnedScene)=>{
//   scene = new ObjectLoader().parse( returnedScene );
//   console.log(returnedScene)
// })
// let recievedScene;
// socket.on('fuck! an error happened!', ()=>{console.log('err')})
// socket.on('request-full-scene', ()=>{sceneSend(scene); console.log('full')})
// function sceneSend(scene){
//     socket.emit("full-scene", scene)
// }
 

// cam setup
const camera = new PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.001,
  1000
);

// renderer setup
const renderer = new WebGLRenderer();
renderer.setPixelRatio( window.devicePixelRatio );
const rendWidth = (window.innerWidth * 4) / 5
const rendHeight = (window.innerHeight * 3) / 5
document.getElementById("stage").width = rendWidth
document.getElementById("stage").height = rendHeight
renderer.domElement.id = "canvas";
renderer.domElement.className = "render";
document.getElementById("stage").appendChild(renderer.domElement);
// get canvas element
const canvas = document.getElementById("canvas");
// set renderer background to page background
renderer.setClearColor("gray");
// moving camera a bit
camera.translateY(5);


//adding starter cube
/*
var box = new BoxGeometry(1, 1, 1);
var mat = new MeshPhongMaterial({ color: "rgb(100, 10, 250)" });
var cube = new Mesh(box, mat);
cube.name = "Starter"
cube.receiveShadow = true;
cube.castShadow = true;
cube.translateZ(5);
scene.add(cube);
*/
// adding default lighting for dev

const lighter = new AmbientLight(0x404040);
scene.add(lighter);

var onProgress = function ( xhr ) {
  if ( xhr.lengthComputable ) {
    var percentComplete = xhr.loaded / xhr.total * 100;
    console.log( Math.round(percentComplete, 2) + '% downloaded' );
  }
};

var onError = function ( xhr ) { };

var lm = new LoadingManager()
lm.onStart = function ( url, itemsLoaded, itemsTotal ) {console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );};
lm.onLoad = function ( ) {console.log( 'Loading complete!');};
lm.onProgress = function ( url, itemsLoaded, itemsTotal ) {console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );};
lm.onError = function ( url ) {console.log( 'There was an error loading ' + url );};


lm.addHandler( /\.dds$/i, new DDSLoader() )

var mtlLoader = new MTLLoader(lm);
//mtlLoader.setPath('/');
mtlLoader.load('/Pac-Man.mtl', function(materials) {
  materials.preload();
  var objLoader = new OBJLoader(lm);
  objLoader.setMaterials(materials);
  //objLoader.setPath('/');
  objLoader.load('/Pac-Man.obj', function(object) {
    let scale = 0.1;
    object.scale.x = scale
    object.scale.y = scale
    object.scale.z = scale
    scene.add(object);

    console.log("done", scene, object)
  });
});

// controls for beaing able to look around
const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.update();
//raycasting
const raycaster = new Raycaster();
const pointer = new Vector2();


//for raycasting
let INTERSECTED;
canvas.addEventListener("mousedown", onClick, false)
canvas.addEventListener("mousemove", onPointerMove, false)
canvas.addEventListener("resize", onWindowResize, false)

function animate() {
  requestAnimationFrame(animate);
  // update controls and spin starter cube
  controls.update();
  
  // update camera matrix, id ontknow if necessary
  camera.updateMatrixWorld();

  // raycasting logic and highlighting
  raycaster.setFromCamera( pointer, camera );
  const intersects = raycaster.intersectObjects( scene.children, false );

  if ( intersects.length > 0 ) {
    if ( INTERSECTED != intersects[ 0 ].object ) {
      if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
        INTERSECTED = intersects[ 0 ].object;
        INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
        INTERSECTED.material.emissive.setHex( 0x555555 );
    }
  } else {
    if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( 0x000000 );
    INTERSECTED = null;
  }

  // render scene
	renderer.render( scene, camera );
  
}
animate();


// a bunch of suppourt funcs
function onPointerMove( event ) {
	pointer.x = ( (event.clientX- canvas.offsetLeft) / rendWidth ) * 2 - 1;
	pointer.y = - ( (event.clientY - canvas.offsetTop) / rendHeight ) * 2 + 1;
  //console.log(event.clientX, event.clientY)
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( rendWidth, rendHeight );
}

function onClick(event){
  if(event.button === 0 && INTERSECTED){
    newBox(INTERSECTED.name)
  }
}

function updateDOM(newChild){
  document.getElementById('dimX').value = newChild.scale.x;
  document.getElementById('dimY').value = newChild.scale.y;
  document.getElementById('dimZ').value = newChild.scale.z;
  
  document.getElementById('posX').value = newChild.position.x;
  document.getElementById('posY').value = newChild.position.y;
  document.getElementById('posZ').value = newChild.position.z;

  document.getElementById('rotX').value = newChild.rotation.x;
  document.getElementById('rotY').value = newChild.rotation.y;
  document.getElementById('rotZ').value = newChild.rotation.z;

  document.getElementById('color').value = "#" + fullByte((Math.floor(elem.material.color.r * 255)).toString(16)) + fullByte((Math.floor(elem.material.color.g* 255)).toString(16)) + fullByte((Math.floor(elem.material.color.b* 255)).toString(16));

}

export {scene, camera, renderer, controls, canvas, onWindowResize, onPointerMove}
