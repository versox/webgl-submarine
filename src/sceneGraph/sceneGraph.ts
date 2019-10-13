import { Node } from './node';

export class SceneGraph {
    root: Node;

    constructor(root: Node) {
       this.root = root;
    }

    addChild(child: Node, parent: Node) {
        child.parent = parent;
        parent.children.push(child);
   }

    // Do a depth first traversal of the scene graph and call visit() on each node
    traverse() {
        function visitNode(node: Node) {
            node.visit();
            node.children.forEach(visitNode);
        }
        visitNode(this.root);
    }
}