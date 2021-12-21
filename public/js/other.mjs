import { clickSettingsBox, closeSettings, newBox } from "./boxFoundation.mjs";
import { onPointerMove, onWindowResize, scene } from "./canvas.mjs";
import { newLight } from "./lightFoundation.mjs";
import { switchView } from "./sliderboard.mjs";
import {socket} from './sockets.mjs';
window.newBox = newBox;
window.closeSettings = closeSettings;
window.onPointerMove = onPointerMove
window.onWindowResize = onWindowResize;
window.scene = scene;
window.socket = socket;
window.clickSettingsBox = clickSettingsBox;
window.newLight = newLight;
// window.switchView = switchView
window.deleteIt = function(target){
    closeSettings();
    scene.remove(target)
    scene.remove(scene.getChildByName(target.name + "-lhp"))
}
