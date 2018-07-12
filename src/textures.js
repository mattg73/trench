import {sRGBEncoding, LinearEncoding} from 'three';
const texturePath = './assets/textures/';

export let Textures = {
  objectBaseColor: {
    url: texturePath+'Object_BaseColor.png',
    encoding: sRGBEncoding,
    data: null
  },
  objectRoughness: {
    url: texturePath+'Object_Roughness.png',
    encoding: LinearEncoding,
    data: null
  },
  objectNormal: {
    url: texturePath+'Object_Normal.png',
    encoding: LinearEncoding,
    data: null
  },
  objectMetallic: {
    url: texturePath+'Object_Metallic.png',
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