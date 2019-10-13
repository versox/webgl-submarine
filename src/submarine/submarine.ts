import ellipsoidMesh from '../models/ellipsoid.obj';

import { DrawableNode } from "../sceneGraph/drawableNode";
import { initMeshBuffers, MeshWithBuffers } from 'webgl-obj-loader';
import { keyboard } from '../input/keyboard';
import { vec3, vec4 } from 'gl-matrix';
import { PropellerPiece } from './propeller';
import { SceneGraph } from '../sceneGraph/sceneGraph';

export class Submarine extends DrawableNode {
    private constructor(initializedSubMesh: MeshWithBuffers) {
        super(initializedSubMesh);
    }

    static createSubmarine(sceneGraph: SceneGraph): Submarine {
        const sub = new Submarine(initMeshBuffers(gl, ellipsoidMesh));
        vec3.set(sub.scale, 20, 10, 10);
        vec3.set(sub.position, 0, 20, 0);
        sub.color = vec4.fromValues(0, 0, 1, 1.0);
        keyboard.bind('ArrowRight', sub.stopRotation('ArrowRight'), sub.setRotation('ArrowRight', sub.rotateClockwise));
        keyboard.bind('ArrowLeft', sub.stopRotation('ArrowLeft'), sub.setRotation('ArrowLeft', sub.rotateCounterClockwise));
        keyboard.bind('ArrowUp', sub.stopTranslation('ArrowUp'), sub.setTranslation('ArrowUp', sub.goUp));
        keyboard.bind('ArrowDown', sub.stopTranslation('ArrowDown'), sub.setTranslation('ArrowDown', sub.goDown));
        keyboard.bind('f', sub.stopTranslation('f'), sub.setTranslation('f', sub.goForward));
        keyboard.bind('b', sub.stopTranslation('b'), sub.setTranslation('b', sub.goBackwards));

        const propPieceA = PropellerPiece.createPropeller();
        const propPieceB = PropellerPiece.createPropeller();
        propPieceB.angleX = 1.5708;
        sceneGraph.addChild(propPieceA, sub);
        sceneGraph.addChild(propPieceB, sub);

        return sub;
    }

    goUp = () => {
        vec3.add(this.position, this.position, vec3.fromValues(0, 1, 0));
    }

    goDown = () => {
        vec3.add(this.position, this.position, vec3.fromValues(0, -1, 0));
    }

    goForward = () => {
        const x = Math.cos(this.angleY);
        const z = Math.sin(this.angleY);
        vec3.add(this.position, this.position, vec3.fromValues(x, 0, z));
    }

    goBackwards = () => {
        const x = Math.cos(this.angleY);
        const z = Math.sin(this.angleY);
        vec3.sub(this.position, this.position, vec3.fromValues(x, 0, z));
    }

    rotateClockwise = () => {
        this.angleY += 0.05;
    }

    rotateCounterClockwise = () => {
        this.angleY -= 0.05;
    }
}