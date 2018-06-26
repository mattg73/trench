import {TextureLoader, CubeTextureLoader} from 'three';
import GLTFLoader from 'three-gltf-loader';

export default class Loader {
  constructor(){
    
  };

  static loadFromQueue(queue){
    const promises = [];

    for(var i=0; i<queue.modelLoad.length; i++){
      promises.push(this.loadGLTFScene(queue.modelLoad[i]));
    }
    for(var i=0; i<queue.textureLoad.length; i++){
      promises.push(this.loadTexture(queue.textureLoad[i]));
    }
    for(var i=0; i<queue.cubeTextureLoad.length; i++){
      promises.push(this.loadCubeTexture(queue.cubeTextureLoad[i]));
    }

    return Promise.all(promises).then(result => {
      return result;
    });
  }

  static loadTexture(asset){
    return new Promise((resolve, reject) => {
      new TextureLoader().load(
        // resource URL
        asset.url,
        
        // called when the resource is loaded
        function ( texture ) {
          asset.data = texture;
          resolve(texture);
        },
  
        // called when loading is in progresses
        function ( xhr ) {
          //console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
  
        // called when loading has errors
        function (error) {
          console.log( 'An error happened' );
          reject(error);
        }
      );
    });
  }

  static loadCubeTexture(asset){
    return new Promise((resolve, reject) => {
      const loader = new CubeTextureLoader();
      loader.setPath('./assets/textures/env-maps/')
      loader.load(
        // resource URL
        asset.urlArray,
        
        // called when the resource is loaded
        function ( texture ) {
          asset.data = texture;
          resolve(texture);
        },
  
        // called when loading is in progresses
        function ( xhr ) {
          //console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
  
        // called when loading has errors
        function (error) {
          console.log( 'An error happened' );
          reject(error);
        }
      );
    });
  }
  
  static loadGLTFScene(asset) {
    return new Promise((resolve, reject) => {
      new GLTFLoader().load(
        // resource URL
        asset.url,
        
        // called when the resource is loaded
        function ( data ) {
          asset.data = data;
          resolve(data.scene);
        },
  
        // called when loading is in progresses
        function ( xhr ) {
          //console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
  
        // called when loading has errors
        function (error) {
          console.log( 'An error happened' );
          reject(error);
        }
      );
    });
  }

  /*
  static loadMesh(parameters) {
    const promises = [];

    promises.push(this.loadGLTFScene(parameters.model));
    promises.push(this.loadMaterial(parameters.material));
    promises.push(this.loadCubeTexture(parameters.envMap));
    if(parameters.map) promises.push(this.loadTexture(parameters.map));
    if(parameters.roughnessMap) promises.push(this.loadTexture(parameters.roughnessMap));
    if(parameters.normalMap) promises.push(this.loadTexture(parameters.normalMap));

    return Promise.all(promises).then(result => {
      return result;
    });
  }
  */

  static loadMaterial(material){
    //do texture loading stuff here
    
    return material;
  }
}

