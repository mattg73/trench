import { Object3D, BoxGeometry, MeshStandardMaterial, Mesh } from 'three';

export default class DefaultCube {
  init(){
    this.container = new Object3D();
    const geometry = new BoxGeometry( 1, 1, 1 );
    const material = new MeshStandardMaterial( { color: 0x505050 } );
    this.cube = new Mesh( geometry, material );
    this.container.add(this.cube);
  }

  update(){
    this.cube.rotation.y += 0.01;
  }
}