import {TextureLoader, CubeTextureLoader} from 'three';
import GLTFLoader from 'three-gltf-loader';

export default class Loader {
  constructor(){
    
  };

  static loadCubeTexture(asset){
    return new Promise((resolve, reject) => {
      const loader = new CubeTextureLoader();
      loader.setPath('./assets/textures/env-maps/')
      loader.load(
        // resource URL
        asset.urlArray,
        
        // called when the resource is loaded
        function ( texture ) {
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

  static loadTexture(asset){
    return new Promise((resolve, reject) => {
      new TextureLoader().load(
        // resource URL
        asset.url,
        
        // called when the resource is loaded
        function ( texture ) {
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

  static loadMesh(parameters) {
    const promises = [];

    promises.push(this.loadModel(parameters.model));
    promises.push(this.loadMaterial(parameters.material));
    promises.push(this.loadCubeTexture(parameters.envMap));
    if(parameters.map) promises.push(this.loadTexture(parameters.map));
    if(parameters.roughnessMap) promises.push(this.loadTexture(parameters.roughnessMap));
    if(parameters.normalMap) promises.push(this.loadTexture(parameters.normalMap));

    return Promise.all(promises).then(result => {
      return result;
    });
  }

  static loadModel(asset){
    return new Promise((resolve, reject) => {
      new GLTFLoader().load(
        // resource URL
        asset.url,
        
        // called when the resource is loaded
        function ( data ) {
          resolve(data.scene.children[0].geometry);
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

  static loadMaterial(material){
    //do texture loading stuff here
    
    return material;
  }
}
