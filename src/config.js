class Config{
  constructor(){
    this.postEffects = {
      antialias: false,
      bloom: false,
      filmGrain: false,
      barrelDistortion: false,
      chromaticAberration: false,
      vignette: true,
      vignetteDarkness: 0.6
    }
  }
}

export default new Config();