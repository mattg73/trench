import { Object3D, Mesh, BackSide, FrontSide, EquirectangularReflectionMapping, EquirectangularRefractionMapping, LinearMipMapLinearFilter} from 'three';
import Models from './models';
import Materials from './materials';
import {Textures, CubeTextures} from './textures';
import Loader from './loader';

export default class Gem {
  constructor(facingDirection){
    this.facingDirection = facingDirection;
  }

  init(sceneCameras){
    this.container = new Object3D();
    this.loaded = false;

    if (this.facingDirection === 1){
      Loader.loadMesh(Models.gem, Materials.shaderDiamondFront, CubeTextures.envMapStudio).then(assets => {
        const material = assets[1];
        material.uniforms.tCube = sceneCameras.cubeCamera;
        material.uniforms.uFaceDirection.value = this.facingDirection;
        material.side = FrontSide;
         
        this.Mesh = new Mesh(assets[0], material);
        this.Mesh.position.x = -3;
        this.Mesh.scale.multiplyScalar(3);
        this.container.add(this.Mesh);
        this.loaded = true;
      });
      
    }else{

      Loader.loadMesh(Models.gem, Materials.shaderDiamondBack, CubeTextures.envMapStudio).then(assets => {
        const material = assets[1];
        material.uniforms.tCube = sceneCameras.cubeCamera;
        material.uniforms.uFaceDirection.value = this.facingDirection;
        material.side = BackSide;

        this.Mesh = new Mesh(assets[0], material);
        this.Mesh.position.x = -3;
        this.Mesh.scale.multiplyScalar(3);
        this.container.add(this.Mesh);
        this.loaded = true;
      });
    }
  }

  update(){
    if(this.loaded){
      this.Mesh.rotation.x -= 0.005;
      this.Mesh.rotation.y -= 0.02;
    }
  }
}