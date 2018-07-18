import Config from './config';
import StateMachine from './stateMachine';
import Objects from './objects';
import Loader from './loader';
import LoadQueues from './load-queues';
import Renderer from './renderer';
import Cameras from './cameras';
import {mainScene} from './scenes';
import Trench from './objects/trench';
import Lazer from './objects/lazer';
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
        Config.init();
        Renderer.init();
        Cameras.init();
  
        mainScene.init();
  
        // Objects
        Objects.trench = new Trench();
        Objects.trench.init();

        Objects.lazer = new Lazer();
        Objects.lazer.init();
    
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
        Objects.trench.show();
        Objects.lazer.show();
    }
    update(){
        mainScene.update();
        Objects.trench.update();
        Objects.lazer.update();
        Post.update();
        // Renderer.update(mainScene, Cameras.mainCamera);
        // Renderer.update(gemBackFacingScene, Cameras.mainCamera);
    }
    exit(){
        Objects.trench.hide();
        Objects.lazer.hide();
    }
    click(event){

    }
    keyDown(event){
        Cameras.keyDown(event);
        Objects.lazer.keyDown(event); 
    }
}
export let mainState = new MainState();