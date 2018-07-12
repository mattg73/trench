import { Clock } from 'three';
import * as dat from 'dat.gui';
import {Stats} from 'three-stats';
import StateMachine from './stateMachine';

class WebGL {
  init(){
    this.clock = new Clock();
    this.gui = new dat.GUI();

    console.log(Stats)
    this.stats = new Stats();
    this.stats.showPanel(0);
    document.body.appendChild(this.stats.dom);

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