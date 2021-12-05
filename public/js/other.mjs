import { clickSettingsBox, closeSettings, newBox } from "./boxFoundation.mjs";
import { onPointerMove, onWindowResize, scene } from "./canvas.mjs";
import {socket} from './sockets.mjs';
window.newBox = newBox;
window.closeSettings = closeSettings;
window.onPointerMove = onPointerMove
window.onWindowResize = onWindowResize;
window.scene = scene;
window.socket = socket;
window.clickSettingsBox = clickSettingsBox;
