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
    Lights.init();

    this.add(Lights.ambientLight)

    //this.add(this.lights.sun);
    
  }

  update(){
  }
}
export let mainScene = new MainScene();

export let gemBackFacingScene = new Scene();