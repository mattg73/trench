import { Object3D, Mesh, BackSide, FrontSide, CubeReflectionMapping, LinearMipMapLinearFilter} from 'three';
import Cameras from './cameras'; 
import Models from './models';
import Materials from './materials';
import {Textures, CubeTextures} from './textures';

export default class GemRing {
  init(){
    this.container = new Object3D();
   
    // Metal
    this.meshMetal = (Models.gemRing.data.scene.children[2]).clone();

    this.meshMetal.material = Materials.gemRingMetal;
    this.meshMetal.material.envMap = CubeTextures.envMapStudio.data;

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
    this.meshPearl.material.envMap = CubeTextures.envMapStudio.data;
    this.meshPearl.material.envMapIntensity = 1;
    this.meshPearl.material.reflectivity = 4;
    this.meshPearl.material.needsUpdate = true;

    // Gem
    this.meshGem = (Models.gemRing.data.scene.children[1]).clone();

    this.meshGem.material = Materials.shaderSaphireBack;
    this.meshGem.material.uniforms.tCube = Cameras.cubeCamera;
    this.meshGem.material.uniforms.uFaceDirection.value = this.facingDirection;
    this.meshGem.material.side = BackSide;
      
    this.container.add(this.meshMetal);
    this.container.add(this.meshPearl);
    this.container.add(this.meshGem);

    this.container.position.y = 4;
    this.container.scale.multiplyScalar(1.6);
    
  }

  update(){
    this.container.rotation.x += 0.01;
    this.container.rotation.y += 0.01;
    this.container.rotation.z += 0.002;
  }
}