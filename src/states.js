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
        //this.sphere = new DefaultSphere();
        //this.sphere.init();
  
        // Rings
        const ringParameters = [
          {material: Materials.gold, width: 0.2, height: 0.15, template: Profiles.squareTemplate, location: 10, offset:0.0},
          {material: Materials.copper, width: 0.4, height: 0.1, template: Profiles.squareTemplate, location: 5, offset:-0.2},
          {material: Materials.platinum, width: 0.25, height: 0.125, template: Profiles.triangleTemplate, location: 0, offset:-0.4},
          {material: Materials.jade, width: 0.5, height: 0.2, template: Profiles.roundTemplate, location: -5, offset:-0.6}
        ]
  
        Objects.dynamicRings = [];
        for(var i=0; i<4; i++){
          const dynamicRing = new DynamicRing();
          dynamicRing.init(ringParameters[i]);
          Objects.dynamicRings.push(dynamicRing);
        }
  
        // Gems and Stones
        const gemParameters = [
          {model: Models.emerald, materialFront: Materials.shaderEmeraldFront, materialBack: Materials.shaderEmeraldBack, location: 10, offset:0.0},
          {model: Models.oval, materialFront: Materials.shaderRubyFront, materialBack: Materials.shaderRubyBack, location: 5, offset:-0.2},
          {model: Models.gem , materialFront: Materials.shaderDiamondFront, materialBack: Materials.shaderDiamondBack, location: 0, offset:-0.4},
          {model: Models.pear, materialFront: Materials.shaderDemantoidFront, materialBack: Materials.shaderDemantoidBack, location: -5, offset:-0.6},
        ]
  
        Objects.gems = [];
        for(var i=0; i<4; i++){
          const gem = new Gem();
          gem.init(gemParameters[i]);
          Objects.gems.push(gem);
        }
  
        Objects.turquoise = new Turquoise();
        Objects.turquoise.init();
  
        // Adornments
        Objects.bee = new Bee();
        Objects.bee.init();
        
        Objects.squareRing = new SquareRing();
        Objects.squareRing.init();
  
        Objects.gemRing = new GemRing();
        Objects.gemRing.init();
  
        Objects.celticRing = new CelticRing();
        Objects.celticRing.init();
  
        Objects.cameoRing = new CameoRing();
        Objects.cameoRing.init();

        Objects.faceRing = new FaceRing();
        Objects.faceRing.init();
    
        Post.init();
  
        Listeners.init();
    }
    update(){
        this.transition(ringsState);
    }
    exit(){
    }
}
export let initState = new InitState();

class RingsState extends State{
    constructor(){
        super();
        this.id = 'ringsState'
    }
    enter(){
        for(var i=0; i<4; i++){
            Objects.dynamicRings[i].show();
        }

        Objects.celticRing.show();
    }
    update(){
        mainScene.update();

        for(var i=0; i<4; i++){
            Objects.dynamicRings[i].update();
        }

        Objects.celticRing.update();

        Post.update();
        //Renderer.update(mainScene, Cameras.mainCamera);
        //Renderer.update(gemBackFacingScene, Cameras.mainCamera);
    }
    exit(){
        for(var i=0; i<4; i++){
            Objects.dynamicRings[i].hide();
        }

        Objects.celticRing.hide();
    }
    click(event){
        if(event.x/window.innerWidth < 0.3 ){

        }else if(event.x/window.innerWidth > 0.7 ){
            this.transition(stonesState);
        }
    }
}
export let ringsState = new RingsState();

class StonesState extends State{
    enter(){
        for(var i=0; i<4; i++){
            Objects.gems[i].show();
        }

        Objects.turquoise.show();
    }
    update(){
        mainScene.update();

        for(var i=0; i<4; i++){
            Objects.gems[i].update();
        }

        Objects.turquoise.update();

        Post.update();
    }
    exit(){
        for(var i=0; i<4; i++){
            Objects.gems[i].hide();
        }

        Objects.turquoise.hide();
    }
    click(){     
        if(event.x/window.innerWidth < 0.3 ){
            this.transition(ringsState);
        }else if(event.x/window.innerWidth > 0.7 ){
            this.transition(ornamentsState);
        }
    }
}
export let stonesState = new StonesState();

class OrnamentsState extends State{
    enter(){
        Objects.bee.show();
        Objects.squareRing.show();
        Objects.gemRing.show();
        Objects.cameoRing.show();
        Objects.faceRing.show();
    }
    update(){        
        mainScene.update();

        Objects.bee.update();
        Objects.squareRing.update();
        Objects.gemRing.update();
        Objects.cameoRing.update();
        Objects.faceRing.update();
        Post.update();
    }
    exit(){
        Objects.bee.hide();
        Objects.squareRing.hide();
        Objects.gemRing.hide();
        Objects.cameoRing.hide();
        Objects.faceRing.hide();
    }
    click(){     
        if(event.x/window.innerWidth < 0.3 ){
            this.transition(stonesState);
        }else if(event.x/window.innerWidth > 0.7 ){
            
        }
    }
}
export let ornamentsState = new OrnamentsState();