import { Scene, CubeReflectionMapping, SphereBufferGeometry, MeshStandardMaterial, Mesh } from 'three';
import Loader from './loader';
import Lights from './lights';
import DefaultCube from './default-cube';
import Gem from './gem';
import {CubeTextures} from './textures';

export class MainScene extends Scene {
  constructor(){
    super();
  }

  init(sceneCameras){

    Loader.loadCubeTexture(CubeTextures.envMapStudio).then(asset => {
      const envMap = asset;
      envMap.mapping = CubeReflectionMapping
      //this.background = asset;
    });

    this.lights = new Lights();
    this.lights.init();
    //this.add(this.lights.sun);



    this.cube = new DefaultCube();
    this.cube.init();
    this.add(this.cube.container);

    //this.gem = new Gem();
    //this.gem.init(sceneCameras);
    //this.add(this.gem.container);
  }

  update(){
    this.cube.update();
    //this.gem.update();
  }
}

export class GemBackFacingScene extends Scene {
    constructor(){
        super();
    }

    init(sceneCameras){
        this.gem = new Gem(-1);
        this.gem.init(sceneCameras);
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

    init(sceneCameras){
        this.gem = new Gem(1);
        this.gem.init(sceneCameras);
        this.add(this.gem.container);
    }

    update(){
        this.gem.update();
    }
}