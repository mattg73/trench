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

    this.trench = new Object3D();

    for(var i=0; i<5; i++){
      prefabModels[i].traverse(  ( child ) => {

        if ( child.isMesh ) {
          const mesh = child.clone();
  
          mesh.material = Materials.object;
          mesh.material.envMap = CubeTextures.envMapHDR.data;
          mesh.material.envMapIntensity = 0.1;
  
          //mesh.material.map = Textures.objectBaseColor.data;
          //mesh.material.map.flipY = false;
          //mesh.material.map.anisotropy = 16;
  
          mesh.material.roughness = 0.6
          //mesh.material.roughnessMap = Textures.objectRoughness.data;
          //mesh.material.roughnessMap.flipY = false;
          //mesh.material.roughnessMap.anisotropy = 16;
  
          //mesh.material.normalMap = Textures.objectNormal.data;
          //mesh.material.normalMap.flipY = false;
         // mesh.material.normalMap.anisotropy = 16;
  
          mesh.material.metalness = 1;
          
          //mesh.material.metalnessMap = Textures.objectMetallic.data;
          //mesh.material.metalnessMap.flipY = false;
          //mesh.material.metalnessMap.anisotropy = 16;

          mesh.castShadow = true;
          mesh.receiveShadow = true;
  
          prefabs[i].add(mesh);
        }
      });
    }
    

    const segments = 100;
    for(var i=0; i<segments; i++){
      const index = Math.floor(5*Math.random());

      const container = prefabs[index].clone();
      container.position.z = -50 * i;
      this.trench.add(container);
    }



    mainScene.add(this.trench);
    //mainScene.add(this.container);

    /*
    this.amplitude = (Math.PI * 0.1);
    this.frequency = 1;

    Debug.object.add(this, 'amplitude', 0, Math.PI * 0.3)
    Debug.object.add(this, 'frequency', 0.5, 3)
    */
  }

  update(){
    const elapsed = Timer.getElapsedTime();
    
    //this.container.rotation.x = this.amplitude * 0.5 * Math.sin(elapsed * this.frequency);
    //this.container.rotation.y = this.amplitude * Math.cos(elapsed * this.frequency);
  }

  show(){
    this.trench.visible = true;
  }

  hide(){
    this.trench.visible = false;
  }
}