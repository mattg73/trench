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

varying vec2 vUv;

void main() {
  vec4 texel1 = texture2D( tEnvironment, vUv );
  vec4 texel2 = texture2D( tGemBackFacing, vUv );

  gl_FragColor = mix(texel1, texel2, 1.0-texel1.a);
}
`;
