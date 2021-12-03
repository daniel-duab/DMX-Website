import { OrbitControls } from "./vendor/three/examples/jsm/controls/OrbitControls.js";

import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  MeshPhongMaterial,
  Mesh,
  PointLight,
  AmbientLight,
} from "./vendor/three/build/three.module.js";

const scene = new Scene();
const camera = new PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.5,
  1000
);

const renderer = new WebGLRenderer();

renderer.setSize((window.innerWidth * 4) / 5, (window.innerWidth * 3) / 5);
renderer.domElement.id = "canvas";
renderer.domElement.className = "render";
document.getElementById("stage").appendChild(renderer.domElement);
const canvas = document.getElementById("canvas");
renderer.setClearColor("gray");

camera.translateY(5);

var box = new BoxGeometry(1, 1, 1);
var mat = new MeshPhongMaterial({ color: "rgb(100, 10, 250)" });
var cube = new Mesh(box, mat);
cube.receiveShadow = true;
cube.castShadow = true;
cube.translateZ(5);

scene.add(cube);

const lighter = new AmbientLight(0x404040);
const otherl = new PointLight({ color: 0xf0f0f0 });
console.log(otherl);
scene.add(otherl);
scene.add(lighter);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.update();

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  cube.rotation.x += 0.01;
  renderer.render(scene, camera);
}
animate();
