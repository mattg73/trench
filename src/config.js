class Config{
  constructor(){
    this.postEffects = {
      antialias: false,
      bloom: false,
      filmGrain: false,
      barrelDistortion: false,
      chromaticAberration: false,
      vignette: false
    }
  }
}

export default new Config();