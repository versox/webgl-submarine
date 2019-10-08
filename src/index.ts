import { createShader, createProgram, setup } from './util/glSetup';
import { SubmarineWorld } from './submarine/submarineWorld';

import vertexShader from './shaders/vertex.vert';
import fragmentShader from './shaders/fragment.frag';
import { keyboard } from './input/keyboard';

function main() {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    (global as any).gl = canvas.getContext("webgl2");
  
    // Only continue if WebGL is available and working
    if (gl === null) {
      alert("Unable to initialize WebGL. Your browser or machine may not support it.");
      return;
    }
 
    const program = createProgram(gl, [
      createShader(gl, gl.VERTEX_SHADER, vertexShader),
      createShader(gl, gl.FRAGMENT_SHADER, fragmentShader)
    ]);

    setup(gl, program);
    keyboard.setup();

    // Set clear color to black, fully opaque
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    // Clear the color buffer with specified clear color
    gl.clear(gl.COLOR_BUFFER_BIT);
    const submarineWorld = SubmarineWorld.createSubmarineWorld(gl);
    setInterval(() => submarineWorld.sceneGraph.traverse(), 10);
  }

  window.onload = main;