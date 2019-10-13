import { vec3, mat4 } from "gl-matrix";
import { Node } from "./node";
import { isNullOrUndefined } from "util";

export class ObjectNode extends Node {
    position: vec3 = vec3.fromValues(0, 0 , 0);
    angleX = 0;
    angleY = 0;
    angleZ = 0;

    // Change functions
    rotationFunctions: any = {};
    translationFunctions: any = {};

    setRotation(key: string, rotationFunction: Function) {
        return () => {
            this.rotationFunctions[key] = rotationFunction;
        }
    }

    stopRotation(key: string) {
        return () => {
            this.rotationFunctions[key] = null;
        }
    }

    setTranslation(key: string, translationFunction: Function) {
        return () => {
            this.translationFunctions[key] = translationFunction;
        }
    }

    stopTranslation(key: string) {
        return () => {
            this.translationFunctions[key] = null;
        }
    }

    constructor() {
        super();
    }

    // Visting an objectNode loads its mesh into buffers that the shaders can read to draw
    visit() {
        // Apply change to rotation / position
        for (var key in this.rotationFunctions) {
            if (!isNullOrUndefined(this.rotationFunctions[key])) {
                this.rotationFunctions[key]();    
            }   
        }
        for (var key in this.translationFunctions) {
            if (!isNullOrUndefined(this.translationFunctions[key])) {
                this.translationFunctions[key]();
            }
        }

        // Reset model matrix
        mat4.identity(this.matrix);

        // Apply rotations
        const xRotationMatrix = mat4.create();
        mat4.fromXRotation(xRotationMatrix, this.angleX);
        mat4.multiply(this.matrix, xRotationMatrix, this.matrix);

        const yRotationMatrix = mat4.create();
        mat4.fromYRotation(yRotationMatrix, this.angleY);
        mat4.multiply(this.matrix, yRotationMatrix, this.matrix);

        const zRotationMatrix = mat4.create();
        mat4.fromZRotation(zRotationMatrix, this.angleZ);
        mat4.multiply(this.matrix, zRotationMatrix, this.matrix);

        // Applay translation
        const translationMatrix = mat4.create();
        mat4.fromTranslation(translationMatrix, this.position);
        mat4.multiply(this.matrix, translationMatrix, this.matrix);

        // Visit node class in order to adjust CTM
        super.visit();

        // Apply scale
        mat4.fromScaling(this.matrix, this.scale);
    }
}