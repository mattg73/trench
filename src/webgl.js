import { Clock } from 'three';
import Renderer from './renderer';
import Scene from './scene';
import Cameras from './cameras';
import Post from './post';

export default class WebGL {
  init(){
    this.clock = new Clock();

    this.renderer = new Renderer();
    this.renderer.init();

    this.cameras = new Cameras();
    this.cameras.init();

    this.mainScene = new Scene();
    this.mainScene.init(this.cameras);

    this.post = new Post();
    this.post.init(this.renderer, this.mainScene, this.cameras.mainCamera);

    this.post.addRenderPass
  }

  main(){
    this.delta = this.clock.getDelta();

    this.mainScene.update();

    //this.post.update(this.delta);
    this.renderer.update(this.mainScene, this.cameras.mainCamera);

    requestAnimationFrame(() => this.main());
  }
}