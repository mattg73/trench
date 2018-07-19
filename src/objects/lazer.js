import { Object3D, Vector2, Vector3, DoubleSide} from 'three';
import Debug from '../debug';
import Timer from '../timer'
import {mainScene} from '../scenes';
import Lights from '../lights';
import Cameras from '../cameras' 
import Models from '../models';
import Materials from '../materials';
import {Textures, CubeTextures} from '../textures';

export default class Lazer {
  constructor(){
  }

  init(){
    this.firing = false
    this.bolts = [];
    this.muzzleIndex = 0;
    this.muzzleOffsets = [
      new Vector3(-4.8, 1.82, -7),
      new Vector3(4.8, -1.82, -7),
      new Vector3(-4.8, -1.82, -7),
      new Vector3(4.8, 1.82, -7),
    ]

    this.container = new Object3D();

    this.mesh = (Models.lazer.data.scene.children[0]);
    this.mesh.material = Materials.lazer;
    this.mesh.material.envMap = CubeTextures.envMapLDR.data;
    this.mesh.material.envMapIntensity = 1;

    //this.mesh.material.map = Textures.objectBaseColor.data;
    //this.mesh.material.map.flipY = false;
    //this.mesh.material.map.anisotropy = 16;

    //this.mesh.material.roughnessMap = Textures.objectRoughness.data;
    //this.mesh.material.roughnessMap.flipY = false;
    //this.mesh.material.roughnessMap.anisotropy = 16;

    //this.mesh.material.normalMap = Textures.objectNormal.data;
    //this.mesh.material.normalMap.flipY = false;
    //this.mesh.material.normalMap.anisotropy = 16;

    //this.mesh.material.metalnessMap = Textures.objectMetallic.data;
    //this.mesh.material.metalnessMap.flipY = false;
    //this.mesh.material.metalnessMap.anisotropy = 16;

    this.container.add(this.mesh);
    mainScene.add(this.container);
  }

  update(){
    if(this.bolts.length > 10){
      mainScene.remove(this.bolts[0].mesh);
      this.bolts[0] = undefined;
      this.bolts.shift();
    }

    for(var i=this.bolts.length-1; i>=0; i--){
      this.bolts[i].update();
    }

    this.mesh.position.x = Cameras.mainCamera.position.x;
    this.mesh.position.y = Cameras.mainCamera.position.y;
    this.mesh.position.z = Cameras.mainCamera.position.z;
  }

  keyDown(event){
    if(event.keyCode === 32){
      this.muzzleIndex += 1;
      if(this.muzzleIndex > 3) this.muzzleIndex = 0;

      this.pew();
    }
  }

  pew(){
    const bolt = new Bolt();
    bolt.init(this.mesh.position, this.muzzleOffsets[this.muzzleIndex]);
    this.bolts.push(bolt);
  }

  show(){
    this.mesh.visible = true;
  }

  hide(){
    this.mesh.visible = false;
  }
}

class Bolt{
  init(spawnPosition, muzzleOffset){
    this.speed = 400;
 
    this.source = new Vector2();
    this.target = new Vector2();
    this.rotation = new Vector2();

    this.mesh = (Models.bolt.data.scene.children[0].clone());

    this.mesh.material = Materials.boltRed;
    this.mesh.material.transparent = true;

    this.mesh.material.map = Textures.boltRed.data;

    this.mesh.position.x = spawnPosition.x+muzzleOffset.x;
    this.mesh.position.y = spawnPosition.y+muzzleOffset.y;
    this.mesh.position.z = spawnPosition.z+muzzleOffset.z;

    Lights.lazer.intensity = 1.5;
    Lights.lazer.position.set(this.mesh.position.x,this.mesh.position.y,this.mesh.position.z);

    this.mesh.scale.multiplyScalar(6);

    mainScene.add(this.mesh);
  }

  update(){
    const delta = 1/60;
    Lights.lazer.intensity *= 0.95;

    this.mesh.position.z -= this.speed * delta;

    this.source.x = this.mesh.position.x; 
    this.source.y = this.mesh.position.y;

    this.target.x = Cameras.mainCamera.position.x; 
    this.target.y = Cameras.mainCamera.position.y;

    this.rotation.subVectors(this.target, this.source); 

    this.mesh.rotation.z = this.rotation.angle()-Math.PI*0.5;
  }
}