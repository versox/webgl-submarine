import ellipsoidMesh from '../models/ellipsoid.obj';
import cubeMesh from '../models/cube.obj';

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

        const top = DrawableNode.createDrawableNode(ellipsoidMesh);
        vec3.set(top.position, 0, 9, 0);
        vec3.set(top.scale, 10, 5, 5);
        top.color = vec4.fromValues(0.8941, 0.5216, 0.2196, 1.0);
        sceneGraph.addChild(top, sub);

        const nose = DrawableNode.createDrawableNode(ellipsoidMesh);
        vec3.set(nose.position, 25, 0, 0);
        vec3.set(nose.scale, 3, 5, 5);
        nose.color = vec4.fromValues(0.8941, 0.5216, 0.2196, 1.0);
        sceneGraph.addChild(nose, sub);

        const propHolder = DrawableNode.createDrawableNode(cubeMesh);
        vec3.set(propHolder.position, -20, 0, 0);
        vec3.set(propHolder.scale, 15, 3, 3);
        propHolder.color = vec4.fromValues(0.4471, 0.102, 0.7686, 1.0);
        sceneGraph.addChild(propHolder, sub);

        const propPieceA = PropellerPiece.createPropeller();
        sceneGraph.addChild(propPieceA, sub);
        const propPieceB = PropellerPiece.createPropeller();
        propPieceB.angleX = 1.5708; // 90deg
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
        const x = Math.sin(this.angleY + 1.5708);
        const z = Math.cos(this.angleY + 1.5708);
        vec3.add(this.position, this.position, vec3.fromValues(x, 0, z));
    }

    goBackwards = () => {
        const x = Math.sin(this.angleY + 1.5708);
        const z = Math.cos(this.angleY + 1.5708);
        vec3.sub(this.position, this.position, vec3.fromValues(x, 0, z));
    }

    rotateClockwise = () => {
        this.angleY -= 0.05;
    }

    rotateCounterClockwise = () => {
        this.angleY += 0.05;
    }
}