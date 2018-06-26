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
    this.loaded = false;

    if (this.facingDirection === 1){
      const loadParameters = {
        model: Models.gem,
        material: Materials.shaderDiamondFront,
        envMap: CubeTextures.envMapStudio
      }
  
      Loader.loadMesh(loadParameters).then(assets => {
        const material = assets[1];
        material.uniforms.tCube = Cameras.cubeCamera;
        material.uniforms.uFaceDirection.value = this.facingDirection;
        material.side = FrontSide;
         
        this.mesh = new Mesh(assets[0], material);
        this.mesh.position.x = -5;
        this.mesh.scale.multiplyScalar(3);
        this.container.add(this.mesh);
        this.loaded = true;
      });
      
    }else{
      const loadParameters = {
        model: Models.gem,
        material: Materials.shaderDiamondBack,
        envMap: CubeTextures.envMapStudio
      }
  
      Loader.loadMesh(loadParameters).then(assets => {
        const material = assets[1];
        material.uniforms.tCube = Cameras.cubeCamera;
        material.uniforms.uFaceDirection.value = this.facingDirection;
        material.side = BackSide;

        this.mesh = new Mesh(assets[0], material);
        this.mesh.position.x = -5;
        this.mesh.scale.multiplyScalar(3);
        this.container.add(this.mesh);
        this.loaded = true;
      });
    }
  }

  update(){
    if(this.loaded){
      this.mesh.rotation.x -= 0.005;
      this.mesh.rotation.y -= 0.02;
    }
  }
}