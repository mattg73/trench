import { Clock } from 'three';
import * as dat from 'dat.gui';
import Loader from './loader';
import LoadQueues from './load-queues';
import Renderer from './renderer';
import Cameras from './cameras';
import {mainScene, gemBackFacingScene} from './scenes';
import Bee from './bee';
import Ring from './ring';
import Gem from './gem';
import SquareRing from './squareRing';
import GemRing from './gemRing';
import Post from './post';

class WebGL {
  init(){
    this.clock = new Clock();

    this.gui = new dat.GUI();

    this.loaded = false;

    Loader.loadFromQueue(LoadQueues).then(assets => {
      Renderer.init();
      Cameras.init();

      mainScene.init();
      gemBackFacingScene.init();

          // Objects
      this.bee = new Bee();
      this.bee.init();

      this.ring = new Ring();
      this.ring.init();

      this.gem = new Gem();
      this.gem.init();
      
      this.squareRing = new SquareRing();
      this.squareRing.init();

      this.gemRing = new GemRing();
      this.gemRing.init();
  
      Post.init();

      this.loaded = true;
    });
  }

  main(){
    if(this.loaded){
      this.delta = this.clock.getDelta();

      mainScene.update();
      gemBackFacingScene.update();
      
      this.bee.update();
      this.ring.update();
      this.gem.update();
      this.squareRing.update();
      this.gemRing.update();
  
      Post.update(this.delta);
      //this.renderer.update(this.mainScene, this.cameras.mainCamera);
      //this.renderer.update(this.gemBackFacingScene, this.cameras.mainCamera);
    }

    requestAnimationFrame(() => this.main());
  }
}
export default new WebGL();