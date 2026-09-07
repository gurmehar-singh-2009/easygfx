export const fragmentShaderSource = `#version 300 es
precision mediump float;

in vec3 v_worldPosition;
in vec3 v_normal;
in vec2 v_texCoord;
in vec4 v_tangent;

uniform vec4 u_albedo;
uniform vec4 u_pbrProperties;
uniform ivec4 u_textureIds;
uniform mediump sampler2DArray u_textures;

uniform vec3 u_cameraPosition;

out vec4 fragColor;

const float PI = 3.14159265359;

vec2 parallax(vec2 texCoords, vec3 viewDirTS, float heightLayer) {
    float height = texture(u_textures, vec3(texCoords, heightLayer)).r * 0.05;
    return texCoords - (viewDirTS.xy * height);
}

float DistributionGGX(vec3 N, vec3 H, float a) {
    a = a * a;
    float a2 = a * a;
    float NdotH = max(dot(N, H), 0.0);
    float NdotH2 = NdotH * NdotH;
	
    float nom = a2;
    float denom = (NdotH2 * (a2 - 1.0) + 1.0);
    denom = PI * denom * denom;

    return nom / denom;
}

float GeometrySchlickGGX(float NdotV, float k) {
    float nom = NdotV;
    float denom = NdotV * (1.0 - k) + k;

    return nom / denom;
}
  
float GeometrySmith(vec3 N, vec3 V, vec3 L, float k) {
    float NdotV = max(dot(N, V), 0.0);
    float NdotL = max(dot(N, L), 0.0);
    float ggx1 = GeometrySchlickGGX(NdotV, k);
    float ggx2 = GeometrySchlickGGX(NdotL, k);

    return ggx1 * ggx2;
}

vec3 fresnelSchlick(float cosTheta, vec3 F0) {
    return F0 + (1.0 - F0) * pow(1.0 - cosTheta, 5.0);
}

vec3 cookTorrenceBRDF(vec3 lightVector, vec3 viewVector, vec3 halfVector, vec3 surfaceNormal, float roughness, vec3 baseReflectivity) {
    float cosTheta = max(dot(halfVector, viewVector), 0.0);

    float D = DistributionGGX(surfaceNormal, halfVector, roughness);
    vec3  F = fresnelSchlick(cosTheta, baseReflectivity);

    float temp = roughness + 1.0;
    float k = (temp * temp) / 8.0;
    float G = GeometrySmith(surfaceNormal, viewVector, lightVector, k);

    float NdotL = max(dot(surfaceNormal, lightVector), 0.0);
    float NdotV = max(dot(surfaceNormal, viewVector), 0.0);

    vec3 numerator = D * F * G;
    float denominator = 4.0 * NdotL * NdotV + 0.0001;

    return numerator / denominator;
}

vec3 acesToneMapping(vec3 x) {
    float a = 2.51;
    float b = 0.03;
    float c = 2.43;
    float d = 0.59;
    float e = 0.14;
    return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
}

void main() { 
    if (u_pbrProperties.w > 0.5) {
        vec4 surfaceColor = u_albedo;
        if (u_textureIds.x >= 0) {
            vec4 textureColor = texture(u_textures, vec3(v_texCoord, float(u_textureIds.x)));
            surfaceColor *= textureColor;
        }
        fragColor = surfaceColor;
        return;
    }


    vec3 N = normalize(v_normal);
    vec3 V = normalize(u_cameraPosition - v_worldPosition);
    vec2 texCoords = v_texCoord;

    if (u_textureIds.w >= 0 && length(v_tangent.xyz) > 0.0) {
        vec3 T = normalize(v_tangent.xyz);
        vec3 B = cross(N, T) * v_tangent.w;
        mat3 worldToTangent = transpose(mat3(T, B, N));

        vec3 viewDirTS = normalize(worldToTangent * V);
        texCoords = parallax(v_texCoord, viewDirTS, float(u_textureIds.w));
    }

    if (u_textureIds.y >= 0 && length(v_tangent.xyz) > 0.0) {
        vec3 T = normalize(v_tangent.xyz);
        vec3 B = cross(N, T) * v_tangent.w;
        mat3 TBN = mat3(T, B, N);

        vec3 mapNormal = texture(u_textures, vec3(texCoords, float(u_textureIds.y))).rgb * 2.0 - 1.0;
        N = normalize(TBN * mapNormal);
    }

    vec4 surfaceColor = u_albedo;
    if (u_textureIds.x >= 0) {
        vec4 textureColor = texture(u_textures, vec3(texCoords, float(u_textureIds.x)));
        surfaceColor *= textureColor;
    }
    vec3 albedoLinear = pow(surfaceColor.rgb, vec3(2.2));

    float roughness = clamp(u_pbrProperties.x, 0.05, 1.0);
    float metallic = clamp(u_pbrProperties.y, 0.0, 1.0);
    float ao = u_pbrProperties.z;

    if (u_textureIds.z >= 0) {
        vec3 orm = texture(u_textures, vec3(texCoords, float(u_textureIds.z))).rgb;
        ao *= orm.r;
        roughness *= orm.g;
        metallic *= orm.b;
        roughness = clamp(roughness, 0.05, 1.0);
    }

    vec3 lightColor = vec3(10.0, 10.0, 10.0);
    vec3 lightVector = normalize(vec3(0.0, 0.0, 1.0));
    vec3 halfVector = normalize(lightVector + V);

    vec3 baseReflectivity = mix(vec3(0.04), albedoLinear, metallic);

    vec3 specularBRDF = cookTorrenceBRDF(lightVector, V, halfVector, N, roughness, baseReflectivity);

    float HdotV = max(dot(halfVector, V), 0.0);
    vec3 kS = fresnelSchlick(HdotV, baseReflectivity);
    vec3 kD = (vec3(1.0) - kS) * (1.0 - metallic);

    float NdotL = max(dot(N, lightVector), 0.0);
    vec3 diffuseBRDF = kD * (albedoLinear / PI);
    vec3 outgoing = (diffuseBRDF + specularBRDF) * lightColor * NdotL;

    vec3 ambient = vec3(0.03) * albedoLinear * ao;
    vec3 color = ambient + outgoing;

    color = acesToneMapping(color);
    color = pow(color, vec3(1.0 / 2.2));

    fragColor = vec4(color, surfaceColor.a);
}`;
