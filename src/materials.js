import {MeshStandardMaterial, ShaderMaterial, Color} from 'three';
import * as gemFrontShader from './gemFront.glsl';
import * as gemBackShader from './gemBack.glsl';

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

const shaderDiamondFrontParams = {
  uniforms: {
    mRefractionRatio: { type: "f", value: 1/2.2 },
		mFresnelBias: { type: "f", value: 0.3 },
		mFresnelPower: { type: "f", value: 2.0 },
    mFresnelScale: { type: "f", value: 1.4 },
    uFaceDirection: { type: "f", value: 1.0 },
    tCube: { type: "t", value: null },
    uColor: {type: "c", value: new Color('rgb(255, 255, 255)')}
  },
  vertexShader: gemFrontShader.vertexShader,
  fragmentShader: gemFrontShader.fragmentShader,
}

const shaderDiamondBackParams = {
  uniforms: {
    mRefractionRatio: { type: "f", value: 1/2.2 },
		mFresnelBias: { type: "f", value: 0.1 },
		mFresnelPower: { type: "f", value: 2.0 },
    mFresnelScale: { type: "f", value: 1.0 },
    uFaceDirection: { type: "f", value: 1.0 },
    tCube: { type: "t", value: null },
    uColor: {type: "c", value: new Color('rgb(255, 255, 255)')}
  },
  vertexShader: gemBackShader.vertexShader,
  fragmentShader: gemBackShader.fragmentShader
}


export default Materials = {
  gold: new MeshStandardMaterial(goldParams),
  diamond: new MeshStandardMaterial(diamondParams),
  shaderDiamondFront: new ShaderMaterial(shaderDiamondFrontParams),
  shaderDiamondBack: new ShaderMaterial(shaderDiamondBackParams)
}
