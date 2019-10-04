// import { main } from './example';
import { createShader, createProgram } from './util/glHelpers';
import vertexShader from './shaders/vertex.vert';
import fragmentShader from './shaders/fragment.frag';
function main() {
    var canvas = document.getElementById('canvas');
    var gl = canvas.getContext("webgl2");
    // Only continue if WebGL is available and working
    if (gl === null) {
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
        return;
    }
    var program = createProgram(gl, [
        createShader(gl, gl.VERTEX_SHADER, vertexShader),
        createShader(gl, gl.FRAGMENT_SHADER, fragmentShader)
    ]);
    // Locations of attributes / uniforms
    var a_position = gl.getAttribLocation(program, 'a_position');
    var u_tmatrix = gl.getUniformLocation(program, 'u_tmatrix');
    var u_color = gl.getUniformLocation(program, 'u_color');
    var identityMatrix = [
        5, 0, 0, 0,
        0, 5, 0, 0,
        0, 0, 5, 0,
        0, 0, 0, 10
    ];
    console.log(u_color);
    console.log(u_tmatrix);
    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    var positions = [
        -1, -1,
        1, -1,
        1, 1
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    var vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    gl.enableVertexAttribArray(a_position);
    gl.vertexAttribPointer(
    // Attrib locatopm
    a_position, 
    // Size: # of elements per iter
    2, 
    // type: type of data
    gl.FLOAT, 
    // normalize
    false, 
    // stride: move forward size (0 is sizeOfType * size)
    0, 
    // offset: where to start
    0);
    webglUtils.resizeCanvasToDisplaySize(gl.canvas);
    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    // Set clear color to black, fully opaque
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    // Clear the color buffer with specified clear color
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.bindVertexArray(vao);
    gl.uniformMatrix4fv(u_tmatrix, false, new Float32Array(identityMatrix));
    gl.uniform4f(u_color, 0.1333, 0.9255, 0.3333, 1.0);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    gl.uniform4f(u_color, 255, 255, 255, 1);
    var positions2 = [
        0, 0,
        -1, 1,
        0, 1
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions2), gl.STATIC_DRAW);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
}
window.onload = main;
