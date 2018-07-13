import { Object3D} from 'three';
import Debug from '../debug';
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

    this.amplitude = (Math.PI * 0.1);
    this.frequency = 1;

    Debug.object.add(this, 'amplitude', 0, Math.PI * 0.3)
    Debug.object.add(this, 'frequency', 0.5, 3)
  }

  update(){
    const elapsed = Timer.getElapsedTime();
    
    this.container.rotation.x = this.amplitude * 0.5 * Math.sin(elapsed * this.frequency);
    this.container.rotation.y = this.amplitude * Math.cos(elapsed * this.frequency);
  }

  show(){
    this.mesh.visible = true;
  }

  hide(){
    this.mesh.visible = false;
  }
}