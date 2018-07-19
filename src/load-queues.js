import Models from './models.js';
import {Textures, CubeTextures} from './textures.js'

let LoadQueues;
export default LoadQueues = {
  modelLoad: [
    Models.prefab01, Models.prefab02, Models.prefab03, Models.prefab04, Models.prefab05, Models.lazer, Models.bolt, Models.obstacle
  ],
  textureLoad: [
    Textures.prefab1Bake, Textures.prefab2Bake, Textures.prefab3Bake, Textures.prefab4Bake, Textures.prefab5Bake, Textures.boltRed, Textures.obstacleHigh, Textures.obstacleMid, Textures.obstacleLow
  ],
  cubeTextureLoad: [
    CubeTextures.envMapLDR, CubeTextures.envMapHDR,  
  ]
}