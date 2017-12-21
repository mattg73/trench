import {WebGLRenderTarget, LinearFilter, RGBAFormat, Vector2} from 'three';
import {FXAAShader, VignetteShader} from 'three-addons';
import EffectComposer, {RenderPass, ShaderPass, CopyShader} from 'three-effectcomposer-es6';
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


    // Post-Processing Effects

    // Anti-aliasing
    if(config.postEffects.antialias === true){
      this.FXAAShader = new ShaderPass(FXAAShader);
      this.FXAAShader.uniforms.resolution.value = new Vector2(1 / window.innerWidth, 1 / window.innerHeight);
      this.mainComposer.addPass(this.FXAAShader);
      //this.mainComposer.addPass(this.copyPass);
    }

    // Bloom
    if(config.postEffects.bloom === true){
      this.highPass = new ShaderPass(HighPassShader);

      this.hBlur = new ShaderPass(HorizontalBlurShader);
      this.hBlur.uniforms.h.value = 2 / window.innerWidth;

      this.vBlur = new ShaderPass(VerticalBlurShader);
      this.vBlur.uniforms.v.value = 2 / window.innerHeight;
    
      this.additiveBlend = new ShaderPass(AdditiveBlendShader);
      this.additiveBlend.renderToScreen = true;
    
      this.bloomComposer = new EffectComposer(renderer, renderTarget2);
      this.bloomComposer.setSize(window.innerWidth, window.innerHeight);
      this.bloomComposer.addPass(this.renderPass);
      this.bloomComposer.addPass(this.highPass);
      this.bloomComposer.addPass(this.hBlur);
      this.bloomComposer.addPass(this.vBlur);

      this.additiveBlend.uniforms[ 'tDiffuse1' ].value = this.mainComposer.renderTarget;
      this.additiveBlend.uniforms[ 'tDiffuse2' ].value = this.bloomComposer.renderTarget2;
      this.additiveBlend.uniforms[ 'blend' ].value = 1;
      this.mainComposer.addPass( additiveBlend );
    }

    // Vignette
    if(config.postEffects.vignette === true){
      this.vignetteShader = new ShaderPass(VignetteShader);
      this.vignetteShader.uniforms.darkness.value = 0.8;
      this.mainComposer.addPass(this.vignetteShader);
      //this.mainComposer.addPass(this.copyPass);
    }

    // Copy to screen
    
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