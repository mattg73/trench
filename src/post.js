import {WebGLRenderTarget, LinearFilter, RGBAFormat, Vector2, ShaderMaterial, UniformsUtils, AdditiveBlending} from 'three';
import {FXAAShader, VignetteShader, BloomPass, ConvolutionShader} from 'three-addons';
import EffectComposer, {RenderPass, ShaderPass, CopyShader} from 'three-effectcomposer-es6';
//import UnrealBloomPass from './libs/postprocessing/UnrealBloomPass';
import config from './config';


export default class Post{
  init(renderer, scene, camera){

    this.renderer = renderer;
    this.renderTargetParameters = { minFilter: LinearFilter, magFilter: LinearFilter, format: RGBAFormat, stencilBuffer: false };

    // Render Targets
    this.renderTargetMain = new WebGLRenderTarget( window.innerWidth, window.innerHeight, this.renderTargetParameters );
    
    // Composers
    this.mainComposer = new EffectComposer(renderer, this.renderTargetMain);

    // Init Passes
    this.copyPass = new ShaderPass(CopyShader);
    this.copyPass.renderToScreen = true;

	  // Add Passes
    //this.environmentComposer.addPass(this.environmentRenderPass);
    //this.environmentComposer.addPass(this.effectCopy);
    //this.objectComposer.addPass(this.objectRenderPass);
    //this.objectComposer.addPass(this.effectCopy);

    //this.compositePasses.uniforms[ 'tEnvironment' ].value = this.environmentComposer.renderTarget1;
    //this.compositePasses.uniforms[ 'tObject' ].value = this.objectComposer.renderTarget1;

    //this.mainComposer.addPass(this.compositePasses);

    //this.mainComposer.addPass(this.mainRenderPass);
    this.mainComposer.addPass(new RenderPass(scene, camera));


    // Post-Processing Effects

    // Anti-aliasing
    if(config.postEffects.antialias === true){
      this.FXAAShader = new ShaderPass(FXAAShader);
      this.FXAAShader.uniforms.resolution.value = new Vector2(1 / window.innerWidth, 1 / window.innerHeight);
      this.mainComposer.addPass(this.FXAAShader);
    }

    // AO

    // Screen Space Reflection

    // Depth Of Field

    // Motion Blur

    // Eye Adaption

    // Bloom
    /*
    if(config.postEffects.bloom === true){
      this.bloomPass = new ShaderPass(BloomPass);
      //this.bloomPass.uniforms.

      console.log(this.bloomPass.uniforms);

      this.mainComposer.addPass( this.bloomPass );
    }
    */

    // Color Grade

    // Chromatic Aberration

    // Grain

    // Vignette
    if(config.postEffects.vignette === true){
      this.vignetteShader = new ShaderPass(VignetteShader);
      this.vignetteShader.uniforms.darkness.value = config.postEffects.vignetteDarkness;
      this.mainComposer.addPass(this.vignetteShader);
    }
  

    // Copy to screen
    this.mainComposer.addPass(this.copyPass);
  }

  addRenderPass(scene, camera){
      //const target = new WebGLRenderTarget( window.innerWidth, window.innerHeight, this.renderTargetParameters );
      //const composer = new EffectComposer(this.renderer, target);
      //composer.setSize(window.innerWidth, window.innerHeight);

      this.mainComposer.addPass(new RenderPass(scene, camera));
      this.mainComposer.addPass(this.copyPass);
  }

  update(delta){
    this.mainComposer.render(delta);
  }
}