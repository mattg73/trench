import StateMachine from './stateMachine';
import Objects from './objects';
import Loader from './loader';
import LoadQueues from './load-queues';
import Renderer from './renderer';
import Cameras from './cameras';
import {mainScene} from './scenes';
import Models from './models';
import Materials from './materials';
import DynamicRing, {Profiles} from './objects/dynamicRing';
import Gem from './objects/gem';
import Turquoise from './objects/turquoise';
import Bee from './objects/bee';
import SquareRing from './objects/squareRing';
import GemRing from './objects/gemRing';
import CelticRing from './objects/celticRing';
import CameoRing from './objects/cameoRing';
import FaceRing from './objects/faceRing';
import Post from './post';
import Listeners from './listeners';

// Parent class for all state instances
class State{
    enter(){
    }
    update(){
    }
    exit(){
    }
    transition(targetState){
        this.exit();
        targetState.enter();
        StateMachine.state = targetState;
    }
}

// States

class LoadState extends State{
    constructor(){
        super();
        this.id = 'loadState'
    }
    enter(){
        Loader.loadFromQueue(LoadQueues).then(assets => {
            this.transition(initState);
        });
    }
    update(){
    }
    exit(){
    }
}
export let loadState = new LoadState();

class InitState extends State{
    constructor(){
        super();
        this.id = 'initState'
    }
    enter(){
        Renderer.init();
        Cameras.init();
  
        mainScene.init();
  
        // Objects
        Objects.sphere = new DefaultSphere();
        Objects.sphere.init();
    
        Post.init();
  
        Listeners.init();
    }
    update(){
        this.transition(mainState);
    }
    exit(){
    }
}
export let initState = new InitState();

class MainState extends State{
    constructor(){
        super();
        this.id = 'mainState'
    }
    enter(){
        Objects.sphere.show();
    }
    update(){
        mainScene.update();
        Objects.sphere.update();
        Post.update();
        //Renderer.update(mainScene, Cameras.mainCamera);
        //Renderer.update(gemBackFacingScene, Cameras.mainCamera);
    }
    exit(){
        Objects.sphere.hide();
    }
    click(event){

    }
}
export let mainState = new MainState();