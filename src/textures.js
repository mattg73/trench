import {sRGBEncoding, LinearEncoding} from 'three';
const texturePath = './assets/textures/';

export let Textures = {
  copperBaseColor: {
    url: texturePath+'Copper_BaseColor.png',
    encoding: sRGBEncoding,
    data: null
  },
  copperRoughness: {
    url: texturePath+'Copper_Roughness.png',
    encoding: LinearEncoding,
    data: null
  },
  copperNormal: {
    url: texturePath+'Copper_Normal.png',
    encoding: LinearEncoding,
    data: null
  },
  beeBaseColor: {
    url: texturePath+'bee_BaseColor.png',
    encoding: sRGBEncoding,
    data: null
  },
  beeRoughness: {
    url: texturePath+'bee_Roughness.png',
    encoding: LinearEncoding,
    data: null
  },
  beeNormal: {
    url: texturePath+'bee_Normal.png',
    encoding: LinearEncoding,
    data: null
  },
  beeMetallic: {
    url: texturePath+'bee_Metallic.png',
    encoding: LinearEncoding,
    data: null
  },
  squareRingBaseColor: {
    url: texturePath+'SquareStone_BaseColor.png',
    encoding: sRGBEncoding,
    data: null
  },
  squareRingRoughness: {
    url: texturePath+'SquareStone_Roughness.png',
    encoding: LinearEncoding,
    data: null
  },
  squareRingNormal: {
    url: texturePath+'SquareStone_Normal_DirectX.png',
    encoding: LinearEncoding,
    data: null
  },
  gemRingBaseColor: {
    url: texturePath+'GemRing_BaseColor.png',
    encoding: sRGBEncoding,
    data: null
  },
  gemRingRoughness: {
    url: texturePath+'GemRing_Roughness.png',
    encoding: LinearEncoding,
    data: null
  },
  gemRingNormal: {
    url: texturePath+'GemRing_Normal_DirectX.png',
    encoding: LinearEncoding,
    data: null
  },
  celticRingBaseColor: {
    url: texturePath+'Celtic_BaseColor.png',
    encoding: sRGBEncoding,
    data: null
  },
  celticRingRoughness: {
    url: texturePath+'Celtic_Roughness.png',
    encoding: LinearEncoding,
    data: null
  },
  celticRingNormal: {
    url: texturePath+'Celtic_Normal_DirectX.png',
    encoding: LinearEncoding,
    data: null
  },
  celticRingMetallic: {
    url: texturePath+'Celtic_Metallic.png',
    encoding: LinearEncoding,
    data: null
  }
};

const envMapPath = './assets/textures/env-maps/'
export let CubeTextures = {
  envMapHDR: {
    urlArray: [
      envMapPath+'x-pos.hdr',
      envMapPath+'x-neg.hdr',
      envMapPath+'y-pos.hdr',
      envMapPath+'y-neg.hdr',
      envMapPath+'z-pos.hdr',
      envMapPath+'z-neg.hdr'
    ],
    type:'hdr',
    data: null
  },
  envMapLDR: {
    urlArray: [
      envMapPath+'x-pos.png',
      envMapPath+'x-neg.png',
      envMapPath+'y-pos.png',
      envMapPath+'y-neg.png',
      envMapPath+'z-pos.png',
      envMapPath+'z-neg.png'
    ],
    type:'ldr',
    data: null
  }
};