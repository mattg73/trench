import { Object3D, Vector2} from 'three';
import {mainScene} from './scenes';
import Models from './models';
import Materials from './materials';
import {Textures, CubeTextures} from './textures';

export default class CameoRing {
  init(){
    this.container = new Object3D();
   
    this.mesh = (Models.cameoRing.data.scene.children[0]);

    this.mesh.material = Materials.cameoRing;
    this.mesh.material.envMap = CubeTextures.envMapHDR.data;

    this.mesh.material.map = Textures.cameoRingBaseColor.data;
    this.mesh.material.map.flipY = false;
    this.mesh.material.map.anisotropy = 16;

    this.mesh.material.roughnessMap = Textures.cameoRingRoughness.data;
    this.mesh.material.roughnessMap.flipY = false;
    this.mesh.material.roughnessMap.anisotropy = 16;

    this.mesh.material.normalMap = Textures.cameoRingNormal.data;
    this.mesh.material.normalMap.flipY = false;
    this.mesh.material.normalMap.anisotropy = 16;
    this.mesh.material.normalScale = new Vector2(1,1);

    this.mesh.material.metalnessMap = Textures.cameoRingMetallic.data;
    this.mesh.material.metalnessMap.flipY = false;
    this.mesh.material.metalnessMap.anisotropy = 16;

    this.mesh.position.x = -10;
    this.mesh.position.y = -4;
    this.mesh.scale.multiplyScalar(0.6);

    this.container.add(this.mesh);
    mainScene.add(this.container);
  }

  update(){
    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.01;
    this.mesh.rotation.z += 0.002;
  }
}