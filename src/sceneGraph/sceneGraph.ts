import { Node } from './node';
import { isNullOrUndefined } from 'util';

export class SceneGraph {
    root: Node;

    constructor(root: Node) {
       this.root = root;
    }

    addChild(child: Node, parent: Node) {
        child.parent = parent;
        parent.children.push(child);
   }

    traverse() {
        function visitNode(node: Node) {
            node.visit();
            node.children.forEach(visitNode);
        }
        visitNode(this.root);
    }
}