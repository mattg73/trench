import {MeshStandardMaterial, MeshPhysicalMaterial, ShaderMaterial, UniformsUtils, Color} from 'three';
import * as gemFrontShader from './gemFront.glsl';
import * as gemBackShader from './gemBack.glsl';

let Materials;
const goldParams = {
  color: new Color('rgb(255, 219, 145)'),
  roughness: 0.5,
  metalness: 1,
}

const copperParams = {
  color: new Color('rgb(250, 209, 194)'),
  roughness: 0.1,
  metalness: 1,
}

const pearlParams = {
  color: new Color('rgb(255, 255, 200)'),
  roughness: 0.7,
  metalness: 0.0,
}

const diamondParams = {
  color: new Color('rgb(255, 255, 255)'),
  ior: 2.2
}

const saphireParams = {
  color: new Color('rgb(255, 0, 255)'),
  ior: 2.2
}

const squareRingParams = {
  roughness: 1,
  metalness: 1,
}

const gemRingMetalParams = {
  roughness: 1,
  metalness: 1,
}



const shaderDiamondFrontParams = {
  uniforms: {
    mRefractionRatio: { type: "f", value: 1/diamondParams.ior },
		mFresnelBias: { type: "f", value: 0.3 },
		mFresnelPower: { type: "f", value: 2.0 },
    mFresnelScale: { type: "f", value: 1.4 },
    uFaceDirection: { type: "f", value: 1.0 },
    tCube: { type: "t", value: null },
    uColor: {type: "c", value: diamondParams.color}
  },
  vertexShader: gemFrontShader.vertexShader,
  fragmentShader: gemFrontShader.fragmentShader,
}

const shaderDiamondBackParams = {
  uniforms: {
    mRefractionRatio: { type: "f", value: 1/diamondParams.ior },
		mFresnelBias: { type: "f", value: 0.1 },
		mFresnelPower: { type: "f", value: 2.0 },
    mFresnelScale: { type: "f", value: 1.0 },
    uFaceDirection: { type: "f", value: 1.0 },
    tCube: { type: "t", value: null },
    uColor: {type: "c", value: diamondParams.color}
  },
  vertexShader: gemBackShader.vertexShader,
  fragmentShader: gemBackShader.fragmentShader
}

const shaderSaphireBackParams = {
  uniforms: {
    mRefractionRatio: { type: "f", value: 1/saphireParams.ior },
		mFresnelBias: { type: "f", value: 0.1 },
		mFresnelPower: { type: "f", value: 2.0 },
    mFresnelScale: { type: "f", value: 1.0 },
    uFaceDirection: { type: "f", value: 1.0 },
    tCube: { type: "t", value: null },
    uColor: {type: "c", value: saphireParams.color}
  },
  vertexShader: gemBackShader.vertexShader,
  fragmentShader: gemBackShader.fragmentShader
}


export default Materials = {
  gold: new MeshStandardMaterial(goldParams),
  copper: new MeshStandardMaterial(copperParams),
  pearl: new MeshPhysicalMaterial(pearlParams),
  squareRing: new MeshStandardMaterial(squareRingParams),
  gemRingMetal: new MeshStandardMaterial(gemRingMetalParams),
  shaderDiamondFront: new ShaderMaterial(shaderDiamondFrontParams),
  shaderDiamondBack: new ShaderMaterial(shaderDiamondBackParams),
  shaderSaphireBack: new ShaderMaterial(shaderSaphireBackParams)
}
