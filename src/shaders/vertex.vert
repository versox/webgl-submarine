#version 300 es

// an attribute is an input (in) to a vertex shader.
// It will receive data from a buffer
in vec4 a_vertices;
in vec4 a_texture;
out vec4 v_color;

uniform mat4 u_ctm;

void main() {
  gl_Position = u_ctm * a_vertices;
  v_color = vec4(0.0784, 0.6745, 0.9529, 1.0);
  // v_color = a_texture;
}