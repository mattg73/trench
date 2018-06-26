import { Object3D, Mesh, CubeReflectionMapping, LinearMipMapLinearFilter} from 'three';
import Models from './models';
import Materials from './materials';
import {CubeTextures} from './textures';
import Loader from './loader';

export default class Ring {
  init(){
    this.container = new Object3D();
    this.loaded = false;

    const loadParameters = {
      model: Models.ring,
      material: Materials.copper,
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
      this.mesh.position.y = 4;
      this.mesh.scale.multiplyScalar(0.8);
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