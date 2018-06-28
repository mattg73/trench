import {TextureLoader, CubeTextureLoader, UnsignedByteType} from 'three';
import HDRCubeTextureLoader from './libs/loaders/HDRCubeTextureLoader';
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
      if(queue.cubeTextureLoad[i].type ==='hdr'){
        promises.push(this.loadHDRCubeTexture(queue.cubeTextureLoad[i]));
      }else if(queue.cubeTextureLoad[i].type ==='ldr'){
        promises.push(this.loadLDRCubeTexture(queue.cubeTextureLoad[i]));
      }
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
          texture.encoding = asset.encoding;
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

  static loadHDRCubeTexture(asset){
    return new Promise((resolve, reject) => {
      new HDRCubeTextureLoader().load(
        // type 
        UnsignedByteType,

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

  static loadLDRCubeTexture(asset){
    return new Promise((resolve, reject) => {
      new CubeTextureLoader().load(
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

}

