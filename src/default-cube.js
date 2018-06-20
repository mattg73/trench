import { Object3D, Scene } from 'three';
import Models from './models';
import Materials from './materials';
import Loader from './loader';

export default class DefaultCube {
  constructor(){

  }

  init(tempScene){
    console.log(tempScene)
    //this.container = new Object3D();
    this.loaded = false;

    const models = new Models();
    const materials = new Materials();

    Loader.loadGLTFScene(models.testCube).then(myscene => {
      
      
      tempScene.add(myscene);
      //resolve(myscene);
    });

    //this.container.add(Loader.loadGLTFScene(models.testCube));

    /*
    return new Promise((resolve) => {
      
      Loader.loadGLTFScene(models.testCube).then(myscene => {
        resolve(myscene);
      });
      
      
      loader.loadMesh(models.testCube, materials.gold).then(mesh => {
        this.mesh = mesh;
        this.container.add(this.mesh);
        this.loaded = true;
        resolve(this.container);
      });
      

    });
    */
  }

  update(){
    /*
    if(this.loaded){
      this.mesh.rotation.x += 0.01;
      this.mesh.rotation.y += 0.011;
    }
    */
  }
}