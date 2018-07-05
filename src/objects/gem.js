import { Object3D, Mesh, BackSide, FrontSide} from 'three';
import {mainScene, gemBackFacingScene} from '../scenes';
import Cameras from '../cameras';
import Models from '../models';
import Materials from '../materials';
import {Textures, CubeTextures} from '../textures';
import Loader from '../loader';

export default class Gem {
  constructor(){

  }

  init(parameters){
    this.meshFront = (parameters.model.data.scene.children[0]).clone();
    this.meshFront.material = parameters.materialFront;
    this.meshFront.material.uniforms.tCube = Cameras.cubeCamera.renderTarget.texture;
    this.meshFront.material.uniforms.uFaceDirection.value = 1;
    this.meshFront.material.side = FrontSide;
      
    this.meshBack = (parameters.model.data.scene.children[0]).clone();
    this.meshBack.material = parameters.materialBack;
    this.meshBack.material.uniforms.tCube = Cameras.cubeCamera.renderTarget.texture;
    this.meshBack.material.uniforms.uFaceDirection.value = -1;
    this.meshBack.material.side = BackSide;

    this.meshFront.position.x = parameters.location;
    this.meshBack.position.x = parameters.location;

    this.meshFront.rotation.y = parameters.offset;
    this.meshBack.rotation.y = parameters.offset;

    this.meshFront.scale.multiplyScalar(2);
    this.meshBack.scale.multiplyScalar(2);

    this.hide();
    mainScene.add(this.meshFront);
    gemBackFacingScene.add(this.meshBack);
  }

  update(){
    this.meshFront.rotation.x -= 0.005;
    this.meshFront.rotation.y -= 0.02;

    this.meshBack.rotation.x -= 0.005;
    this.meshBack.rotation.y -= 0.02;
  }

  show(){
    this.meshFront.visible = true;
    this.meshBack.visible = true;
  }

  hide(){
    this.meshFront.visible = false;
    this.meshBack.visible = false;
  }
}