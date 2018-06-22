export const vertexShader = `
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;

export const fragmentShader = `
uniform sampler2D tEnvironment;
uniform sampler2D tGemBackFacing;
uniform sampler2D tGemFrontFacing;

varying vec2 vUv;

void main() {
    vec4 texel1 = texture2D( tEnvironment, vUv );
    vec4 texel2 = texture2D( tGemBackFacing, vUv );
    vec4 texel3 = texture2D( tGemFrontFacing, vUv );

    
    //vec4 composite = texel1*(1.0-texel8.a)+(texel8*texel8.a);
    //composite = composite*(1.0-texel2.a)+(texel2*texel2.a);
    //composite = composite*(1.0-texel3.a)+(texel3*texel3.a);
    //composite = mix(composite, texel4, texel5.r);
    //composite = mix( composite, texel6, texel7.r);
    
    vec4 composite = mix( texel1, texel2, texel2.a);
    gl_FragColor = mix(composite, texel3, texel3.a);

    //gl_FragColor = texel2;
}
`;
