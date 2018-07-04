import { Clock } from 'three';
import * as dat from 'dat.gui';
import StateMachine from './stateMachine';

class WebGL {
  init(){
    this.clock = new Clock();
    this.gui = new dat.GUI();

    StateMachine.init();
  }

  main(){
    this.delta = this.clock.getDelta();

    StateMachine.update();

    requestAnimationFrame(() => this.main());
  }
}
export default new WebGL();