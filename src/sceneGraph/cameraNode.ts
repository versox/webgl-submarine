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
        // Origin is at average of nears and fars
        const origin = vec3.create();
        vec3.add(origin, max, min);
        vec3.scale(origin, origin, 0.5);

        // Scale
        const scaleVector = vec3.create();
        vec3.sub(scaleVector, max, min);
        vec3.scale(scaleVector, scaleVector, 0.5);

        // Translate
        const translate = mat4.create();
        mat4.fromTranslation(translate, origin);

        // Scale
        const scale = mat4.create();
        mat4.fromScaling(scale, scaleVector);

        // Projection matrix
        mat4.multiply(this.matrix, scale, translate);
    }
}