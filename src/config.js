class Config{
  constructor(){
    this.postEffects = {
      antialias: false,
      bloom: false,
      filmGrain: false,
      barrelDistortion: false,
      chromaticAberration: false,
      vignette: false,
      vignetteDarkness: 0.8
    }
  }
}

export default new Config();