import Models from './models.js';
import {Textures, CubeTextures} from './textures.js'

let LoadQueues;
export default LoadQueues = {
  modelLoad: [
    Models.gem, Models.ring, Models.bee, Models.squareRing, Models.gemRing, Models.DRingBand
  ],
  textureLoad: [
    Textures.copperBaseColor, Textures.copperRoughness, Textures.copperNormal,
    Textures.beeBaseColor, Textures.beeRoughness, Textures.beeNormal, Textures.beeMetallic,
    Textures.squareRingBaseColor, Textures.squareRingRoughness, Textures.squareRingNormal, 
    Textures.gemRingBaseColor, Textures.gemRingRoughness, Textures.gemRingNormal,
    Textures.celticRingBaseColor, Textures.celticRingRoughness, Textures.celticRingNormal, Textures.celticRingMetallic
  ],
  cubeTextureLoad: [
    CubeTextures.envMapLDR, CubeTextures.envMapHDR,  
  ]
}