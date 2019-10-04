import { Node } from "../tree/node";
import { Mesh } from "webgl-obj-loader";

import subMesh from '../models/subMesh.obj';

export class Submarine extends Node {
    private constructor(mesh: Mesh) {
        super(mesh);        
    }

    static createSubmarine(gl: WebGL2RenderingContext) {
        const sub = new Submarine(subMesh);
        sub.setup(gl);
        return sub;
    }
}