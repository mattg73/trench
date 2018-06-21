import { Object3D, SphereGeometry, Mesh, CubeReflectionMapping, EquirectangularReflectionMapping, LinearMipMapLinearFilter} from 'three';
import Models from './models';
import Materials from './materials';
import {Textures, CubeTextures} from './textures';
import Loader from './loader';

export default class DefaultCube {
  constructor(){

  }

  init(){
    this.container = new Object3D();
    this.loaded = false;


    Loader.loadMesh(Models.ring, Materials.gold, CubeTextures.envMapStudio).then(assets => {
      const material = assets[1];
      material.envMap = assets[2];
      material.envMap.mapping = CubeReflectionMapping;
      material.envMap.minFilter = LinearMipMapLinearFilter;
      material.envMap.needsUpdate = true;
       
      //const debugGeometry = new SphereGeometry(4, 64, 32);

      this.mesh = new Mesh(assets[0], material);
      //this.mesh = new Mesh(debugGeometry, material);
      this.mesh.position.x = 3;
      this.container.add(this.mesh);
      this.loaded = true;
    });
 
    
  }

  update(){
    if(this.loaded){
      this.mesh.rotation.x += 0.01;
      //this.mesh.rotation.y += 0.01;
      this.mesh.rotation.z += 0.002;
    }
  }
}