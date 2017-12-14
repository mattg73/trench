import {WebGLRenderer} from 'three';

export default class Renderer extends WebGLRenderer{
  constructor(){
    super({antialias:true});
  }

  init(){
    this.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( this.domElement );
  }

  update(scene, camera){
      this.render(scene, camera);
  }
}