import {WebGLRenderer, Color, PCFSoftShadowMap} from 'three';
import Debug from './debug';
import Config from './config';

class Renderer extends WebGLRenderer{
  constructor(){
    super({antialias:false});
  }

  init(){
    this.setSize( window.innerWidth, window.innerHeight );

    this.shadowMap.enabled = true;
    this.shadowMap.type = PCFSoftShadowMap;

    //this.gammaInput = false; //deprecated
    this.gammaFactor = 2.2;
    this.gammaOutput = true;

    this.toneMapping = Config.toneMapping.type;
    this.toneMappingExposure = Config.toneMapping.exposure;
    this.toneMappingWhitePoint = Config.toneMapping.whitePoint;

    document.body.appendChild( this.domElement );

    const toneMappingFolder = Debug.postProcessing.addFolder('Tone Mapping');
    toneMappingFolder.add(this, 'toneMappingExposure', 0, 5);
    toneMappingFolder.add(this, 'toneMappingWhitePoint', 0, 5);

  }

  update(scene, camera){
    this.render(scene, camera);
  }
}
export default new Renderer();