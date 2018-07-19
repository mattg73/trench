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
    this.speed = 200

    this.segments = 100;
    this.segmentDepth = 50

    this.currentLevel = 0;
    this.currentSection = 0;
    this.currentSegment = 0;
    this.cumulativeSegmentsPassed = 0;

    this.map = [
      [
        {// start
          sectionLength: 20,
          hazard: 'none',
          separation: 20,
          occurence: 0.0 
        }, 
        {// horizontal
          sectionLength: 100,
          hazard: 'obstacle',
          separation: 4,
          occurence: 0.8 
        },
        {// end
          sectionLength: 20,
          hazard: 'none',
          separation: 20,
          occurence: 0.0 
        }
      ] 
    ]

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
           //mesh.material.normalMap.anisotropy = 16;
  
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

    this.generateMap();
  }

  update(){
    const elapsed = Timer.getDelta();

    // Check to see if we've reached a new section in the map
    this.currentSegment = Math.floor(this.trench.position.z / this.segmentDepth);
    if(this.currentSegment >= this.cumulativeSegmentsPassed + this.map[this.currentLevel][this.currentSection].sectionLength){
      this.cumulativeSegmentsPassed += this.map[this.currentLevel][this.currentSection].sectionLength;
      this.currentSection++;
    }

    // Move trench
    this.trench.position.z += this.speed * elapsed;

    // Push passed trench segments to the horizon
    for(var i=0; i<this.segments; i++){
      const segment = this.trench.children[i];
      if (this.trench.position.z + segment.position.z > this.segmentDepth){
        segment.position.z -= this.segments * this.segmentDepth
      }
    }
  }

  generateMap(){
    let cumulativeOffset = 0;

    for(var sections=0; sections<this.map[this.currentLevel].length; sections++){

      const sectionDetail = this.map[this.currentLevel][sections];

      for(var i=0; i<sectionDetail.sectionLength; i++){
        if(i % sectionDetail.separation === 0){
          if(Math.random() < sectionDetail.occurence){
            
            switch(sectionDetail.hazard) {
              case 'none':
                break;
              case 'tower':
                
                break;
              case 'obstacle':
                const hazard = new Obstacle();
                hazard.init((cumulativeOffset + i) * -this.segmentDepth);
                this.trench.add(hazard.mesh);
                break;
              default:
                //code block
                break;
            }  
           
          }
        }
      }

      cumulativeOffset += sectionDetail.sectionLength;
      //console.log(cumulativeOffset)
    }
  }

  show(){
    this.trench.visible = true;
  }

  hide(){
    this.trench.visible = false;
  }
}

class Obstacle{
  init(spawnOffset){
    
    const heights = [10, 25, 40];
    const heightIndex = Math.floor(Math.random()*3);
    const obstacleMaterials = [Materials.obstacleLow, Materials.obstacleMid, Materials.obstacleHigh]
    const obstacleTextures = [Textures.obstacleLow.data, Textures.obstacleMid.data, Textures.obstacleHigh.data];

    this.mesh = (Models.obstacle.data.scene.children[0].clone());

    this.mesh.material = obstacleMaterials[heightIndex];
    
    this.mesh.material.map = obstacleTextures[heightIndex];
    this.mesh.material.map.flipY = false;

    this.mesh.position.x = 0;
    this.mesh.position.y = heights[heightIndex];
    this.mesh.position.z = spawnOffset;
  }

  update(){

  }
}