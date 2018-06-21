import { PerspectiveCamera, CubeCamera } from 'three';

export default class Cameras {
  init(){
    this.mainCamera = new PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 100 );
    this.mainCamera.position.set( 0, 1.65, 10 );
    this.mainCamera.lookAt( 0, 0, 0 );

    this.cubeCamera = new CubeCamera(0.1, 1000, 128);
    this.cubeCamera.position.set(0, 0, 0);
  }
}