import { Clock } from 'three';
import Renderer from './renderer';
import {MainScene, GemBackFacingScene, GemFrontFacingScene} from './scenes';
import Cameras from './cameras';
import Post from './post';

export default class WebGL {
  init(){
    this.clock = new Clock();

    this.renderer = new Renderer();
    this.renderer.init();

    this.cameras = new Cameras();
    this.cameras.init();

    this.mainScene = new MainScene();
    this.mainScene.init(this.cameras);

    this.gemBackFacingScene = new GemBackFacingScene();
    this.gemBackFacingScene.init(this.cameras);

    this.gemFrontFacingScene = new GemFrontFacingScene();
    this.gemFrontFacingScene.init(this.cameras);

    this.post = new Post();
    this.post.init(this.renderer, this.mainScene, this.gemBackFacingScene, this.gemFrontFacingScene, this.cameras.mainCamera);
  }

  main(){
    this.delta = this.clock.getDelta();

    this.mainScene.update();
    this.gemBackFacingScene.update();
    this.gemFrontFacingScene.update();

    this.post.update(this.delta);
    //this.renderer.update(this.mainScene, this.cameras.mainCamera);
    //this.renderer.update(this.gemBackFacingScene, this.cameras.mainCamera);

    requestAnimationFrame(() => this.main());
  }
}