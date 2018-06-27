import { Object3D, Mesh, BackSide, FrontSide} from 'three';
import {mainScene, gemBackFacingScene} from './scenes';
import Cameras from './cameras';
import Models from './models';
import Materials from './materials';
import {Textures, CubeTextures} from './textures';
import Loader from './loader';

export default class Gem {
  constructor(){

  }

  init(){
    this.meshFront = (Models.gem.data.scene.children[0]).clone();
    this.meshFront.material = Materials.shaderDiamondFront;
    this.meshFront.material.uniforms.tCube = Cameras.cubeCamera;
    this.meshFront.material.uniforms.uFaceDirection.value = 1;
    this.meshFront.material.side = FrontSide;
      
    this.meshBack = (Models.gem.data.scene.children[0]).clone();
    this.meshBack.material = Materials.shaderDiamondBack;
    this.meshBack.material.uniforms.tCube = Cameras.cubeCamera;
    this.meshBack.material.uniforms.uFaceDirection.value = -1;
    this.meshBack.material.side = BackSide;

    this.meshFront.position.x = -5;
    this.meshFront.scale.multiplyScalar(2);

    this.meshBack.position.x = -5;
    this.meshBack.scale.multiplyScalar(2);

    mainScene.add(this.meshFront);
    gemBackFacingScene.add(this.meshBack);
  }

  update(){
    this.meshFront.rotation.x -= 0.005;
    this.meshFront.rotation.y -= 0.02;

    this.meshBack.rotation.x -= 0.005;
    this.meshBack.rotation.y -= 0.02;
  }
}