declare module '*.glsl' {
    const value: string;
    export default value;
}
declare module '*.vert' {
    const value: string;
    export default value;
}
declare module '*.frag' {
    const value: string;
    export default value;
}

declare module '*.obj' {
    const value: import('webgl-obj-loader').Mesh;
    export default value;
}

interface Locations {
    a_vertices: number,
    a_texture: number,
    u_ctm: WebGLUniformLocation,
    u_color: WebGLUniformLocation
}

declare var webglUtils: any;
declare var gl: WebGL2RenderingContext;
declare var locations: Locations;
declare var vao: WebGLVertexArrayObject;