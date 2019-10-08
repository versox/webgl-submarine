import { mat4 } from "gl-matrix";

// piece of scene graph that can be traversed
export class Node {
    parent: Node = rootNode;
    children: Node[] = [];
    // Represents the matrix for this node
    matrix: mat4;
    // How to transform this nodes matrix each draw cycle
    deltaMatrix: mat4;
    // Current tranformation matrix
    ctm: mat4;

    constructor() {
        this.matrix = mat4.create();
        this.deltaMatrix = mat4.create();
        this.ctm = mat4.create();
    }

    setDeltaMatrix(m: mat4) {
        mat4.copy(this.deltaMatrix, m);
    }

    resetDelta = () => {
        mat4.identity(this.deltaMatrix);
    }

    // Visiting a node multiplies it's matrices to the CTM
    visit() {
        // Apply delta to this node
        mat4.multiply(this.matrix, this.matrix, this.deltaMatrix);
        // Apply this node to CTM
        mat4.multiply(this.ctm, this.parent.ctm, this.matrix);
        gl.uniformMatrix4fv(locations.u_ctm, false, this.ctm);
    }
}

// Holds identity CTM so all nodes have a matrix to start with
const rootNode = new Node();
