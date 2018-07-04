import {loadState} from './states';

class StateMachine{
    init(){
        this.state = loadState;
        loadState.enter();
    }
    update(){
        this.state.update();
    }
    click(){
        if(typeof this.state.click === 'function') this.state.click();
    }
}
export default new StateMachine();

