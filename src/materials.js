import {MeshStandardMaterial, MeshPhysicalMaterial, ShaderMaterial, Color} from 'three';
import * as gemFrontShader from './gemFront.glsl';
import * as gemBackShader from './gemBack.glsl';

const goldSRGB = new Color('rgb(255, 219, 145)');
const copperSRGB = new Color('rgb(250, 209, 194)');
const silverSRGB = new Color('rgb(250, 247, 242)');
const platinumSRGB = new Color('rgb(213, 208, 200)');
const jadeSRGB = new Color('rgb(74, 140, 84))');
const pearlSRGB = new Color('rgb(255, 255, 200)');
const emeraldSRGB = new Color('rgb(10, 190, 110)');
const rubySRGB = new Color('rgb(200, 10, 80)');
const diamondSRGB = new Color('rgb(255, 255, 254)');
const demantoidSRGB = new Color('rgb(180, 210, 140)');
const saphireSRGB = new Color('rgb(40, 130, 180)');

const goldLinear = goldSRGB.convertGammaToLinear();
const copperLinear = copperSRGB.convertGammaToLinear();
const silverLinear = silverSRGB.convertGammaToLinear();
const platinumLinear = platinumSRGB.convertGammaToLinear();
const jadeLinear = jadeSRGB.convertGammaToLinear();
const pearlLinear = pearlSRGB.convertGammaToLinear();
const emeraldLinear = emeraldSRGB.convertGammaToLinear();
const rubyLinear = rubySRGB.convertGammaToLinear();
const diamondLinear = diamondSRGB.convertGammaToLinear();
const demantoidLinear = demantoidSRGB.convertGammaToLinear();
const saphireLinear = saphireSRGB.convertGammaToLinear();

let Materials;
const standardParams = {
  roughness: 1,
  metalness: 1
}

const goldParams = {
  color: goldLinear,
  roughness: 0.15,
  metalness: 1,
}

const copperParams = {
  color: copperLinear,
  roughness: 0.5,
  metalness: 1,
}

const silverParams = {
  color: silverLinear,
  roughness: 0.3,
  metalness: 1,
}

const platinumParams = {
  color: platinumLinear,
  roughness: 0.1,
  metalness: 1,
}

const jadeParams = {
  color: jadeLinear,
  roughness: 0.4,
  metalness: 0,
}

const emeraldParams = {
  color: emeraldLinear,
  ior: 1.58,
  dispersion: 0.014
}

const rubyParams = {
  color: rubyLinear,
  ior: 1.77,
  dispersion: 0.018
}

const diamondParams = {
  color: diamondLinear,
  ior: 2.418,
  dispersion: 0.044
}

const demantoidParams = {
  color: demantoidLinear,
  ior: 1.93,
  dispersion: 0.057
}

const saphireParams = {
  color: saphireLinear,
  ior: 1.777,
  dispersion: 0.018
}

const pearlParams = {
  color: pearlLinear,
  roughness: 0.7,
  metalness: 0.0,
}

const shaderEmeraldFrontParams = {
  uniforms: {
    mRefractionRatio: { type: "f", value: 1/emeraldParams.ior },
		mFresnelBias: { type: "f", value: 0.3 },
		mFresnelPower: { type: "f", value: 2.0 },
    mFresnelScale: { type: "f", value: 1.4 },
    uFaceDirection: { type: "f", value: 1.0 },
    tCube: { type: "t", value: null },
    uDispersion: { type: "f", value: emeraldParams.dispersion },
    uColor: {type: "c", value: emeraldParams.color}
  },
  vertexShader: gemFrontShader.vertexShader,
  fragmentShader: gemFrontShader.fragmentShader,
}

const shaderEmeraldBackParams = {
  uniforms: {
    mRefractionRatio: { type: "f", value: 1/emeraldParams.ior },
		mFresnelBias: { type: "f", value: 0.1 },
		mFresnelPower: { type: "f", value: 2.0 },
    mFresnelScale: { type: "f", value: 1.0 },
    uFaceDirection: { type: "f", value: -1.0 },
    tCube: { type: "t", value: null },
    uDispersion: { type: "f", value: emeraldParams.dispersion },
    uColor: {type: "c", value: emeraldParams.color}
  },
  vertexShader: gemBackShader.vertexShader,
  fragmentShader: gemBackShader.fragmentShader
}

