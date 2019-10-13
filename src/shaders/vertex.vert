#version 300 es

// an attribute is an input (in) to a vertex shader.
// It will receive data from a buffer
in vec4 a_vertices;
// in vec4 a_texture;

uniform mat4 u_ctm;

void main() {
  gl_Position = u_ctm * a_vertices;
}