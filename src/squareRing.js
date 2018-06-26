import { Object3D, Mesh, CubeReflectionMapping, LinearMipMapLinearFilter} from 'three';
import Models from './models';
import Materials from './materials';
import {Textures, CubeTextures} from './textures';
import Loader from './loader';

export default class SquareRing {
  init(){
    this.container = new Object3D();
    this.loaded = false;

    const loadParameters = {
      model: Models.squareRing,
      material: Materials.squareRing,
      envMap: CubeTextures.envMapStudio,
      map: Textures.squareRingBaseColor,
      roughnessMap: Textures.squareRingRoughness,
      normalMap: Textures.squareRingNormal
    }

    Loader.loadMesh(loadParameters).then(assets => {
      const material = assets[1];
      material.envMap = assets[2];
      material.envMap.mapping = CubeReflectionMapping;
      material.envMap.minFilter = LinearMipMapLinearFilter;
      material.envMap.needsUpdate = true;

      material.normalScale.x = 0;
      material.map = assets[3];
      material.map.flipY = false;
      material.map.anisotropy = 16;

      material.roughnessMap = assets[4];
      material.roughnessMap.flipY = false;
      material.roughnessMap.anisotropy = 16;

      material.normalMap = assets[5];
      material.normalMap.flipY = false;
      material.normalMap.anisotropy = 16;

      this.mesh = new Mesh(assets[0], material);
      this.mesh.position.x = 0;
      this.mesh.scale.multiplyScalar(1.5);
      this.container.add(this.mesh);
      this.loaded = true;
    });
  }

  update(){
    if(this.loaded){
      this.mesh.rotation.x += 0.01;
      this.mesh.rotation.y += 0.01;
      this.mesh.rotation.z += 0.002;
    }
  }
}