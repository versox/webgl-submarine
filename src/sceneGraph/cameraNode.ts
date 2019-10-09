import { Node } from "./node";
import { vec3, mat4 } from "gl-matrix";

export class CameraNode extends Node {
    constructor(
        /* private cameraPosition: vec3,
         private lookAt: vec3*/) {
        super();
    }

    setup() {
        // Z vector
        const cameraZNormal = vec3.create();
        // vec3.sub(cameraZNormal, this.lookAt, this.cameraPosition);
        vec3.normalize(cameraZNormal, cameraZNormal);
    }

    setupProjection(min: vec3, max: vec3) {
        // // Origin is at average of nears and fars
        // const origin = vec3.create();
        // vec3.add(origin, max, min);
        // vec3.scale(origin, origin, 0.5);

        // // Scale
        // const scaleVector = vec3.create();
        // vec3.sub(scaleVector, max, min);
        // vec3.scale(scaleVector, scaleVector, 0.5);

        // // Translate
        // const translate = mat4.create();
        // mat4.fromTranslation(translate, origin);

        // // Scale
        // const scale = mat4.create();
        // mat4.fromScaling(scale, scaleVector);

        // // Projection matrix
        // mat4.multiply(this.matrix, scale, translate);
        const view = mat4.create();
        mat4.lookAt(view,
            vec3.fromValues(200, 30, 200),
            vec3.fromValues(0, -10, 0),
            vec3.fromValues(0, 1, 0));
        mat4.ortho(this.matrix, -300, 300, -150, 300, 0, 600);
        mat4.multiply(this.matrix, this.matrix, view);
        mat4.add(this.matrix, mat4.fromValues(
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0),
            this.matrix
        );
        // mat4.set(this.matrix,
        //     -1, 0, 0, 0,
        //     0, -1, 0, 0,
        //     0, 0, -1, 0,
        //     0, 0, 0, 50);
        console.log('Projection');
        console.log(this.matrix);
    }
}