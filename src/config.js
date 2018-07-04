import {NoToneMapping, LinearToneMapping, ReinhardToneMapping, Uncharted2ToneMapping, CineonToneMapping} from 'three';

class Config{
  constructor(){
    this.toneMapping = {
      type: Uncharted2ToneMapping,
      exposure: 1,
      whitePoint: 1
    }
    this.postEffects = {
      antialias: true,
      bloom: true,
      bloomStrength: 2.0, 
      bloomSize: 12, 
      bloomSigma: 32,
      bloomResolution: 256,
      filmGrain: false,
      barrelDistortion: false,
      chromaticAberration: false,
      vignette: false,
      vignetteDarkness: 0.9
    }

  }
}

export default new Config();