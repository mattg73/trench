import Renderer from './renderer';
import Scene from './scene';
import Cameras from './cameras';

export default class WebGL {
  init(){
    this.renderer = new Renderer();
    this.renderer.init();

    this.scene = new Scene();
    this.scene.init();

    this.cameras = new Cameras();
    this.cameras.init();
  }

  main(){
    this.renderer.update(this.scene, this.cameras.mainCamera);

    requestAnimationFrame(() => this.main());
  }
}