import { mat4, vec3 } from "gl-matrix";

// Base class for nodes in the scenegraph
export class Node {
    parent: Node = rootNode;
    children: Node[] = [];
    // Represents the matrix for this node
    matrix: mat4;
    // Current tranformation matrix
    ctm: mat4;

    scale: vec3 = vec3.fromValues(1, 1, 1);

    constructor() {
        this.matrix = mat4.create();
        this.ctm = mat4.create();
    }

    /* 
        [identity matrix]
                |
            root node
            /        \
        child1     child2

        The CTM is built up by traversing the scene graph and multiplying each nodes
        matrix with its ancestors.

        CTM = identity
        --- (Traverse down) ---
        CTM = CTM * root = identity * root
        --- (Traverse down) ---
        CTM = CTM * child1 = identity * root * child1
        --- (Go back up so that the CTM is at the root again) ---
        --- (Traverse down) ---
        CTM = CTM * child2 = identity * root * child2
    */
    visit() {
        // Apply this node to CTM
        mat4.multiply(this.ctm, this.parent.ctm, this.matrix);
        // Scale this node individually
        const scale = mat4.create();
        mat4.fromScaling(scale, this.scale);
        const ctmWithScale = mat4.create();
        mat4.multiply(ctmWithScale, this.ctm, scale);
        gl.uniformMatrix4fv(locations.u_ctm, false, ctmWithScale);
    }
}

// Holds identity CTM so all nodes have a matrix to start with
const rootNode = new Node();
