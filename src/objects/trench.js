import { Object3D} from 'three';
import Debug from '../debug';
import Timer from '../timer'
import {mainScene} from '../scenes';
import Models from '../models';
import Materials from '../materials';
import {Textures, CubeTextures} from '../textures';

export default class Trench {
  constructor(){

  }

  init(){
    this.speed = 100

    this.segments = 100;
    this.segmentDepth = 50

    const prefab1 = new Object3D();
    const prefab2 = new Object3D();
    const prefab3 = new Object3D();
    const prefab4 = new Object3D();
    const prefab5 = new Object3D();
    const prefabs = [prefab1, prefab2, prefab3, prefab4, prefab5]

    const prefabModels = [
      Models.prefab01.data.scene,
      Models.prefab02.data.scene,
      Models.prefab03.data.scene,
      Models.prefab04.data.scene,
      Models.prefab05.data.scene
    ]

    const prefabMaterals = [
      Materials.prefab1,
      Materials.prefab2,
      Materials.prefab3,
      Materials.prefab4,
      Materials.prefab5
    ];

    const prefabTextures = [
      Textures.prefab1Bake.data,
      Textures.prefab2Bake.data,
      Textures.prefab3Bake.data,
      Textures.prefab4Bake.data,
      Textures.prefab5Bake.data
    ]

    this.trench = new Object3D();

    for(var i=0; i<5; i++){
      prefabModels[i].traverse(  ( child ) => {

        if ( child.isMesh ) {
          const mesh = child.clone();
  
          mesh.material = prefabMaterals[i];
          //mesh.material.envMap = CubeTextures.envMapHDR.data;
          //mesh.material.envMapIntensity = 0.1;
  
          mesh.material.map = prefabTextures[i];
          mesh.material.map.flipY = false;
          mesh.material.map.anisotropy = 16;
  
          //mesh.material.roughness = 0.6
          //mesh.material.roughnessMap = Textures.objectRoughness.data;
          //mesh.material.roughnessMap.flipY = false;
          //mesh.material.roughnessMap.anisotropy = 16;
  
          //mesh.material.normalMap = Textures.objectNormal.data;
          //mesh.material.normalMap.flipY = false;
         // mesh.material.normalMap.anisotropy = 16;
  
          //mesh.material.metalness = 1;
          
          //mesh.material.metalnessMap = Textures.objectMetallic.data;
          //mesh.material.metalnessMap.flipY = false;
          //mesh.material.metalnessMap.anisotropy = 16;

          //mesh.castShadow = true;
          //mesh.receiveShadow = true;
  
          prefabs[i].add(mesh);
        }
      });
    }
    
    for(var i=0; i<this.segments; i++){
      const index = Math.floor(5 * Math.random());

      const container = prefabs[index].clone();
      container.position.z = -this.segmentDepth * i;
      this.trench.add(container);
    }

    mainScene.add(this.trench);
    //mainScene.add(this.container);
  }

  update(){
    const elapsed = Timer.getDelta();

    this.trench.position.z += this.speed * elapsed;

    for(var i=0; i<this.segments; i++){
      const segment = this.trench.children[i]
      
      if (this.trench.position.z + segment.position.z > this.segmentDepth){
        segment.position.z -= this.segments * this.segmentDepth
      }
    }
  }

  show(){
    this.trench.visible = true;
  }

  hide(){
    this.trench.visible = false;
  }
}