import { createShader, createProgram, setup } from './util/glSetup';
import { SubmarineWorld } from './submarine/submarineWorld';

import vertexShader from './shaders/vertex.vert';
import fragmentShader from './shaders/fragment.frag';
import { keyboard } from './input/keyboard';
import { setupHelp } from './help';

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

    // Setup world
    const submarineWorld = SubmarineWorld.createSubmarineWorld();
    // Setup draw cycle to traverse scene graph every 10ms
    setInterval(() => submarineWorld.sceneGraph.traverse(), 10);
    // Setup help key
    setupHelp();
  }

  window.onload = main;