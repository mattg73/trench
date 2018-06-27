import { Object3D} from 'three';
import {mainScene} from './scenes';
import Models from './models';
import Materials from './materials';
import {CubeTextures} from './textures';

export default class Bee {
  init(){
    this.container = new Object3D();

    this.mesh = (Models.bee.data.scene.children[0]);
    this.mesh.material = Materials.gold;
    this.mesh.material.envMap = CubeTextures.envMapStudio.data;
    this.mesh.position.x = 5;
    this.mesh.scale.multiplyScalar(2);

    this.container.add(this.mesh);
    mainScene.add(this.container);
  }

  update(){
    this.mesh.rotation.x = -1;
    this.mesh.rotation.y += 0.01;
    //this.mesh.rotation.z =1;
  }
}