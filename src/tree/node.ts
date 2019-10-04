import { Mesh, initMeshBuffers, MeshWithBuffers } from "webgl-obj-loader";
import { isNullOrUndefined } from "util";
import { Locations } from "../util/glSetup";
import { multiply, identity, rotateX } from "../util/glTransform";

// holder for a mesh that can be drawn
export class Node {
    // mesh
    mesh: MeshWithBuffers;
    parent: Node = null;
    children: Node[] = [];

    constructor(mesh?: Mesh) {
        this.mesh = mesh as MeshWithBuffers;
    }

    setup(gl: WebGL2RenderingContext) {
        this.mesh = initMeshBuffers(gl, this.mesh);
    }

    draw(gl: WebGL2RenderingContext, locations: Locations) {
        if (!isNullOrUndefined(this.mesh)) {
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
              gl.bindBuffer(gl.ARRAY_BUFFER, this.mesh.textureBuffer);
              gl.vertexAttribPointer(
                  locations.a_texture,
                  3,
                  gl.FLOAT,
                  false,
                  0,
                  0
              );
              let ctm = multiply(identity, [
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
              ]);
              ctm = multiply(rotateX(0), ctm);
              // ctm = multiply(ctm, rotateX(0));
              // ctm = multiply(ctm, rotateY(0));
              gl.uniformMatrix4fv(locations.u_ctm, false, new Float32Array(ctm));
              gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.mesh.indexBuffer)
              // gl.drawArrays(gl.TRIANGLES, 0, 152);
              gl.drawElements(gl.TRIANGLES, this.mesh.indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
        }
        console.log(this.mesh);
        console.log(this.children);
    }
} 