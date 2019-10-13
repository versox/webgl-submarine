import floorMesh from '../models/floor.obj';
import cubeMesh from '../models/cube.obj';

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
        const floor = DrawableNode.createDrawableNode(floorMesh);
        floor.color = vec4.fromValues(1, 1, 1, 1);
        this.sceneGraph.addChild(floor, this.sceneGraph.root);

        const sub = Submarine.createSubmarine(this.sceneGraph);
        this.sceneGraph.addChild(sub, this.sceneGraph.root);

        const rock1 = DrawableNode.createDrawableNode(cubeMesh);
        vec3.set(rock1.position, 0, 0, 0);
        vec3.set(rock1.scale, 10, 5, 10);
        rock1.color = vec4.fromValues(0.5412, 0.5412, 0.5412, 1.0);
        this.sceneGraph.addChild(rock1, this.sceneGraph.root);

        const rock2 = DrawableNode.createDrawableNode(cubeMesh);
        vec3.set(rock2.position, 140, 0, 140);
        vec3.set(rock2.scale, 10, 5, 10);
        rock2.color = vec4.fromValues(0.5412, 0.5412, 0.5412, 1.0);
        this.sceneGraph.addChild(rock2, this.sceneGraph.root);
    }
}