import { Scene as THREEScene, Color } from 'three';
import Lights from './lights';
import DefaultCube from './default-cube';

export default class Scene extends THREEScene {
  constructor(){
    super();
  }

  init(){
      this.background = new Color(0xa0a0a0);

      this.lights = new Lights();
      this.lights.init();

      this.cube = new DefaultCube();
      this.cube.init();

      this.add(this.lights.sun);
      this.add(this.cube.container);
  }

  update(){
    this.cube.update();
  }
}