import { PerspectiveCamera } from 'three';

export default class Cameras {
  init(){
    this.mainCamera = new PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 100 );
    this.mainCamera.position.set( 2, 1.65, 5 );
    this.mainCamera.lookAt( 0, 0, 0 );
  }
}