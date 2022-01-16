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
  LoadingManager,
  PCFShadowMap,
  PCFSoftShadowMap
} from "./vendor/three/build/three.module.js";
import { fullByte, newBox } from "./boxFoundation.mjs";
import { socket } from "./sockets.mjs";



// creating scene and socket shit
let scene = new Scene();

// renderer setup
const renderer = new WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = PCFShadowMap;
renderer.setPixelRatio( window.devicePixelRatio*4 );
renderer.domElement.id = "canvas";
renderer.domElement.className = "render";
document.getElementById("stage").appendChild(renderer.domElement);
// get canvas element
const canvas = document.getElementById("canvas");

const rendWidth = window.innerWidth * canvas.clientWidth/window.innerWidth
const rendHeight = window.innerHeight * canvas.clientHeight/window.innerHeight

document.getElementById("stage").width = rendWidth
document.getElementById("stage").height = rendHeight

// set renderer background to page background
renderer.setClearColor("gray");
// cam setup
const camera = new PerspectiveCamera(
  60,
  canvas.clientWidth / canvas.clientHeight,
  0.001,
  1000
);
camera.translateY(5);


// adding default ambient lighting (otherwise everything is black)

const lighter = new AmbientLight(0x404040);
scene.add(lighter);

// objmtl loading ??? still not working
/* 
var lm = new LoadingManager()
lm.onStart = function ( url, itemsLoaded, itemsTotal ) {console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );};
lm.onLoad = function ( ) {console.log( 'Loading complete!');};
lm.onProgress = function ( url, itemsLoaded, itemsTotal ) {console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );};
lm.onError = function ( url ) {console.log( 'There was an error loading ' + url );};


lm.addHandler( /\.dds$/i, new DDSLoader() )
 
var mtlLoader = new MTLLoader(lm);
//mtlLoader.setPath("./")
mtlLoader.load('../pac/Pac-Man.mtl', function(materials) {
  materials.preload();
  var objLoader = new OBJLoader(lm);
  objLoader.setMaterials(materials);
  //objLoader.setPath('/');
  objLoader.load('../pac/Pac-Man.obj', function(object) {
    let scale = 0.1;
    object.scale.x = scale
    object.scale.y = scale
    object.scale.z = scale
    scene.add(object);

    console.log("done", scene, object)
  });
});  */

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
  if(document.getElementById("highlight-toggle").checked === true){
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
  }

  // render scene
	renderer.render( scene, camera );
  
}
animate();


// a bunch of suppourt funcs
function onPointerMove( event ) {
	pointer.x = ( (event.clientX- (canvas.parentElement.offsetLeft)) / canvas.clientWidth ) * 2 - 1;
	pointer.y = - ( (event.clientY - (canvas.parentElement.offsetTop)) / canvas.clientHeight ) * 2 + 1;
  console.log(canvas.parentElement.offsetLeft, canvas.parentElement.offsetTop)
}

function onWindowResize() {
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
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
