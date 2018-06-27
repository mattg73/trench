import { Scene, CubeReflectionMapping, Color } from 'three';
import Loader from './loader';
import Lights from './lights';
import Bee from './bee';
import Ring from './ring';
import Gem from './gem';
import SquareRing from './squareRing';
import GemRing from './gemRing';
import {CubeTextures} from './textures';

class MainScene extends Scene {
  constructor(){
    super();
  }

  init(){
    // Environment map
    const envMap = CubeTextures.envMapStudio.data;
    envMap.mapping = CubeReflectionMapping
    //this.background = envMap;
    this.background = new Color('rgb(30,30,30)');
    
    
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