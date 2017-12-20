import {WebGLRenderTarget, LinearFilter, RGBAFormat} from 'three';
import {VignetteShader} from 'three-addons';
import EffectComposer, {RenderPass, ShaderPass, CopyShader} from 'three-effectcomposer-es6';

export default class Post{
  init(renderer, scene, camera){

    this.renderTargetParameters = { minFilter: LinearFilter, magFilter: LinearFilter, format: RGBAFormat, stencilBuffer: false };

    // Render Targets
    //this.renderTargetEnvironment = new WebGLRenderTarget( window.innerWidth, window.innerHeight, this.renderTargetParameters );
    //this.renderTargetObject = new WebGLRenderTarget( window.innerWidth, window.innerHeight, this.renderTargetParameters );
    this.renderTargetMain = new WebGLRenderTarget( window.innerWidth, window.innerHeight, this.renderTargetParameters );
   
    
    // Composers
    //this.environmentComposer = new EffectComposer(renderer, renderTargetEnvironment);
    //this.environmentComposer.setSize(window.innerWidth, window.innerHeight);

    //this.objectComposer = new EffectComposer(renderer, renderTargetObject);
    //this.objectComposer.setSize(window.innerWidth, window.innerHeight);

    this.mainComposer = new EffectComposer(renderer, this.renderTargetMain);

    //this.bloomComposer = new EffectComposer(renderer, renderTarget2);
    //this.bloomComposer.setSize(window.innerWidth, window.innerHeight);

    // Init Passes
    this.copyPass = new ShaderPass(CopyShader);
    this.copyPass.renderToScreen = true;


    //this.environmentRenderPass = new RenderPass(sceneEnvironment, camera);
    //this.objectRenderPass = new RenderPass(sceneObject, camera);
    //this.compositePasses = new ShaderPass(CompositeShader);
    this.mainRenderPass = new RenderPass(scene, camera);


    // Post-Processing Effects
    this.vignetteShader = new ShaderPass(VignetteShader);
    this.vignetteShader.uniforms.darkness.value = 0.8;


    //this.FXAAShader = new ShaderPass(FXAAShader);
    //this.FXAAShader.uniforms.resolution.value = new Vector2(1 / window.innerWidth, 1 / window.innerHeight);

    /*
    this.highPass = new ShaderPass(HighPassShader);

    this.hBlur = new ShaderPass(HorizontalBlurShader);
    this.hBlur.uniforms.h.value = 2 / window.innerWidth;

    this.vBlur = new ShaderPass(VerticalBlurShader);
    this.vBlur.uniforms.v.value = 2 / window.innerHeight;
    
    this.additiveBlend = new ShaderPass(AdditiveBlendShader);
    this.additiveBlend.renderToScreen = true;
    */

	// Add Passes
    //this.environmentComposer.addPass(this.environmentRenderPass);
    //this.environmentComposer.addPass(this.effectCopy);
    //this.objectComposer.addPass(this.objectRenderPass);
    //this.objectComposer.addPass(this.effectCopy);

    //this.compositePasses.uniforms[ 'tEnvironment' ].value = this.environmentComposer.renderTarget1;
    //this.compositePasses.uniforms[ 'tObject' ].value = this.objectComposer.renderTarget1;

    //this.mainComposer.addPass(this.compositePasses);

    this.mainComposer.addPass(this.mainRenderPass);



    // Anti-aliasing
    //this.mainComposer.addPass(this.FXAAShader);

    //this.bloomComposer.addPass(this.renderPass);
    //this.bloomComposer.addPass(this.highPass);
    //this.bloomComposer.addPass(this.hBlur);
    //this.bloomComposer.addPass(this.vBlur);

    //this.additiveBlend.uniforms[ 'tDiffuse1' ].value = this.mainComposer.renderTarget;
    //this.additiveBlend.uniforms[ 'tDiffuse2' ].value = this.bloomComposer.renderTarget2;
    //this.additiveBlend.uniforms[ 'blend' ].value = 1;

    // Vignette
    this.mainComposer.addPass(this.vignetteShader);

    //this.mainComposer.addPass( additiveBlend );

    // Copy to screen
    this.mainComposer.addPass(this.copyPass);
  }

  update(delta){
    //environmentComposer.render(delta);
    //typographyFrontComposer.render(delta);
    this.mainComposer.render();
  }
}