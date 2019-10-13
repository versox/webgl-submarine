export function createShader(gl: WebGL2RenderingContext, type: GLenum, source: string): WebGLShader {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
      return shader;
    }
  
    console.log(gl.getShaderInfoLog(shader));  // eslint-disable-line
    gl.deleteShader(shader);
    return undefined;
}


export function createProgram(gl: WebGL2RenderingContext, shaders: WebGLShader[]): WebGLProgram {
    var program = gl.createProgram();
    shaders.forEach(shader => {
        gl.attachShader(program, shader);
    });
    gl.linkProgram(program);
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
      return program;
    }
    console.log(gl.getProgramInfoLog(program));  // eslint-disable-line
    gl.deleteProgram(program);
    return undefined;
}

export function setup(gl: WebGL2RenderingContext, program: WebGLProgram) {
  // Get memory location of shader variables  
  (global as any).locations = {
      a_vertices: gl.getAttribLocation(program, 'a_vertices'),
      // a_texture: gl.getAttribLocation(program, 'a_texture'),
      u_ctm: gl.getUniformLocation(program, 'u_ctm'),
      u_color: gl.getUniformLocation(program, 'u_color')
    };
    (global as any).vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    gl.enableVertexAttribArray(locations.a_vertices);
    gl.enableVertexAttribArray(locations.a_texture);
    gl.enable(gl.DEPTH_TEST);
    webglUtils.resizeCanvasToDisplaySize(gl.canvas);
    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.useProgram(program);
}