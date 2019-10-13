import { mat4, vec3 } from "gl-matrix";
import { ObjectNode } from "./objectNode";

// piece of scene graph that can be traversed
export class Node {
    parent: Node = rootNode;
    children: Node[] = [];
    // Represents the matrix for this node
    matrix: mat4;
    // // How to transform this nodes matrix each draw cycle
    // deltaMatrix: mat4;
    // Current tranformation matrix
    ctm: mat4;

    scale: vec3 = vec3.fromValues(1, 1, 1);

    constructor() {
        this.matrix = mat4.create();
        // this.deltaMatrix = mat4.create();
        this.ctm = mat4.create();
    }

    // setDeltaMatrix(m: mat4) {
    //     mat4.copy(this.deltaMatrix, m);
    // }

    // resetDelta = () => {
    //     mat4.identity(this.deltaMatrix);
    // }

    // Visiting a node multiplies it's matrices to the CTM
    visit() {
        // Apply delta to this node
        // mat4.multiply(this.matrix, this.matrix, this.deltaMatrix);
        // Apply this node to CTM
        mat4.multiply(this.ctm, this.parent.ctm, this.matrix);
        const scale = mat4.create();
        mat4.fromScaling(scale, this.scale);
        const ctmWithScale = mat4.create();
        mat4.multiply(ctmWithScale, this.ctm, scale);
        gl.uniformMatrix4fv(locations.u_ctm, false, ctmWithScale);
    }
}

// Holds identity CTM so all nodes have a matrix to start with
const rootNode = new Node();
