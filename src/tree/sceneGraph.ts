import { Node } from './node';
import { isNullOrUndefined } from 'util';
import { Locations } from '../util/glSetup';

export class SceneGraph {
    root: Node;

    constructor(root: Node) {
       this.root = root;
    }

    static createSceneGraph(root?: Node) {
        if (isNullOrUndefined(root)) {
            return new SceneGraph(new Node());
        }
        return new SceneGraph(root);
    }

    addChild(child: Node, parent: Node) {
        child.parent = parent;
        parent.children.push(child);
   }

    drawPieces(gl: WebGL2RenderingContext, locations: Locations) {
        function drawPiece(piece: Node) {
            piece.draw(gl, locations);
            piece.children.forEach(drawPiece);
        }
        drawPiece(this.root);
    }
}