import cubeMesh from '../models/cube.obj';

import { DrawableNode } from "../sceneGraph/drawableNode";
import { MeshWithBuffers, initMeshBuffers } from "webgl-obj-loader";
import { vec4, vec3 } from 'gl-matrix';
import { keyboard } from '../input/keyboard';

export class PropellerPiece extends DrawableNode {
    
    constructor(mesh: MeshWithBuffers) {
        super(mesh);
    }

    static createPropeller(): PropellerPiece {
        const propeller = new PropellerPiece(initMeshBuffers(gl, cubeMesh));
        vec3.set(propeller.scale, 5, 10, 2);
        vec3.set(propeller.position, -34, 0, 0);
        propeller.color = vec4.fromValues(1, 0, 0, 1.0);
        keyboard.bind('s', propeller.stopRotation('s'), propeller.setRotation('s', propeller.spin));
        keyboard.bind('f', propeller.stopRotation('f'), propeller.setRotation('f', propeller.spin));
        keyboard.bind('b', propeller.stopRotation('b'), propeller.setRotation('b', propeller.spin));

        return propeller;
    }

    spin = () => {
        this.angleX += 0.03;
    }
}