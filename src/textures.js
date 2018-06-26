const texturePath = './assets/textures/';

export let Textures = {
  envMapStudio: {
    url: texturePath+'envMapPanorama.png'
  },
  squareRingBaseColor: {
    url: texturePath+'SquareStone_Base_Color.png'
  },
  squareRingRoughness: {
    url: texturePath+'SquareStone_Roughness.png'
  },
  squareRingNormal: {
    url: texturePath+'SquareStone_Normal_DirectX.png'
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
    ]
  }
};