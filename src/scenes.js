import { Scene, CubeReflectionMapping, Color } from 'three';
import Renderer from './renderer';
import Lights from './lights';
import Cameras from './cameras';
import {CubeTextures} from './textures';

class MainScene extends Scene {
  constructor(){
    super();
  }

  init(){
    // Environment map
    const envMap = CubeTextures.envMapLDR.data;
    envMap.mapping = CubeReflectionMapping
    this.background = envMap;
    Cameras.cubeCamera.update(Renderer, this);
    this.background = null;

    // Lights
    Lights.init();

    //this.add(Lights.ambientLight)
    //this.add(Lights.sun);
  }

  update(){
    Cameras.update()
  }
}
export let mainScene = new MainScene();

export let gemBackFacingScene = new Scene();