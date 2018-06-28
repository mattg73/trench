import { AmbientLight, DirectionalLight } from 'three';

export default class Lights {
  init(){
    this.ambientLight = new AmbientLight(0xffffff, 0.0)

    this.sun = new DirectionalLight(0xffffff, 1);
    this.sun.position.set( 10, 5, 2 );
  }
}