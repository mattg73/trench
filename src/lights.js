import { AmbientLight, DirectionalLight, CameraHelper } from 'three';
import {mainScene} from './scenes';

class Lights {
  init(){
    //this.ambientLight = new AmbientLight(0xffffff, 0.5)

    this.sun = new DirectionalLight(0xffffff, 1);
    this.sun.position.set( -1 * 40, 0.6 * 50, 0 );
    this.sun.castShadow = true;
    this.sun.shadow.mapSize.width = 2048;  // default
    this.sun.shadow.mapSize.height = 1024; // default
    this.sun.shadow.camera.near = 1;    // default
    this.sun.shadow.camera.far = 60;     // default
    this.sun.shadow.camera.left = -100;
    this.sun.shadow.camera.right = 0;
    this.sun.shadow.camera.top = 20;
    this.sun.shadow.camera.bottom = -20;


    var helper = new CameraHelper( this.sun.shadow.camera );
    mainScene.add( helper );

    mainScene.add(this.sun);    
  }
}
export default new Lights();