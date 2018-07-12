import {MeshStandardMaterial, MeshPhysicalMaterial, ShaderMaterial, Color} from 'three';

const goldSRGB = new Color('rgb(255, 219, 145)');

const goldLinear = goldSRGB.convertGammaToLinear();

let Materials;
const standardParams = {
  roughness: 1,
  metalness: 1
}

export default Materials = {
  object: new MeshStandardMaterial(standardParams)
}
