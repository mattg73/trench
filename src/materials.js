import {MeshStandardMaterial, Color} from 'three';

export default class Materials {
    constructor(){
        const goldParams = {
            color: new Color(0x00ff00),
            metalness: 0
        };
        this.gold = new MeshStandardMaterial();
    }
}