const shaderRubyFrontParams = {
  uniforms: {
    mRefractionRatio: { type: "f", value: 1/rubyParams.ior },
		mFresnelBias: { type: "f", value: 0.3 },
		mFresnelPower: { type: "f", value: 2.0 },
    mFresnelScale: { type: "f", value: 1.4 },
    uFaceDirection: { type: "f", value: 1.0 },
    tCube: { type: "t", value: null },
    uDispersion: { type: "f", value: rubyParams.dispersion },
    uColor: {type: "c", value: rubyParams.color}
  },
  vertexShader: gemFrontShader.vertexShader,
  fragmentShader: gemFrontShader.fragmentShader,
}

const shaderRubyBackParams = {
  uniforms: {
    mRefractionRatio: { type: "f", value: 1/rubyParams.ior },
		mFresnelBias: { type: "f", value: 0.1 },
		mFresnelPower: { type: "f", value: 2.0 },
    mFresnelScale: { type: "f", value: 1.0 },
    uFaceDirection: { type: "f", value: -1.0 },
    tCube: { type: "t", value: null },
    uDispersion: { type: "f", value: rubyParams.dispersion },
    uColor: {type: "c", value: rubyParams.color}
  },
  vertexShader: gemBackShader.vertexShader,
  fragmentShader: gemBackShader.fragmentShader
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
    uFaceDirection: { type: "f", value: -1.0 },
    tCube: { type: "t", value: null },
    uDispersion: { type: "f", value: diamondParams.dispersion },
    uColor: {type: "c", value: diamondParams.color}
  },
  vertexShader: gemBackShader.vertexShader,
  fragmentShader: gemBackShader.fragmentShader
}

const shaderDemantoidFrontParams = {
  uniforms: {
    mRefractionRatio: { type: "f", value: 1/demantoidParams.ior },
		mFresnelBias: { type: "f", value: 0.3 },
		mFresnelPower: { type: "f", value: 2.0 },
    mFresnelScale: { type: "f", value: 1.4 },
    uFaceDirection: { type: "f", value: 1.0 },
    tCube: { type: "t", value: null },
    uDispersion: { type: "f", value: demantoidParams.dispersion },
    uColor: {type: "c", value: demantoidParams.color}
  },
  vertexShader: gemFrontShader.vertexShader,
  fragmentShader: gemFrontShader.fragmentShader,
}

const shaderDemantoidBackParams = {
  uniforms: {
    mRefractionRatio: { type: "f", value: 1/demantoidParams.ior },
		mFresnelBias: { type: "f", value: 0.1 },
		mFresnelPower: { type: "f", value: 2.0 },
    mFresnelScale: { type: "f", value: 1.0 },
    uFaceDirection: { type: "f", value: -1.0 },
    tCube: { type: "t", value: null },
    uDispersion: { type: "f", value: demantoidParams.dispersion },
    uColor: {type: "c", value: demantoidParams.color}
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
    uFaceDirection: { type: "f", value: -1.0 },
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
  silver: new MeshStandardMaterial(silverParams),
  platinum: new MeshStandardMaterial(platinumParams),
  jade: new MeshStandardMaterial(jadeParams),
  turquoise: new MeshStandardMaterial(standardParams),
  pearl: new MeshPhysicalMaterial(pearlParams),
  bee: new MeshStandardMaterial(standardParams),
  squareRing: new MeshStandardMaterial(standardParams),
  gemRingMetal: new MeshStandardMaterial(standardParams),
  celticRing: new MeshStandardMaterial(standardParams),
  cameoRing: new MeshStandardMaterial(standardParams),
  shaderEmeraldFront: new ShaderMaterial(shaderEmeraldFrontParams),
  shaderEmeraldBack: new ShaderMaterial(shaderEmeraldBackParams),
  shaderRubyFront: new ShaderMaterial(shaderRubyFrontParams),
  shaderRubyBack: new ShaderMaterial(shaderRubyBackParams),
  shaderDiamondFront: new ShaderMaterial(shaderDiamondFrontParams),
  shaderDiamondBack: new ShaderMaterial(shaderDiamondBackParams),
  shaderDemantoidFront: new ShaderMaterial(shaderDemantoidFrontParams),
  shaderDemantoidBack: new ShaderMaterial(shaderDemantoidBackParams),
  shaderSaphireFront: new ShaderMaterial(shaderSaphireFrontParams),
  shaderSaphireBack: new ShaderMaterial(shaderSaphireBackParams)
}
