import { Node } from "./node";
import { vec3, mat4 } from "gl-matrix";

export class CameraNode extends Node {
    constructor() {
        super();
    }

    /* Sets up a camera matrix with view and projection
        camera = P * V

        The camera sits at the root of the scene graph, so these
        transformations will be applied to everything
            camera
            /   \
          obj1  obj2

        CTM = camera * obj1
        aka
        CTM = P * V * M * p
    */
    setupCamera() {
        const view = mat4.create();
        // Construct viewing matrix using pos of camera, where its looking and an up vector
        mat4.lookAt(view,
            vec3.fromValues(200, 30, 200),
            vec3.fromValues(0, -10, 0),
            vec3.fromValues(0, 1, 0));
        // Construct projection matrix using near fars of a frustum
        // Remember/Note: these values are after the view is applied so everything will be going down the + z axis from the camera
        mat4.ortho(this.matrix, -300, 300, -150, 300, 0, 600);
        mat4.multiply(this.matrix, this.matrix, view);
    }
}