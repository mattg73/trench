import StateMachine from './stateMachine';
import Renderer from './renderer';
import Cameras from './cameras';

class Listeners{
    init(){
        window.addEventListener( 'click', this.onClick, false );
        window.addEventListener( 'resize', this.onWindowResize, false );
    }

    onClick(){
        StateMachine.click();
    }

    onWindowResize() {
        Cameras.mainCamera.aspect = window.innerWidth / window.innerHeight;
        Cameras.mainCamera.updateProjectionMatrix();
        Renderer.setSize( window.innerWidth, window.innerHeight );
      }
}
export default new Listeners();