import Models from './models.js';
import {Textures, CubeTextures} from './textures.js'

let LoadQueues;
export default LoadQueues = {
  modelLoad: [
    Models.emerald, Models.oval, Models.gem, Models.pear, Models.dome, Models.bee, 
    Models.squareRing, Models.gemRing, Models.DRingBand, Models.cameoRing, Models.faceRing
  ],
  textureLoad: [
    Textures.turquoiseBaseColor, Textures.turquoiseRoughness, Textures.turquoiseNormal, Textures.turquoiseMetallic,
    Textures.beeBaseColor, Textures.beeRoughness, Textures.beeNormal, Textures.beeMetallic,
    Textures.squareRingBaseColor, Textures.squareRingRoughness, Textures.squareRingNormal, 
    Textures.gemRingBaseColor, Textures.gemRingRoughness, Textures.gemRingNormal,
    Textures.celticRingBaseColor, Textures.celticRingRoughness, Textures.celticRingNormal, Textures.celticRingMetallic,
    Textures.cameoRingBaseColor, Textures.cameoRingRoughness, Textures.cameoRingNormal, Textures.cameoRingMetallic,
    Textures.faceRingBaseColor, Textures.faceRingRoughness, Textures.faceRingNormal, Textures.faceRingMetallic
  ],
  cubeTextureLoad: [
    CubeTextures.envMapLDR, CubeTextures.envMapHDR,  
  ]
}