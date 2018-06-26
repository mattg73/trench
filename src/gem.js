import { Object3D, Mesh, BackSide, FrontSide, EquirectangularReflectionMapping, EquirectangularRefractionMapping, LinearMipMapLinearFilter} from 'three';
import Cameras from './cameras';
import Models from './models';
import Materials from './materials';
import {Textures, CubeTextures} from './textures';
import Loader from './loader';

export default class Gem {
  constructor(facingDirection){
    this.facingDirection = facingDirection;
  }

  init(){
    this.container = new Object3D();

    this.mesh = (Models.gem.data.scene.children[0]).clone();

    if (this.facingDirection === 1){
      this.mesh.material = Materials.shaderDiamondFront;
      this.mesh.material.uniforms.tCube = Cameras.cubeCamera;
      this.mesh.material.uniforms.uFaceDirection.value = this.facingDirection;
      this.mesh.material.side = FrontSide;
        
      this.mesh.position.x = -5;
      this.mesh.scale.multiplyScalar(3);

      this.container.add(this.mesh);
    }else{
      this.mesh.material = Materials.shaderDiamondBack;
      this.mesh.material.uniforms.tCube = Cameras.cubeCamera;
      this.mesh.material.uniforms.uFaceDirection.value = this.facingDirection;
      this.mesh.material.side = BackSide;
        
      this.mesh.position.x = -5;
      this.mesh.scale.multiplyScalar(3);

      this.container.add(this.mesh);
    }
  }

  update(){
    this.mesh.rotation.x -= 0.005;
    this.mesh.rotation.y -= 0.02;
  }
}