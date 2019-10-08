import subMesh from '../models/subMesh.obj';

import { DrawableNode } from "../sceneGraph/drawableNode";
import { initMeshBuffers, MeshWithBuffers } from 'webgl-obj-loader';
import { keyboard } from '../input/keyboard';
import { mat4 } from 'gl-matrix';

export class Submarine extends DrawableNode {
    private constructor(initializedSubMesh: MeshWithBuffers) {
        super(initializedSubMesh);
    }

    static createSubmarine(): Submarine {
        const sub = new Submarine(initMeshBuffers(gl, subMesh));
        console.log(sub);
        keyboard.bind('w', sub.resetDelta, sub.goUp);
        keyboard.bind('s', sub.resetDelta, sub.goDown);
        return sub;
    }

    goUp = () => {
        mat4.set(this.deltaMatrix,
            1.01, 0, 0, 0,
            0, 1.01, 0, 0,
            0, 0, 1, 0,
            0, 0.005, 0, 1);
        console.log(this.ctm);
    }

    goDown = () => {
        mat4.set(this.deltaMatrix,
            0.99, 0, 0, 0,
            0, 0.99, 0, 0,
            0, 0, 1, 0,
            0, -0.005, 0, 1);
    }
}