#version 300 es

// an attribute is an input (in) to a vertex shader.
// It will receive data from a buffer
in vec4 a_vertices;
in vec4 a_texture;
out vec4 v_color;

uniform mat4 u_ctm;

// all shaders have a main function
void main() {

  // gl_Position is a special variable a vertex shader
  // is responsible for setting
  // gl_Position = mat4(
  //   1, 0, 0, 0,
  //   0, 1, 0, 0,
  //   0, 0, 1, 0,
  //   0, 0, 0, 1) * a_vertices + vec4(0, 0, 0, 0);

  gl_Position = u_ctm * a_vertices;
  // v_color = gl_Position * 0.5 + 0.5;
  v_color = a_texture;
  // float divideBy = abs(a_position.z) * 1.3;
  // gl_Position = u_tmatrix * vec4(a_position.xyz, divideBy);
}