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

declare var webglUtils: any;