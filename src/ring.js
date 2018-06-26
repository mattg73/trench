import { Object3D} from 'three';
import Models from './models';
import Materials from './materials';
import {CubeTextures} from './textures';

export default class Ring {
  init(){
    this.container = new Object3D();

    this.mesh = (Models.ring.data.scene.children[0]);
    this.mesh.material = Materials.copper;
    this.mesh.material.envMap = CubeTextures.envMapStudio.data;
    this.mesh.position.x = 5;
    this.mesh.position.y = 4;
    this.mesh.scale.multiplyScalar(0.8);

    this.container.add(this.mesh);
  }

  update(){
    this.mesh.rotation.x += 0.01;
    //this.mesh.rotation.y += 0.01;
    this.mesh.rotation.z += 0.002;
  }
}