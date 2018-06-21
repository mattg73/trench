import {MeshStandardMaterial, ShaderMaterial, Color} from 'three';
import * as gemShader from './gem.glsl';

let Materials;
const goldParams = {
  color: new Color('rgb(255, 219, 145)'),
  roughness: 0.1,
  metalness: 1,
}

const diamondParams = {
  color: new Color(0xff0000),
  roughness: 0.01,
  metalness: 1,
  transparent: true,
  opacity: 0.5,
  refractionRatio: 1/2.2
}

const shaderDiamondParams = {
  uniforms: {
    mRefractionRatio: { type: "f", value: 1.02 },
		mFresnelBias: { type: "f", value: 0.1 },
		mFresnelPower: { type: "f", value: 2.0 },
		mFresnelScale: { type: "f", value: 1.0 },
    tCube: { type: "t", value: null },
    uColor: {type: "c", value: new Color('rgb(160, 50, 50)')}
  },
  vertexShader: gemShader.vertexShader,
  fragmentShader: gemShader.fragmentShader
}


export default Materials = {
  gold: new MeshStandardMaterial(goldParams),
  diamond: new MeshStandardMaterial(diamondParams),
  shaderDiamond: new ShaderMaterial(shaderDiamondParams)
}
