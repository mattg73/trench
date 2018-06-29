import {MeshStandardMaterial, MeshPhysicalMaterial, ShaderMaterial, Color} from 'three';
import * as gemFrontShader from './gemFront.glsl';
import * as gemBackShader from './gemBack.glsl';

const goldSRGB = new Color('rgb(255, 219, 145)');
const copperSRGB = new Color('rgb(250, 209, 194)');
const pearlSRGB = new Color('rgb(255, 255, 200)');
const diamondSRGB = new Color('rgb(255, 255, 254)');
const saphireSRGB = new Color('rgb(40, 40, 255)');

const goldLinear = goldSRGB.convertGammaToLinear();
const copperLinear = copperSRGB.convertGammaToLinear();
const pearlLinear = pearlSRGB.convertGammaToLinear();
const diamondLinear = diamondSRGB.convertGammaToLinear();
const saphireLinear = saphireSRGB.convertGammaToLinear();

let Materials;
const goldParams = {
  color: goldLinear,
  roughness: 0.5,
  metalness: 1,
}

const copperParams = {
  color: copperLinear,
  roughness: 0.2,
  metalness: 1,
}

const pearlParams = {
  color: pearlLinear,
  roughness: 0.7,
  metalness: 0.0,
}

const diamondParams = {
  color: diamondLinear,
  ior: 2.2,
  dispersion: 0.04
}

const saphireParams = {
  color: saphireLinear,
  ior: 1.76,
  dispersion: 0.01
}

const copperTextureParams = {
  roughness: 1,
  metalness: 1
}

const beeParams = {
  roughness: 1,
  metalness: 1
}

const squareRingParams = {
  roughness: 1,
  metalness: 1,
}

const gemRingMetalParams = {
  roughness: 1,
  metalness: 1,
}

const celticRingParams = {
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
    uDispersion: { type: "f", value: diamondParams.dispersion },
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
    uDispersion: { type: "f", value: diamondParams.dispersion },
    uColor: {type: "c", value: diamondParams.color}
  },
  vertexShader: gemBackShader.vertexShader,
  fragmentShader: gemBackShader.fragmentShader
}

const shaderSaphireFrontParams = {
  uniforms: {
    mRefractionRatio: { type: "f", value: 1/saphireParams.ior },
		mFresnelBias: { type: "f", value: 0.1 },
		mFresnelPower: { type: "f", value: 2.0 },
    mFresnelScale: { type: "f", value: 1.0 },
    uFaceDirection: { type: "f", value: 1.0 },
    tCube: { type: "t", value: null },
    uDispersion: { type: "f", value: saphireParams.dispersion },
    uColor: {type: "c", value: saphireParams.color}
  },
  vertexShader: gemFrontShader.vertexShader,
  fragmentShader: gemFrontShader.fragmentShader
}

const shaderSaphireBackParams = {
  uniforms: {
    mRefractionRatio: { type: "f", value: 1/saphireParams.ior },
		mFresnelBias: { type: "f", value: 0.1 },
		mFresnelPower: { type: "f", value: 2.0 },
    mFresnelScale: { type: "f", value: 1.0 },
    uFaceDirection: { type: "f", value: 1.0 },
    tCube: { type: "t", value: null },
    uDispersion: { type: "f", value: saphireParams.dispersion },
    uColor: {type: "c", value: saphireParams.color}
  },
  vertexShader: gemBackShader.vertexShader,
  fragmentShader: gemBackShader.fragmentShader
}

export default Materials = {
  gold: new MeshStandardMaterial(goldParams),
  copper: new MeshStandardMaterial(copperParams),
  pearl: new MeshPhysicalMaterial(pearlParams),
  copperTexture: new MeshStandardMaterial(copperTextureParams),
  bee: new MeshStandardMaterial(beeParams),
  squareRing: new MeshStandardMaterial(squareRingParams),
  gemRingMetal: new MeshStandardMaterial(gemRingMetalParams),
  celticRing: new MeshStandardMaterial(celticRingParams),
  shaderDiamondFront: new ShaderMaterial(shaderDiamondFrontParams),
  shaderDiamondBack: new ShaderMaterial(shaderDiamondBackParams),
  shaderSaphireFront: new ShaderMaterial(shaderSaphireFrontParams),
  shaderSaphireBack: new ShaderMaterial(shaderSaphireBackParams)
}
