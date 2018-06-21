import { Scene as THREEScene, CubeReflectionMapping, Color, Mesh, SphereBufferGeometry, MeshStandardMaterial } from 'three';
import Loader from './loader';
import Lights from './lights';
import DefaultCube from './default-cube';
import Gem from './gem';
import {CubeTextures} from './textures';

export default class Scene extends THREEScene {
  constructor(){
    super();
  }

  init(sceneCameras){

    Loader.loadCubeTexture(CubeTextures.envMapStudio).then(asset => {
      console.log(asset)
      const envMap = asset;
      envMap.mapping = CubeReflectionMapping
      this.background = asset;
    });

    this.lights = new Lights();
    this.lights.init();
    //this.add(this.lights.sun);

    //const testGeometry = new SphereBufferGeometry( 1, 32, 16);
    //const testMaterial = new MeshStandardMaterial( { color: 0xff8000, metalness: 0, roughness: 0.2 } );
    //const testMesh = new Mesh( testGeometry, testMaterial );
    //testMesh.position.x = -5
    //this.add(testMesh);

    //const models = new Models();
    //Loader.loadGLTFScene(models.testCube).then(myscene => {
    //  this.add(myscene);
    //});

    this.cube = new DefaultCube();
    this.cube.init();
    this.add(this.cube.container);

    this.gem = new Gem();
    this.gem.init(sceneCameras);
    this.add(this.gem.container);
  }

  update(){
    this.cube.update();
    this.gem.update();
  }
}