import { SceneGraph } from "../sceneGraph/sceneGraph";
import { Submarine } from "./submarine";
import { CameraNode } from "../sceneGraph/cameraNode";
import { vec3 } from "gl-matrix";
import { Node } from "../sceneGraph/node";

export class SubmarineWorld {
    sceneGraph: SceneGraph;

    private constructor(sceneGraph: SceneGraph) {
        this.sceneGraph = sceneGraph;
    }

    static createSubmarineWorld(gl: WebGL2RenderingContext) {
        const camera = new CameraNode();
        // camera.setupProjection(
        //     vec3.fromValues(-50, -50, -50),
        //     vec3.fromValues(50, 50, 50)
        // );
        const submarineWorld: SubmarineWorld = new SubmarineWorld(new SceneGraph(new Node()));
        submarineWorld.setup();
        return submarineWorld;
    }

    setup() {
        let sub = Submarine.createSubmarine();
        this.sceneGraph.addChild(sub, this.sceneGraph.root);
        // this.sceneGraph.addChild(Submarine.createSubmarine(gl), this.sceneGraph.root);
    }
}