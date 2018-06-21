import { Object3D, Mesh, EquirectangularReflectionMapping, EquirectangularRefractionMapping, LinearMipMapLinearFilter} from 'three';
import Models from './models';
import Materials from './materials';
import {Textures, CubeTextures} from './textures';
import Loader from './loader';

export default class Gem {
  constructor(){

  }

  init(sceneCameras){
    this.container = new Object3D();
    this.loaded = false;

    Loader.loadMesh(Models.gem, Materials.shaderDiamond, CubeTextures.envMapStudio).then(assets => {
      const material = assets[1];
      material.uniforms.tCube = sceneCameras.cubeCamera;

      //material.envMap = assets[2];
      //material.envMap.mapping = EquirectangularRefractionMapping;
      //material.envMap.minFilter = LinearMipMapLinearFilter;
      //material.envMap.needsUpdate = true;
       
      this.mesh = new Mesh(assets[0], material);
      this.mesh.position.x = -3;
      this.mesh.scale.multiplyScalar(3);
      this.container.add(this.mesh);
      this.loaded = true;
    });
  }

  update(){
    if(this.loaded){
      this.mesh.rotation.x -= 0.005;
      this.mesh.rotation.y -= 0.02;
    }
  }
}