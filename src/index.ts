// import { main } from './example';
import { createShader, createProgram, setup } from './util/glSetup';
import { SubmarineWorld } from './submarine/submarineWorld';

import vertexShader from './shaders/vertex.vert';
import fragmentShader from './shaders/fragment.frag';


let gl: WebGL2RenderingContext;
let u_tmatrix: WebGLUniformLocation;
let i = 2.5;

function main() {
    // let sg = new SceneGraph();
    // sg.drawPieces();

    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    gl = canvas.getContext("webgl2");
  
    // Only continue if WebGL is available and working
    if (gl === null) {
      alert("Unable to initialize WebGL. Your browser or machine may not support it.");
      return;
    }
 
    const program = createProgram(gl, [
      createShader(gl, gl.VERTEX_SHADER, vertexShader),
      createShader(gl, gl.FRAGMENT_SHADER, fragmentShader)
    ]);

    const setupValues = setup(gl, program);

    // Set clear color to black, fully opaque
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    // Clear the color buffer with specified clear color
    gl.clear(gl.COLOR_BUFFER_BIT);

    // gl.bindVertexArray(vao);
    // gl.uniform4f(u_color, 1, 1, 1, 1.0);

    const submarineWorld = SubmarineWorld.createSubmarineWorld(gl);

    setInterval(() => submarineWorld.sceneGraph.drawPieces(gl, setupValues.locations), 10);
  }

  // Drawing with array buffer
    // const positions2 = [
    //   0, 0, 
    //   -1, 1,
    //   0, 1
    // ];
    // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions2), gl.STATIC_DRAW);
    // gl.drawArrays(gl.TRIANGLES, 0, 3);
  
  window.onload = main;