class Config{
  constructor(){
    this.postEffects = {
      antialias: true,
      bloom: false,
      filmGrain: false,
      barrelDistortion: false,
      chromaticAberration: false,
      vignette: true,
      vignetteDarkness: 0.8
    }
  }
}

export default new Config();