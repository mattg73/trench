import { Scene, CubeReflectionMapping, Color } from 'three';
import Lights from './lights';
import {CubeTextures} from './textures';

class MainScene extends Scene {
  constructor(){
    super();
  }

  init(){
    // Environment map
    const envMap = CubeTextures.envMapLDR.data;
    envMap.mapping = CubeReflectionMapping
    //this.background = envMap;
    
    // Lights
    this.lights = new Lights();
    this.lights.init();
    //this.add(this.lights.sun);
    this.add(this.lights.ambientLight)
  }

  update(){
  }
}
export let mainScene = new MainScene();

export class GemBackFacingScene extends Scene {
    constructor(){
        super();
    }

    init(){
    }

    update(){
    }
}
export let gemBackFacingScene = new GemBackFacingScene();