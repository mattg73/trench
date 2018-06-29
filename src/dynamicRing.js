import { Object3D, Vector2, Vector3, Shape, Curve, ExtrudeGeometry, BufferGeometry, Float32BufferAttribute, Mesh, DoubleSide, SmoothShading, VertexNormalsHelper} from 'three';
import {mainScene} from './scenes';
import Materials from './materials';
import {CubeTextures} from './textures';

export default class DynamicRing {
  init(){
    this.container = new Object3D();

    this.constructGeometry();

    this.material = Materials.copper;
    this.material.envMap = CubeTextures.envMapHDR.data;
    this.material.shading = SmoothShading

    this.mesh = new Mesh(this.geometry, this.material);

    this.container.position.x = 5;
    this.container.position.y = -4;
    this.container.scale.multiplyScalar(1);
    this.container.add(this.mesh);
    mainScene.add(this.container);
  }

  constructGeometry(){

    const height = 0.1;
    const width = 0.2;

    const sectionTemplates = { 
      squareTemplate: [
        new Vector2(-0.5*width,0),
        new Vector2(0.5*width,0),
        new Vector2(0.5*width,1*height),
        new Vector2(-0.5*width,1*height)
      ],
      triangleTemplate: [
        new Vector2(-0.5*width,0),
        new Vector2(0.5*width,0),
        new Vector2(0*width,1*height)
      ],
      roundTemplate: function(){
        const points=[];
        const segments = 16;
        const angleInc = Math.PI*2/segments;
        for(var i=0; i<segments; i++){
          points.push(new Vector2(0.5 * width * Math.cos(angleInc*i), 0.5 * width * Math.sin(angleInc*i)))
        }
        console.log(points)
        return points;
      }()

    }

    const sectionShape = new Shape(sectionTemplates.roundTemplate);

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
    //this.mesh.rotation.x += 0.01;
    this.container.rotation.y += 0.01;

    //this.mesh.rotation.z += 0.002;
  }
}