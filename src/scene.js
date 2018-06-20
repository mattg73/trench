import { Scene as THREEScene, Color, Mesh, SphereBufferGeometry, MeshStandardMaterial } from 'three';
import Lights from './lights';

import Models from './models';
//import Loader from './loader';
//import DefaultCube from './default-cube';

export default class Scene extends THREEScene {
  constructor(){
    super();
  }

  init(){
    this.background = new Color(0x808080);

    this.lights = new Lights();
    this.lights.init();
    this.add(this.lights.sun);

    //const testGeometry = new SphereBufferGeometry( 1, 32, 16);
    //const testMaterial = new MeshStandardMaterial( { color: 0xff8000, metalness: 0, roughness: 0.2 } );
    //const testMesh = new Mesh( testGeometry, testMaterial );
    //testMesh.position.x = -5
    //this.add(testMesh);

    const models = new Models();
    Loader.loadGLTFScene(models.testCube).then(myscene => {
      this.add(myscene);
    });

    //this.cube = new DefaultCube();
    //this.cube.init(this);
    //this.add(this.cube.container);

    
    
  }

  update(){
    //this.cube.update();
  }
}