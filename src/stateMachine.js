import {loadState} from './states';

class StateMachine{
    init(){
        this.state = loadState;
        loadState.enter();
    }

    update(){
        this.state.update();
    }

    // Actions
    click(event){
        if(typeof this.state.click === 'function') this.state.click(event);
    }

    keyDown(event){
        if(typeof this.state.keyDown === 'function') this.state.keyDown(event);
    }
}
export default new StateMachine();

