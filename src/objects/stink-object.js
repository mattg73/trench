import { Object3D} from 'three';
import Timer from '../timer'
import {mainScene} from '../scenes';
import Models from '../models';
import Materials from '../materials';
import {Textures, CubeTextures} from '../textures';

export default class StinkObject {
  constructor(){

  }

  init(){
    this.container = new Object3D();

    this.mesh = (Models.object.data.scene.children[0]);
    this.mesh.material = Materials.object;
    this.mesh.material.envMap = CubeTextures.envMapHDR.data;
    this.mesh.material.envMapIntensity = 1;

    this.mesh.material.map = Textures.objectBaseColor.data;
    this.mesh.material.map.flipY = false;
    this.mesh.material.map.anisotropy = 16;

    this.mesh.material.roughnessMap = Textures.objectRoughness.data;
    this.mesh.material.roughnessMap.flipY = false;
    this.mesh.material.roughnessMap.anisotropy = 16;

    this.mesh.material.normalMap = Textures.objectNormal.data;
    this.mesh.material.normalMap.flipY = false;
    this.mesh.material.normalMap.anisotropy = 16;

    this.mesh.material.metalnessMap = Textures.objectMetallic.data;
    this.mesh.material.metalnessMap.flipY = false;
    this.mesh.material.metalnessMap.anisotropy = 16;


    this.mesh.position.x = 0;
    this.mesh.scale.multiplyScalar(1);

    this.container.add(this.mesh);
    mainScene.add(this.container);
  }

  update(){
    const elapsed = Timer.getElapsedTime();
    const amplitude = Math.PI * 0.1

    this.container.rotation.x = amplitude * 0.5 * Math.sin(elapsed);
    this.container.rotation.y = amplitude * Math.cos(elapsed);
  }

  show(){
    this.mesh.visible = true;
  }

  hide(){
    this.mesh.visible = false;
  }
}