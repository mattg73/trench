import { Object3D, SphereBufferGeometry, Mesh} from 'three';
import {mainScene} from './scenes';
import Models from './models';
import Materials from './materials';
import {Textures, CubeTextures} from './textures';

export default class DefaultSphere {
  constructor(){

  }

  init(){
    this.container = new Object3D();

    const geometry = new SphereBufferGeometry(0.5,32,32);

    this.mesh = new Mesh(geometry, Materials.copperTexture);
    this.mesh.material.envMap = CubeTextures.envMapHDR.data;
    this.mesh.material.envMapIntensity = 1;

    this.mesh.material.map = Textures.copperBaseColor.data;
    this.mesh.material.map.flipY = false;
    this.mesh.material.map.anisotropy = 16;

    this.mesh.material.roughnessMap = Textures.copperRoughness.data;
    this.mesh.material.roughnessMap.flipY = false;
    this.mesh.material.roughnessMap.anisotropy = 16;

    this.mesh.material.normalMap = Textures.copperNormal.data;
    this.mesh.material.normalMap.flipY = false;
    this.mesh.material.normalMap.anisotropy = 16;

    this.mesh.position.x = -5;
    this.mesh.position.y = 4;
    this.mesh.scale.multiplyScalar(3);

    this.container.add(this.mesh);
    mainScene.add(this.container);
  }

  update(){
    this.mesh.rotation.x += 0.01;
    //this.mesh.rotation.y += 0.01;
    this.mesh.rotation.z += 0.002;
  }
}