import Models from './models.js';
import {Textures, CubeTextures} from './textures.js'

let LoadQueues;
export default LoadQueues = {
  modelLoad: [
    Models.object
  ],
  textureLoad: [
    Textures.objectBaseColor, Textures.objectRoughness, Textures.objectNormal, Textures.objectMetallic,
  ],
  cubeTextureLoad: [
    CubeTextures.envMapLDR, CubeTextures.envMapHDR,  
  ]
}