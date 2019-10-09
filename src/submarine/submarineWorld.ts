import floorMesh from '../models/floor.obj';
import subMesh from '../models/subMesh.obj';

import { SceneGraph } from "../sceneGraph/sceneGraph";
import { Submarine } from "./submarine";
import { CameraNode } from "../sceneGraph/cameraNode";
import { vec3, mat4, vec4 } from "gl-matrix";
import { DrawableNode } from "../sceneGraph/drawableNode";

export class SubmarineWorld {
    sceneGraph: SceneGraph;

    private constructor(sceneGraph: SceneGraph) {
        this.sceneGraph = sceneGraph;
    }

    static createSubmarineWorld(gl: WebGL2RenderingContext) {
        const camera = new CameraNode();
        camera.setupProjection(
            vec3.fromValues(-50, -50, -50),
            vec3.fromValues(50, 50, 50)
        );
        const submarineWorld: SubmarineWorld = new SubmarineWorld(new SceneGraph(camera));
        submarineWorld.setup();
        return submarineWorld;
    }

    setup() {
        let floor = DrawableNode.createDrawableNode(floorMesh);
        floor.color = vec4.fromValues(1, 1, 1, 1);
        this.sceneGraph.addChild(floor, this.sceneGraph.root);

        let sub = Submarine.createSubmarine();
        sub.color = vec4.fromValues(0, 0, 1, 1.0);
        mat4.translate(sub.matrix, sub.matrix, vec3.fromValues(0, 10, 0));
        this.sceneGraph.addChild(sub, this.sceneGraph.root);

        let sub2 = DrawableNode.createDrawableNode(subMesh);
        sub2.color = vec4.fromValues(1, 0, 0, 1.0);
        mat4.translate(sub2.matrix, sub2.matrix, vec3.fromValues(20, 10, 20));
        this.sceneGraph.addChild(sub2, sub);

        let sub3 = DrawableNode.createDrawableNode(subMesh);
        sub3.color = vec4.fromValues(0, 1, 0, 1.0);
        mat4.translate(sub3.matrix, sub3.matrix, vec3.fromValues(34, 20, 34));
        this.sceneGraph.addChild(sub3, sub);
    }
}