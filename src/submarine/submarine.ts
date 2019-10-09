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
        keyboard.bind('ArrowUp', sub.resetDelta, sub.goUp);
        keyboard.bind('ArrowDown', sub.resetDelta, sub.goDown);
        keyboard.bind('ArrowRight', sub.resetDelta, sub.rotateClockwise);
        keyboard.bind('ArrowLeft', sub.resetDelta, sub.rotateCounterClockwise);
        return sub;
    }

    // TODO: Layer transformations so multiple can happen at once

    goUp = () => {
        mat4.set(this.deltaMatrix,
            1.0, 0, 0, 0,
            0, 1.0, 0, 0,
            0, 0, 1, 0,
            0, 1, 0, 1);
        console.log(this.ctm);
    }

    goDown = () => {
        mat4.set(this.deltaMatrix,
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, -1, 0, 1);
    }

    rotateClockwise = () => {
        mat4.fromYRotation(this.deltaMatrix, 0.05);
    }

    rotateCounterClockwise = () => {
        mat4.fromYRotation(this.deltaMatrix, -0.05);
    }
}