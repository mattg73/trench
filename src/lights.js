import { DirectionalLight } from 'three';

export default class Lights {
  init(){
    this.sun = new DirectionalLight(0xffffff, 10);
    this.sun.position.set( 10, 5, 2 );
  }
}