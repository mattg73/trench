import {sRGBEncoding, LinearEncoding} from 'three';
const texturePath = './assets/textures/';

export let Textures = {
  turquoiseBaseColor: {
    url: texturePath+'Turquoise_BaseColor.png',
    encoding: sRGBEncoding,
    data: null
  },
  turquoiseRoughness: {
    url: texturePath+'Turquoise_Roughness.png',
    encoding: LinearEncoding,
    data: null
  },
  turquoiseNormal: {
    url: texturePath+'Turquoise_Normal.png',
    encoding: LinearEncoding,
    data: null
  },
  turquoiseMetallic: {
    url: texturePath+'Turquoise_Metallic.png',
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
  },
  cameoRingBaseColor: {
    url: texturePath+'Cameo_BaseColor.png',
    encoding: sRGBEncoding,
    data: null
  },
  cameoRingRoughness: {
    url: texturePath+'Cameo_Roughness.png',
    encoding: LinearEncoding,
    data: null
  },
  cameoRingNormal: {
    url: texturePath+'Cameo_Normal_DirectX.png',
    encoding: LinearEncoding,
    data: null
  },
  cameoRingMetallic: {
    url: texturePath+'Cameo_Metallic.png',
    encoding: LinearEncoding,
    data: null
  },
  faceRingBaseColor: {
    url: texturePath+'Face_BaseColor.png',
    encoding: sRGBEncoding,
    data: null
  },
  faceRingRoughness: {
    url: texturePath+'Face_Roughness.png',
    encoding: LinearEncoding,
    data: null
  },
  faceRingNormal: {
    url: texturePath+'Face_Normal.png',
    encoding: LinearEncoding,
    data: null
  },
  faceRingMetallic: {
    url: texturePath+'Face_Metallic.png',
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