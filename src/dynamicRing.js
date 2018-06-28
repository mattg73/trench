import { Object3D, SphereGeometry, BufferGeometry, Float32BufferAttribute, Mesh, DoubleSide, Vector3, VertexNormalsHelper} from 'three';
import {mainScene} from './scenes';
import Materials from './materials';
import {CubeTextures} from './textures';

export default class DynamicRing {
  init(){
    this.container = new Object3D();

    this.constructGeometry();

    this.material = Materials.copper;
    this.material.envMap = CubeTextures.envMapHDR.data;
    this.material.side = DoubleSide;

    this.mesh = new Mesh(this.geometry, this.material);

    this.VertexHelper = new VertexNormalsHelper( this.mesh, 0.4, 0xff00ff, 1);

    this.container.position.x = 5;
    this.container.position.y = -4;
    this.container.scale.multiplyScalar(1);
    this.container.add(this.mesh);
    this.container.add(this.VertexHelper);
    mainScene.add(this.container);
  }

  constructGeometry(){
    this.geometry = new BufferGeometry();

    const sectionTemplateFlat = [
      [-0.5, 0],
      [0.5, 0]
    ]

    const sectionTemplateSquare = [
      [-0.5, 0],
      [0.5, 0],
      [0.5, 1],
      [-0.5, 1]
    ]

    const sectionTemplate = sectionTemplateFlat;

    const sectionCount = sectionTemplate.length;

    const radiusInner = 1;
    const radiusOuter = 1.1;
    const segments = 16;
    const width = 0.3;
    const angleInc = 2*Math.PI / segments; 
    const heightMultiple = radiusOuter-radiusInner;

    
    // generate vertices
    const vertices = [];

    for (var segment=0; segment<=segments; segment++) {
      for (var sectionIndex=0; sectionIndex<sectionCount; sectionIndex++){
        const x = Math.sin(segment*angleInc) * (radiusInner + heightMultiple * sectionTemplate[sectionIndex][1]);
        const y = Math.cos(segment*angleInc) * (radiusInner + heightMultiple * sectionTemplate[sectionIndex][1]);
        const z = width * sectionTemplate[sectionIndex][0];
        vertices.push(x,y,z);
      }
    }

    //generate indices and normals
    const normals = Array(vertices.length).fill(null);
    const indices = [];

    for (var segment=0; segment<segments-1; segment++) {
      for (var sectionIndex=0; sectionIndex<sectionCount; sectionIndex++){
        /*
        d---c
        |\  |
        | \ |
        |  \|
        a---b
        */

        const a = (segment * sectionCount) + sectionIndex;
        const b = (segment * sectionCount) + sectionIndex + 1;
        const c = ((segment+1) * sectionCount) + sectionIndex + 1;
        const d = ((segment+1) * sectionCount) + sectionIndex;

        const vertA = new Vector3(vertices[3*a], vertices[3*a+1], vertices[3*a+2]);
        const vertB = new Vector3(vertices[3*b], vertices[3*b+1], vertices[3*b+2]);
        const vertC = new Vector3(vertices[3*c], vertices[3*c+1], vertices[3*c+2]);
        const vertD = new Vector3(vertices[3*d], vertices[3*d+1], vertices[3*d+2]);

        const vecAB = new Vector3().subVectors(vertB, vertA);
        const vecAD = new Vector3().subVectors(vertD, vertA);

        const vecDA = new Vector3().subVectors(vertA, vertD);
        const vecDC = new Vector3().subVectors(vertC, vertD);

        const normalA = new Vector3().crossVectors(vecAB, vecAD);
        const normalD = new Vector3().crossVectors(vecDA, vecDC);

        //console.log(normalA)
        //console.log(normalD)
        //console.log('-----')

        if (normals[3*a]==null) normals[3*a] = normalA.x;
        if (normals[3*a+1]==null) normals[3*a+1] = normalA.y;
        if (normals[3*a+2]==null) normals[3*a+2] = normalA.z;

        if (normals[3*b]==null) normals[3*b] = normalA.x;
        if (normals[3*b+1]==null) normals[3*b+1] = normalA.y;
        if (normals[3*b+2]==null) normals[3*b+2] = normalA.z;

        if (normals[3*c]==null) normals[3*c] = normalA.x;
        if (normals[3*c+1]==null) normals[3*c+1] = normalA.y;
        if (normals[3*c+2]==null) normals[3*c+2] = normalA.z;

        if (normals[3*d]==null) normals[3*d] = normalA.x;
        if (normals[3*d+1]==null) normals[3*d+1] = normalA.y;
        if (normals[3*d+2]==null) normals[3*d+2] = normalA.z;

        indices.push(a, b, d);
        indices.push(b, c, d);
      }
    }

    this.geometry.computeVertexNormals();

    /*
    for(var i=0; i<indices.length; i++){
      console.log(indices[i])
    }
    */

    
    for(var i=0; i<normals.length; i++){
      //console.log(normals[i])
    }


    /*
    for ( var i = 0; i <= segments; i ++ ) {
      var y = ( i * segmentSize ) - halfSize;

      for ( var j = 0; j <= segments; j ++ ) {
        var x = ( j * segmentSize ) - halfSize;
        vertices.push( x, - y, 0 );
        normals.push( 0, 0, 1 );
        var r = ( x / size ) + 0.5;
        var g = ( y / size ) + 0.5;
        colors.push( r, g, 1 );
      }
    }
    // generate indices (data for element array buffer)
    for ( var i = 0; i < segments; i ++ ) {
      for ( var j = 0; j < segments; j ++ ) {
        var a = i * ( segments + 1 ) + ( j + 1 );
        var b = i * ( segments + 1 ) + j;
        var c = ( i + 1 ) * ( segments + 1 ) + j;
        var d = ( i + 1 ) * ( segments + 1 ) + ( j + 1 );
        // generate two faces (triangles) per iteration
        indices.push( a, b, d ); // face one
        indices.push( b, c, d ); // face two
      }
    }
    */
    
    this.geometry.setIndex( indices );
    this.geometry.addAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );
    this.geometry.addAttribute( 'normal', new Float32BufferAttribute( normals, 3 ) );
  }

  update(){
    //this.mesh.rotation.x += 0.01;
    this.container.rotation.y += 0.01;

    //this.mesh.rotation.z += 0.002;
  }
}