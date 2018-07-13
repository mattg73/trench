import {WebGLRenderTarget, LinearFilter, RGBAFormat, Vector2, ShaderMaterial, UniformsUtils, AdditiveBlending} from 'three';
import {FXAAShader, VignetteShader, BloomPass, ConvolutionShader} from 'three-addons';
import EffectComposer, {RenderPass, ShaderPass, CopyShader} from 'three-effectcomposer-es6';
import Debug from './debug';
import Renderer from './renderer';
import Cameras from './cameras';
import {mainScene, gemBackFacingScene} from './scenes'; 
import * as CompositeShader from './composite.glsl';
//import UnrealBloomPass from './libs/postprocessing/UnrealBloomPass';
import config from './config';


class Post{
  init(){

    Renderer.autoClear = false;

    // Compositing

    // Parameters
    this.renderTargetParameters = { minFilter: LinearFilter, magFilter: LinearFilter, format: RGBAFormat, stencilBuffer: false };
    
    // Render Targets
    this.renderTargetEnvironment = new WebGLRenderTarget( window.innerWidth, window.innerHeight, this.renderTargetParameters );
    this.renderTargetGemBack = new WebGLRenderTarget( window.innerWidth, window.innerHeight, this.renderTargetParameters );
    this.renderTargetMain = new WebGLRenderTarget( window.innerWidth, window.innerHeight, this.renderTargetParameters );

    // Composers
    this.environmentComposer = new EffectComposer(Renderer, this.renderTargetEnvironment);
    this.gemBackComposer = new EffectComposer(Renderer, this.renderTargetGemBack);
    this.mainComposer = new EffectComposer(Renderer, this.renderTargetMain);

    // Init Passes
    this.copyPass = new ShaderPass(CopyShader);
    this.copyPass.renderToScreen = true;

    //this.environmentRenderPass = new RenderPass(mainScene, Cameras.mainCamera);
    //this.gemBackRenderPass = new RenderPass(gemBackFacingScene, Cameras.mainCamera);
    this.mainRenderPass = new RenderPass(mainScene, Cameras.mainCamera);

    // Init Composite Uniforms
    /*
    const compositeParams = {
      uniforms: {
        tEnvironment: { type: "t", value: this.environmentComposer.renderTarget2 },
        tGemBackFacing: { type: "t", value: this.gemBackComposer.renderTarget2 }
      },
      vertexShader: CompositeShader.vertexShader,
      fragmentShader: CompositeShader.fragmentShader
    }

    this.compositeMaterial = new ShaderMaterial(compositeParams);
    this.compositePass = new ShaderPass(this.compositeMaterial);
    */
    

    // Add Passes
    /*
    this.environmentComposer.addPass(this.environmentRenderPass);
    this.environmentComposer.addPass(this.copyPass);
    
    this.gemBackComposer.addPass(this.gemBackRenderPass);
    this.gemBackComposer.addPass(this.copyPass);

    this.mainComposer.addPass(this.compositePass);
    */

    this.mainComposer.addPass(this.mainRenderPass);
    

    // Post-Processing Effects

    // Anti-aliasing
    if(config.postEffects.antialias === true){
      this.FXAAShader = new ShaderPass(FXAAShader);
      this.FXAAShader.uniforms.resolution.value = new Vector2(window.innerWidth, window.innerHeight);
      this.mainComposer.addPass(this.FXAAShader);

      const AAFolder = Debug.postProcessing.addFolder('FXAA');
      AAFolder.add(this.FXAAShader, 'enabled');
    }

    // AO

    // Screen Space Reflection

    // Depth Of Field

    // Motion Blur

    // Eye Adaption

    // Bloom
    if(config.postEffects.bloom === true){
      // Parameters: strength, kernelSize, sigma, resolution
      this.bloomPass = new BloomPass(
        config.postEffects.bloomStrength, 
        config.postEffects.bloomSize, 
        config.postEffects.bloomSigma,
        config.postEffects.bloomResolution,
      );

      this.mainComposer.addPass( this.bloomPass );

      const BloomFolder = Debug.postProcessing.addFolder('Bloom');
      BloomFolder.add(this.bloomPass, 'enabled');
    }
  
    // Color Grade

    // Chromatic Aberration

    // Grain

    // Vignette
    if(config.postEffects.vignette === true){
      this.vignetteShader = new ShaderPass(VignetteShader);
      this.vignetteShader.uniforms.darkness.value = config.postEffects.vignetteDarkness;
      this.mainComposer.addPass(this.vignetteShader);

      const VignetteFolder = Debug.postProcessing.addFolder('Vignette');
      VignetteFolder.add(this.vignetteShader, 'enabled');
      VignetteFolder.add(this.vignetteShader.uniforms.darkness, 'value', -1, 1);
    }
  
    // Copy to screen
    this.mainComposer.addPass(this.copyPass);
  }

  update(){
    this.environmentComposer.render();
    this.gemBackComposer.render();
    this.mainComposer.render();
  }

  setSize( width, height ){
    
    this.environmentComposer.setSize( width , height );
    this.gemBackComposer.setSize( width, height );
    this.mainComposer.setSize( width, height );

    this.environmentComposer.renderTarget2.viewport.z = width;
    this.environmentComposer.renderTarget2.viewport.w = height;

    this.gemBackComposer.renderTarget2.viewport.z = width;
    this.gemBackComposer.renderTarget2.viewport.w = height;

    this.mainComposer.renderTarget2.viewport.z = width;
    this.mainComposer.renderTarget2.viewport.w = height;

    //this.mainComposer.passes[0].uniforms.tEnvironment.value = this.renderTargetEnvironment
    //this.mainComposer.passes[0].uniforms.tGemBackFacing.value = this.renderTargetGemBack.texture

    if(config.postEffects.antialias === true){
      this.FXAAShader.uniforms.resolution.value.set( window.innerWidth, window.innerHeight )
    }
    
  }
}
export default new Post();