export const vertexShaderSource = `#version 300 es
precision mediump float;

in vec3 a_position;
in vec3 a_normal;
in vec2 a_texCoord;
in vec4 a_tangent;

uniform mat4 u_viewProjection;
uniform mat4 u_meshTransform;
uniform mat3 u_normalMatrix;

out vec3 v_worldPosition;
out vec3 v_normal;
out vec2 v_texCoord;
out vec4 v_tangent;
out vec3 v_cameraPosition;

void main() {
    vec4 worldPos = u_meshTransform * vec4(a_position, 1.0);
    v_worldPosition = worldPos.xyz;

    v_normal = normalize(u_normalMatrix * a_normal);
    
    v_texCoord = a_texCoord;

    v_tangent = vec4(normalize(u_normalMatrix * a_tangent.xyz), a_tangent.w);

    mat4 invView = inverse(u_viewProjection);
    v_cameraPosition = invView[3].xyz;
    
    gl_Position = u_viewProjection * worldPos;
}`;
