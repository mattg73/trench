import StateMachine from './stateMachine';
import Renderer from './renderer';
import Cameras from './cameras';
import Post from './post';

class Listeners{
    init(){
        window.addEventListener( 'click', this.onClick, false );
        window.addEventListener( 'keydown', this.onKeyDown, false );
        window.addEventListener( 'resize', this.onWindowResize, false );
    }

    onClick(event){
        StateMachine.click(event);
    }

    onKeyDown(event){
        StateMachine.keyDown(event);
    }

    onWindowResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        Cameras.mainCamera.aspect = width / height;
        Cameras.mainCamera.updateProjectionMatrix();

        Renderer.setSize( width, height );

        //Post.setSize( width, height );
      }
}
export default new Listeners();