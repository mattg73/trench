import { Clock } from 'three';
import * as dat from 'dat.gui';
import Loader from './loader';
import LoadQueues from './load-queues';
import Renderer from './renderer';
import Cameras from './cameras';
import {mainScene, gemBackFacingScene} from './scenes';
import Models from './models';
import Materials from './materials';
import Bee from './bee';
import DynamicRing, {Profiles} from './dynamicRing';
import Gem from './gem';
import SquareRing from './squareRing';
import GemRing from './gemRing';
import CelticRing from './celticRing';
import CameoRing from './cameoRing';
import Post from './post';
import DefaultSphere from './default-sphere';

class WebGL {
  init(){
    this.clock = new Clock();

    this.gui = new dat.GUI();

    this.loaded = false;

    Loader.loadFromQueue(LoadQueues).then(assets => {
      Renderer.init();
      Cameras.init();

      mainScene.init();

      // Objects
      //this.sphere = new DefaultSphere();
      //this.sphere.init();

      // Rings
      const ringParameters = [
        {material: Materials.gold, width: 0.2, height: 0.15, template: Profiles.squareTemplate, location: 10},
        {material: Materials.copper, width: 0.4, height: 0.1, template: Profiles.squareTemplate, location: 5},
        {material: Materials.platinum, width: 0.25, height: 0.125, template: Profiles.triangleTemplate, location: 0},
        {material: Materials.jade, width: 0.5, height: 0.2, template: Profiles.roundTemplate, location: -5}
      ]

      this.dynamicRings = [];
      for(var i=0; i<4; i++){
        const dynamicRing = new DynamicRing();
        dynamicRing.init(ringParameters[i]);
        this.dynamicRings.push(dynamicRing);
      }

      // Gems and Stones
      const gemParameters = [
        {model: Models.emerald, materialFront: Materials.shaderEmeraldFront, materialBack: Materials.shaderEmeraldBack, location: 10},
        {model: Models.oval, materialFront: Materials.shaderRubyFront, materialBack: Materials.shaderRubyBack, location: 5},
        {model: Models.gem , materialFront: Materials.shaderDiamondFront, materialBack: Materials.shaderDiamondBack, location: 0},
        {model: Models.pear, materialFront: Materials.shaderDemantoidFront, materialBack: Materials.shaderDemantoidBack, location: -5},
      ]

      this.gems = [];
      for(var i=0; i<4; i++){
        const gem = new Gem();
        gem.init(gemParameters[i]);
        this.gems.push(gem);
      }

      this.bee = new Bee();
      this.bee.init();
      
      this.squareRing = new SquareRing();
      this.squareRing.init();

      this.gemRing = new GemRing();
      this.gemRing.init();

      this.celticRing = new CelticRing();
      this.celticRing.init();

      this.cameoRing = new CameoRing();
      this.cameoRing.init();
  
      Post.init();

      window.addEventListener( 'resize', this.onWindowResize, false );

      this.loaded = true;
    });
  }

  main(){
    if(this.loaded){
      this.delta = this.clock.getDelta();

      mainScene.update();

      for(var i=0; i<4; i++){
        this.dynamicRings[i].update();
      }

      for(var i=0; i<4; i++){
        this.gems[i].update();
      }

      this.bee.update();
      this.squareRing.update();
      this.gemRing.update();
      this.celticRing.update();
      this.cameoRing.update();

      Post.update(this.delta);
      //Renderer.update(mainScene, Cameras.mainCamera);
      //Renderer.update(gemBackFacingScene, Cameras.mainCamera);
    }

    requestAnimationFrame(() => this.main());
  }


  onWindowResize() {
    Cameras.mainCamera.aspect = window.innerWidth / window.innerHeight;
    Cameras.mainCamera.updateProjectionMatrix();
    Renderer.setSize( window.innerWidth, window.innerHeight );
  }
}
export default new WebGL();