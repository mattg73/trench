import { Clock } from 'three';
import * as dat from 'dat.gui';
import Loader from './loader';
import LoadQueues from './load-queues';
import Renderer from './renderer';
import Cameras from './cameras';
import {MainScene, GemBackFacingScene, GemFrontFacingScene} from './scenes';
import Post from './post';

class WebGL {
  init(){
    this.clock = new Clock();

    this.gui = new dat.GUI();

    this.loaded = false;

    Loader.loadFromQueue(LoadQueues).then(assets => {
      Renderer.init();
      Cameras.init();

      this.mainScene = new MainScene();
      this.mainScene.init();
  
      this.gemBackFacingScene = new GemBackFacingScene();
      this.gemBackFacingScene.init();
  
      this.gemFrontFacingScene = new GemFrontFacingScene();
      this.gemFrontFacingScene.init();
  
      Post.init(this.mainScene, this.gemBackFacingScene, this.gemFrontFacingScene);

      this.loaded = true;
    });
  }

  main(){
    if(this.loaded){
      this.delta = this.clock.getDelta();

      this.mainScene.update();
      this.gemBackFacingScene.update();
      this.gemFrontFacingScene.update();
  
      Post.update(this.delta);
      //this.renderer.update(this.mainScene, this.cameras.mainCamera);
      //this.renderer.update(this.gemBackFacingScene, this.cameras.mainCamera);
    }

    requestAnimationFrame(() => this.main());
  }
}
export default new WebGL();