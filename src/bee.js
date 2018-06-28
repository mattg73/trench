import { Object3D, Vector2} from 'three';
import {mainScene} from './scenes';
import Models from './models';
import Materials from './materials';
import {Textures, CubeTextures} from './textures';

export default class Bee {
  init(){
    this.container = new Object3D();

    this.mesh = (Models.bee.data.scene.children[0]);
    this.mesh.material = Materials.bee;
    this.mesh.material.envMap = CubeTextures.envMapHDR.data;
    this.mesh.material.envMapIntensity = 1;

    this.mesh.material.map = Textures.beeBaseColor.data;
    this.mesh.material.map.flipY = false;
    this.mesh.material.map.anisotropy = 16;

    this.mesh.material.roughnessMap = Textures.beeRoughness.data;
    this.mesh.material.roughnessMap.flipY = false;
    this.mesh.material.roughnessMap.anisotropy = 16;

    this.mesh.material.normalMap = Textures.beeNormal.data;
    this.mesh.material.normalMap.flipY = false;
    this.mesh.material.normalMap.anisotropy = 16;
    this.mesh.material.normalScale = new Vector2(1,1);

    this.mesh.material.metalnessMap = Textures.beeMetallic.data;
    this.mesh.material.metalnessMap.flipY = false;
    this.mesh.material.metalnessMap.anisotropy = 16;

    this.mesh.position.x = 5;
    this.mesh.scale.multiplyScalar(4);

    this.container.add(this.mesh);
    mainScene.add(this.container);
  }

  update(){
    this.mesh.rotation.x = -1;
    this.mesh.rotation.y += 0.01;
    //this.mesh.rotation.z =1;
  }
}