import { SceneGraph } from "../tree/sceneGraph";
import { Submarine } from "./submarine";

export class SubmarineWorld {
    sceneGraph: SceneGraph;

    private constructor(sceneGraph: SceneGraph) {
        this.sceneGraph = sceneGraph;
    }

    static createSubmarineWorld(gl: WebGL2RenderingContext) {
        const submarineWorld: SubmarineWorld = new SubmarineWorld(SceneGraph.createSceneGraph());
        submarineWorld.setup(gl);
        return submarineWorld;
    }

    setup(gl: WebGL2RenderingContext) {
        this.sceneGraph.addChild(Submarine.createSubmarine(gl), this.sceneGraph.root);
    }
}