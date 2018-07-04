import { PerspectiveCamera, CubeCamera } from 'three';

class Cameras {
  init(){
    this.mainCamera = new PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 0.1, 100 );
    this.mainCamera.position.set( 0, 1.65, -28 );
    this.mainCamera.lookAt( 0, 0, 0 );
    
    this.cubeCamera = new CubeCamera(0.1, 1000, 256);
    this.cubeCamera.position.set(0, 0, 0);
  }
};
export default new Cameras();