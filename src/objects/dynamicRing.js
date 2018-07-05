import { Object3D, Vector2, Vector3, Shape, Curve, ExtrudeGeometry, Mesh} from 'three';
import {mainScene} from '../scenes';
import {CubeTextures} from '../textures';

export let Profiles = {
  squareTemplate: [
    new Vector2(-0.5,0),
    new Vector2(0.5,0),
    new Vector2(0.5,1),
    new Vector2(-0.5,1)
  ],
  triangleTemplate: [
    new Vector2(-0.5,0),
    new Vector2(0.5,0),
    new Vector2(0,1)
  ],
  roundTemplate: function(){
    const points=[];
    const segments = 16;
    const angleInc = Math.PI*2/segments;
    for(var i=0; i<segments; i++){
      points.push(new Vector2(0.5 * Math.cos(angleInc*i), 0.5 * Math.sin(angleInc*i)));
    }
    return points;
  }()
}

export default class DynamicRing {
  init(parameters){
    this.container = new Object3D();

    this.constructGeometry(parameters.width, parameters.height, parameters.template);

    this.material = parameters.material;
    this.material.envMap = CubeTextures.envMapHDR.data;
    this.material.flatShading = false;

    this.mesh = new Mesh(this.geometry, this.material);

    this.hide();

    this.container.position.x = parameters.location;
    this.container.position.y = 0;
    this.container.rotation.y = parameters.offset;
    this.container.scale.multiplyScalar(1);
    this.container.add(this.mesh);
    mainScene.add(this.container);
  }

  constructGeometry(width, height, template){

    const profile = [];    
    for(var i=0; i<template.length; i++){
      profile.push(new Vector2(template[i].x * width, template[i].y * height));
    }
  
    const sectionShape = new Shape(profile);

    const ringPath = new Curve();
    const radius = 1;
    const radiansStart = 0;
    const radiansEnd = Math.PI*2;

    ringPath.getPoint = function (t) {
      const segment = (radiansStart - radiansEnd) * t;
      return new Vector3(radius * Math.cos(segment), radius * Math.sin(segment), 0);
    };
    
    const extrudeSettings = {
      steps: 64,
      bevelEnabled: true,
      extrudePath: ringPath
    };

    this.geometry = new ExtrudeGeometry( sectionShape, extrudeSettings );

    this.geometry.computeVertexNormals(true);
  }

  update(){
    this.container.rotation.y += 0.01;
  }

  show(){
    this.mesh.visible = true;
  }

  hide(){
    this.mesh.visible = false;
  }
}


