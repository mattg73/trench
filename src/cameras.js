import { PerspectiveCamera, CubeCamera, Vector2 } from 'three';
import Timer from './timer';

class Cameras {
  init(){
    this.maxVelocity = 40
    this.maxAcceleration = 20
    this.velocity = new Vector2()
    this.acceleration = new Vector2()

    this.mainCamera = new PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 5000 );
    this.mainCamera.position.set( 0, 20, 10 );
    this.mainCamera.lookAt( 0, 20, 0 );

    this.cubeCamera = new CubeCamera(0.1, 1000, 256);
    this.cubeCamera.position.set(0, 0, 0);
  }
  update(){
    //const elapsed = Timer.getDelta();
    const elapsed = 1/60;

    this.velocity.add(this.acceleration);
    this.velocity.multiplyScalar(0.98);
    this.velocity.clampLength(0,this.maxVelocity);

    this.mainCamera.position.x += this.velocity.x * elapsed;
    this.mainCamera.position.y += this.velocity.y * elapsed;

    if(this.mainCamera.position.x < -17) this.mainCamera.position.x = -17;
    if(this.mainCamera.position.x > 17) this.mainCamera.position.x = 17;  
    if(this.mainCamera.position.y < 5) this.mainCamera.position.y = 5;
    if(this.mainCamera.position.y > 45) this.mainCamera.position.y = 45;  

    this.acceleration.multiplyScalar(0);
  }

  keyDown(event){
    switch(event.keyCode) {
      case 37:
        // left
        this.acceleration.x = -this.maxAcceleration;
        break;
      case 38:
        // up
        this.acceleration.y = this.maxAcceleration;
        break;
      case 39:
        // right
        this.acceleration.x = this.maxAcceleration;
        break;
      case 40:
        // down
        this.acceleration.y = -this.maxAcceleration;
        break;
      default:
        //code block
    } 
    
  }
};
export default new Cameras();