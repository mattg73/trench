import {WebGLRenderer, Color} from 'three';

class Renderer extends WebGLRenderer{
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
export default new Renderer();