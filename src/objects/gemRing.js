import { Object3D, Mesh, BackSide, FrontSide, CubeReflectionMapping, LinearMipMapLinearFilter} from 'three';
import {mainScene, gemBackFacingScene} from '../scenes';
import Cameras from '../cameras'; 
import Models from '../models';
import Materials from '../materials';
import {Textures, CubeTextures} from '../textures';

export default class GemRing {
  init(){
    this.container = new Object3D();
   
    // Metal
    this.meshMetal = (Models.gemRing.data.scene.children[2]).clone();

    this.meshMetal.material = Materials.gemRingMetal;
    this.meshMetal.material.envMap = CubeTextures.envMapHDR.data;

    this.meshMetal.material.map = Textures.gemRingBaseColor.data;
    this.meshMetal.material.map.flipY = false;
    this.meshMetal.material.map.anisotropy = 16;

    this.meshMetal.material.roughnessMap = Textures.gemRingRoughness.data;
    this.meshMetal.material.roughnessMap.flipY = false;
    this.meshMetal.material.roughnessMap.anisotropy = 16;

    this.meshMetal.material.normalMap = Textures.gemRingNormal.data;
    this.meshMetal.material.normalMap.flipY = false;
    this.meshMetal.material.normalMap.anisotropy = 16;

    // Pearl
    this.meshPearl = (Models.gemRing.data.scene.children[0]).clone();

    this.meshPearl.material = Materials.pearl;
    this.meshPearl.material.envMap = CubeTextures.envMapLDR.data;
    this.meshPearl.material.envMapIntensity = 1;
    this.meshPearl.material.reflectivity = 3;
    this.meshPearl.material.needsUpdate = true;

    // Gem
    this.meshGemFront = (Models.gemRing.data.scene.children[1]).clone();

    this.meshGemFront.material = Materials.shaderSaphireFront;
    this.meshGemFront.material.uniforms.tCube = Cameras.cubeCamera;
    this.meshGemFront.material.uniforms.uFaceDirection.value = 1;
    this.meshGemFront.material.side = FrontSide;

    this.meshGemBack = (Models.gemRing.data.scene.children[1]).clone();

    this.meshGemBack.material = Materials.shaderSaphireBack;
    this.meshGemBack.material.uniforms.tCube = Cameras.cubeCamera;
    this.meshGemBack.material.uniforms.uFaceDirection.value = -1;
    this.meshGemBack.material.side = BackSide;
      
    this.container.add(this.meshMetal);
    this.container.add(this.meshPearl);
    this.container.add(this.meshGemFront);

    this.container.position.y = 0;
    this.meshGemBack.position.y = 0;

    this.container.scale.multiplyScalar(1.6);
    this.meshGemBack.scale.multiplyScalar(1.6);

    this.hide();
    mainScene.add(this.container);
    gemBackFacingScene.add(this.meshGemBack);
    
  }

  update(){
    this.container.rotation.x += 0.01;
    this.container.rotation.y += 0.01;
    this.container.rotation.z += 0.002;

    this.meshGemBack.rotation.x += 0.01;
    this.meshGemBack.rotation.y += 0.01;
    this.meshGemBack.rotation.z += 0.002;
  }

  show(){
    this.meshGemBack.visible = true;
    this.container.visible = true;
  }

  hide(){
    this.meshGemBack.visible = false;
    this.container.visible = false;
  }
}