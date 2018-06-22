import {WebGLRenderTarget, LinearFilter, RGBAFormat, Vector2, ShaderMaterial, UniformsUtils, AdditiveBlending} from 'three';
import {FXAAShader, VignetteShader, BloomPass, ConvolutionShader} from 'three-addons';
import EffectComposer, {RenderPass, ShaderPass, CopyShader} from 'three-effectcomposer-es6';
import * as CompositeShader from './composite.glsl';
//import UnrealBloomPass from './libs/postprocessing/UnrealBloomPass';
import config from './config';


export default class Post{
  init(renderer, mainScene, gemBackFacingScene, gemFrontFacingScene, mainCamera){

    this.renderer = renderer;
    this.renderer.autoClear = false;

    // Parameters
    this.renderTargetParameters = { minFilter: LinearFilter, magFilter: LinearFilter, format: RGBAFormat, stencilBuffer: false };
    
    // Render Targets
    this.renderTargetEnvironment = new WebGLRenderTarget( window.innerWidth, window.innerHeight, this.renderTargetParameters );
    this.renderTargetGemBack = new WebGLRenderTarget( window.innerWidth, window.innerHeight, this.renderTargetParameters );
    this.renderTargetGemFront = new WebGLRenderTarget( window.innerWidth, window.innerHeight, this.renderTargetParameters );
    this.renderTargetMain = new WebGLRenderTarget( window.innerWidth, window.innerHeight, this.renderTargetParameters );

    // Composers
    this.environmentComposer = new EffectComposer(renderer, this.renderTargetEnvironment);
    this.gemBackComposer = new EffectComposer(renderer, this.renderTargetGemBack)
    this.gemFrontComposer = new EffectComposer(renderer, this.renderTargetGemFront)
    this.mainComposer = new EffectComposer(renderer, this.renderTargetMain);

    // Init Passes
    this.copyPass = new ShaderPass(CopyShader);
    this.copyPass.renderToScreen = true;

    this.environmentRenderPass = new RenderPass(mainScene, mainCamera);
    this.gemBackRenderPass = new RenderPass(gemBackFacingScene, mainCamera);
    this.gemFrontRenderPass = new RenderPass(gemFrontFacingScene, mainCamera);

    // Init Composite Uniforms
    const compositeParams = {
      uniforms: {
        tEnvironment: { type: "t", value: this.environmentComposer.renderTarget2 },
        tGemBackFacing: { type: "t", value: this.gemBackComposer.renderTarget2 },
        tGemFrontFacing: { type: "t", value: this.gemFrontComposer.renderTarget2 },
      },
      vertexShader: CompositeShader.vertexShader,
      fragmentShader: CompositeShader.fragmentShader
    }

    this.compositeMaterial = new ShaderMaterial(compositeParams);
    this.compositePass = new ShaderPass(this.compositeMaterial);

    // Add Passes
    this.environmentComposer.addPass(this.environmentRenderPass);
    this.environmentComposer.addPass(this.copyPass);
    this.gemBackComposer.addPass(this.gemBackRenderPass);
    this.gemBackComposer.addPass(this.copyPass);
    this.gemFrontComposer.addPass(this.gemFrontRenderPass);
    this.gemFrontComposer.addPass(this.copyPass);

    this.mainComposer.addPass(this.compositePass);
    this.mainComposer.addPass(this.copyPass);


    // Post-Processing Effects

    // Anti-aliasing
    if(config.postEffects.antialias === true){
      //this.FXAAShader = new ShaderPass(FXAAShader);
      //this.FXAAShader.uniforms.resolution.value = new Vector2(1 / window.innerWidth, 1 / window.innerHeight);
      //this.mainComposer.addPass(this.FXAAShader);
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
      //this.vignetteShader = new ShaderPass(VignetteShader);
      //this.vignetteShader.uniforms.darkness.value = config.postEffects.vignetteDarkness;
      //this.mainComposer.addPass(this.vignetteShader);
    }
  

    // Copy to screen
    //this.mainComposer.addPass(this.copyPass);
  }



  update(delta){
    this.environmentComposer.render(delta);
    this.gemBackComposer.render(delta);
    this.gemFrontComposer.render(delta);
    this.mainComposer.render(delta);
  }
}