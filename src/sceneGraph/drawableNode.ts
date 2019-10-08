import { MeshWithBuffers, Mesh, initMeshBuffers } from "webgl-obj-loader";
import { Node } from "./node";

export class DrawableNode extends Node {
    mesh: MeshWithBuffers;

    constructor(mesh: MeshWithBuffers) {
        super();
        this.mesh = mesh;
    }

    static createDrawableNode(mesh: Mesh): DrawableNode {
        return new DrawableNode(initMeshBuffers(gl, mesh));
    }

    // Visiting a drawable loads its mesh buffers and tells GL to draw them
    visit() {
        // First visit node in order to adjust CTM
        super.visit();
        // tell the a_vertices attribute to use the vertex buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, this.mesh.vertexBuffer);
        gl.vertexAttribPointer(
            // Attrib location
            locations.a_vertices,
            // Size: # of elements per iter
            3,
            // type: type of data
            gl.FLOAT,
            // normalize
            false,
            // stride: move forward size (0 is sizeOfType * size)
            0,
            // offset: where to start
            0
        );
        // same thing for texture
        gl.bindBuffer(gl.ARRAY_BUFFER, this.mesh.textureBuffer);
        gl.vertexAttribPointer(
            locations.a_texture,
            3,
            gl.FLOAT,
            false,
            0,
            0
        );
        // Draw using the indices buffer (holds indices to vertexs and texture in order to draw faces)
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.mesh.indexBuffer)
        gl.drawElements(gl.TRIANGLES, this.mesh.indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
    }
}