import { Scene, CubeReflectionMapping, SphereBufferGeometry, MeshStandardMaterial, Mesh } from 'three';
import Loader from './loader';
import Lights from './lights';
import Bee from './bee';
import Ring from './ring';
import Gem from './gem';
import SquareRing from './squareRing';
import GemRing from './gemRing';
import {CubeTextures} from './textures';

export class MainScene extends Scene {
  constructor(){
    super();
  }

  init(){

    // Environment map
    const envMap = CubeTextures.envMapStudio.data;
    envMap.mapping = CubeReflectionMapping
    this.background = envMap;

    // Lights
    this.lights = new Lights();
    this.lights.init();
    //this.add(this.lights.sun);
    this.add(this.lights.ambientLight)


    // Objects
    this.bee = new Bee();
    this.bee.init();
    this.add(this.bee.container);

    this.ring = new Ring();
    this.ring.init();
    this.add(this.ring.container);
    
    this.squareRing = new SquareRing();
    this.squareRing.init();
    this.add(this.squareRing.container);

    this.gemRing = new GemRing();
    this.gemRing.init();
    this.add(this.gemRing.container);
  }

  update(){
    this.bee.update();
    this.ring.update();
    this.squareRing.update();
    this.gemRing.update();
  }
}

export class GemBackFacingScene extends Scene {
    constructor(){
        super();
    }

    init(){
        this.gem = new Gem(-1);
        this.gem.init();
        this.add(this.gem.container);
    }

    update(){
        this.gem.update();
    }
}

export class GemFrontFacingScene extends Scene {
    constructor(){
        super();
    }

    init(){
        this.gem = new Gem(1);
        this.gem.init();
        this.add(this.gem.container);
    }

    update(){
        this.gem.update();
    }
}