import { Object3D} from 'three';
import {mainScene} from './scenes';
import Models from './models';
import Materials from './materials';
import {Textures, CubeTextures} from './textures';

export default class SquareRing {
  init(){
    this.container = new Object3D();
   
    this.mesh = (Models.squareRing.data.scene.children[0]);

    this.mesh.material = Materials.squareRing;
    this.mesh.material.envMap = CubeTextures.envMapStudio.data;

    this.mesh.material.map = Textures.squareRingBaseColor.data;
    this.mesh.material.map.flipY = false;
    this.mesh.material.map.anisotropy = 16;

    this.mesh.material.roughnessMap = Textures.squareRingRoughness.data;
    this.mesh.material.roughnessMap.flipY = false;
    this.mesh.material.roughnessMap.anisotropy = 16;

    this.mesh.material.normalMap = Textures.squareRingNormal.data;
    this.mesh.material.normalMap.flipY = false;
    this.mesh.material.normalMap.anisotropy = 16;

    this.mesh.position.y = 4;
    this.mesh.scale.multiplyScalar(1);

    this.container.add(this.mesh);
    mainScene.add(this.container);
  }

  update(){
    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.01;
    this.mesh.rotation.z += 0.002;
  }
}