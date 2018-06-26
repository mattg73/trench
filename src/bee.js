import { Object3D, Mesh, CubeReflectionMapping, LinearMipMapLinearFilter} from 'three';
import Models from './models';
import Materials from './materials';
import {CubeTextures} from './textures';
import Loader from './loader';

export default class Bee {
  init(){
    this.container = new Object3D();
    this.loaded = false;

    const loadParameters = {
      model: Models.bee,
      material: Materials.gold,
      envMap: CubeTextures.envMapStudio
    }

    Loader.loadMesh(loadParameters).then(assets => {
      const material = assets[1];
      material.envMap = assets[2];
      material.envMap.mapping = CubeReflectionMapping;
      material.envMap.minFilter = LinearMipMapLinearFilter;
      material.envMap.needsUpdate = true;
      
      this.mesh = new Mesh(assets[0], material);
      this.mesh.position.x = 5;
      this.mesh.scale.multiplyScalar(3);
      this.container.add(this.mesh);
      this.loaded = true;
    });
  }

  update(){
    if(this.loaded){
      this.mesh.rotation.x = -1;
      this.mesh.rotation.y += 0.01;
      //this.mesh.rotation.z =1;
    }
  }
}