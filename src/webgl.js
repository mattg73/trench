import { Clock } from 'three';
import {Stats} from 'three-stats';
import Debug from './debug';
import StateMachine from './stateMachine';

class WebGL {
  init(){
    this.clock = new Clock();

    this.stats = new Stats();
    this.stats.showPanel(0);
    document.body.appendChild(this.stats.dom);

    Debug.init();

    StateMachine.init();
  }

  main(){
    this.stats.begin();
    StateMachine.update();
    this.stats.end();
    requestAnimationFrame(() => this.main());
  }
}
export default new WebGL();