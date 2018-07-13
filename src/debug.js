import * as dat from 'dat.gui';

class Debug {
  init(){
    this.gui = new dat.GUI();

    this.object = this.gui.addFolder('Object');
    this.postProcessing = this.gui.addFolder('Post Processing');

  }
}
export default new Debug();