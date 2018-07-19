import { AmbientLight, DirectionalLight, PointLight, CameraHelper } from 'three';
import {mainScene} from './scenes';

class Lights {
  init(){
    this.ambientLight = new AmbientLight(0xffffff, 0.0)

    this.sun = new DirectionalLight(0xffffff, 1);
    this.sun.position.set( -1 * 50, 1 * 50, 0 );

    this.lazer = new PointLight(0xff2222, 1, 3);
    
    //var helper = new CameraHelper( this.sun.shadow.camera );
    //mainScene.add( helper );

    mainScene.add(this.sun);    
  }
}
export default new Lights();