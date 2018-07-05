import { Object3D} from 'three';
import {mainScene} from '../scenes';
import Models from '../models';
import Materials from '../materials';
import {Textures, CubeTextures} from '../textures';

export default class CelticRing {
  init(){
    this.container = new Object3D();
   
    this.mesh = (Models.DRingBand.data.scene.children[0]);

    this.mesh.material = Materials.celticRing;
    this.mesh.material.envMap = CubeTextures.envMapHDR.data;

    this.mesh.material.map = Textures.celticRingBaseColor.data;
    this.mesh.material.map.flipY = false;
    this.mesh.material.map.anisotropy = 16;

    this.mesh.material.roughnessMap = Textures.celticRingRoughness.data;
    this.mesh.material.roughnessMap.flipY = false;
    this.mesh.material.roughnessMap.anisotropy = 16;

    this.mesh.material.normalMap = Textures.celticRingNormal.data;
    this.mesh.material.normalMap.flipY = false;
    this.mesh.material.normalMap.anisotropy = 16;

    this.mesh.material.metalnessMap = Textures.celticRingMetallic.data;
    this.mesh.material.metalnessMap.flipY = false;
    this.mesh.material.metalnessMap.anisotropy = 16;

    this.mesh.position.x = -10;
    this.mesh.position.y = 0;
    this.mesh.rotation.y = -0.8 + Math.PI*-0.5;
    this.mesh.rotation.z = Math.PI*-0.5;
    this.mesh.scale.multiplyScalar(0.6);

    this.hide();
    this.container.add(this.mesh);
    mainScene.add(this.container);
  }

  update(){
    this.mesh.rotation.y += 0.01;
  }

  show(){
    this.mesh.visible = true;
  }
  
  hide(){
    this.mesh.visible = false;
  }
}