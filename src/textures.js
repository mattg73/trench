const texturePath = './assets/textures/';

export let Textures = {
  squareRingBaseColor: {
    url: texturePath+'SquareStone_Base_Color.png',
    data: null
  },
  squareRingRoughness: {
    url: texturePath+'SquareStone_Roughness.png',
    data: null
  },
  squareRingNormal: {
    url: texturePath+'SquareStone_Normal_DirectX.png',
    data: null
  },
  gemRingBaseColor: {
    url: texturePath+'GemRing_Base_Color.png',
    data: null
  },
  gemRingRoughness: {
    url: texturePath+'GemRing_Roughness.png',
    data: null
  },
  gemRingNormal: {
    url: texturePath+'GemRing_Normal_DirectX.png',
    data: null
  }
};

export let CubeTextures = {
  envMapStudio: {
    urlArray: [
      'x-pos.png',
      'x-neg.png',
      'y-pos.png',
      'y-neg.png',
      'z-pos.png',
      'z-neg.png',
    ],
    data: null
  }
};