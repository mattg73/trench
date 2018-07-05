import StateMachine from './stateMachine';
import Renderer from './renderer';
import Cameras from './cameras';
import {mainScene} from './scenes'
import Post from './post';

class Listeners{
    init(){
        console.log('hello')
        window.addEventListener( 'click', this.onClick, false );
        window.addEventListener( 'resize', this.onWindowResize, false );
    }

    onClick(event){
        StateMachine.click(event);
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