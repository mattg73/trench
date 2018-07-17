import Models from './models.js';
import {Textures, CubeTextures} from './textures.js'

let LoadQueues;
export default LoadQueues = {
  modelLoad: [
    Models.prefab01, Models.prefab02, Models.prefab03, Models.prefab04, Models.prefab05
  ],
  textureLoad: [
    Textures.objectBaseColor, Textures.objectRoughness, Textures.objectNormal, Textures.objectMetallic,
  ],
  cubeTextureLoad: [
    CubeTextures.envMapLDR, CubeTextures.envMapHDR,  
  ]
}