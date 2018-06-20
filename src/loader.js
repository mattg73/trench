import {Mesh} from 'three';
import GLTFLoader from 'three-gltf-loader';

export default class Loader {
  constructor(){
    
  };
  
  static loadGLTFScene(model) {
    return new Promise((resolve, reject) => {
      new GLTFLoader().load(
        // resource URL
        model.url,
        
        // called when the resource is loaded
        function ( data ) {
          console.log('loaded');
          resolve(data.scene);
        },
  
        // called when loading is in progresses
        function ( xhr ) {
          console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
  
        // called when loading has errors
        function (error) {
          console.log( 'An error happened' );
          reject(error);
        }
      );
    });
  }

  loadMesh(model, material) {
    const promises = [
      this.loadModel(model),
      this.loadMaterial(material)
    ];

    return Promise.all(promises).then(result => {
      return new Mesh(result[0].clone(), result[1]);
    });
  }

  loadModel(model){
    return new Promise((resolve, reject) => {
      new GLTFLoader().load(
        // resource URL
        model.url,
        
        // called when the resource is loaded
        function ( data ) {
          console.log('loaded');
          console.log(data.scene.children[0].geometry)
          resolve(data.scene.children[0].geometry);
        },
  
        // called when loading is in progresses
        function ( xhr ) {
          console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
  
        // called when loading has errors
        function (error) {
          console.log( 'An error happened' );
          reject(error);
        }
      );
    });
  }

  loadMaterial(material){
    //do texture loading stuff here

    return material;
  }
}

