class Config{
  constructor(){
    this.postEffects = {
      antialias: true,
      bloom: true,
      filmGrain: false,
      barrelDistortion: false,
      chromaticAberration: false,
      vignette: true,
      vignetteDarkness: 0.9
    }
  }
}

export default new Config();