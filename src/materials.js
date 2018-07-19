import {MeshBasicMaterial, MeshStandardMaterial, MeshPhysicalMaterial, ShaderMaterial, Color} from 'three';

const goldSRGB = new Color('rgb(255, 219, 145)');

const goldLinear = goldSRGB.convertGammaToLinear();

let Materials;
const basicParams =  {
}

const standardParams = {
  roughness: 1,
  metalness: 1
}

const lazerParams = {
  color: new Color('rgb(235, 235, 235)'),
  roughness: 0.7,
  metalness: 0
}

const obstacleParams = {
  color: new Color('rgb(200, 200, 200)'),
  roughness: 0.7,
  metalness: 0
}

export default Materials = {
  prefab1: new MeshBasicMaterial(basicParams),
  prefab2: new MeshBasicMaterial(basicParams),
  prefab3: new MeshBasicMaterial(basicParams),
  prefab4: new MeshBasicMaterial(basicParams),
  prefab5: new MeshBasicMaterial(basicParams),
  lazer: new MeshStandardMaterial(lazerParams),
  boltRed: new MeshBasicMaterial(basicParams),
  obstacle: new MeshStandardMaterial(obstacleParams   ),
}  
