// See: https://learnopengl.com/PBR/Lighting

export const fragmentShaderSource = `#version 300 es
precision mediump float;

in vec3 v_worldPosition;
in vec3 v_normal;
in vec2 v_texCoord;
in vec4 v_tangent;

uniform vec4 u_albedo;
uniform vec4 u_pbrProperties;
uniform ivec3 u_textureIds;
uniform mediump sampler2DArray u_textures;

uniform vec3 u_cameraPosition;

out vec4 fragColor;

const float PI = 3.14159265359;

vec3 fresnelSchlick(float cosTheta, vec3 F0)
{
    return F0 + (1.0 - F0) * pow(clamp(1.0 - cosTheta, 0.0, 1.0), 5.0);
}

float DistributionGGX(vec3 N, vec3 H, float roughness)
{
    float a      = roughness*roughness;
    float a2     = a*a;
    float NdotH  = max(dot(N, H), 0.0);
    float NdotH2 = NdotH*NdotH;
	
    float num   = a2;
    float denom = (NdotH2 * (a2 - 1.0) + 1.0);
    denom = PI * denom * denom;
	
    return num / denom;
}

float GeometrySchlickGGX(float NdotV, float roughness)
{
    float r = (roughness + 1.0);
    float k = (r*r) / 8.0;

    float num   = NdotV;
    float denom = NdotV * (1.0 - k) + k;
	
    return num / denom;
}

float GeometrySmith(vec3 N, vec3 V, vec3 L, float roughness)
{
    float NdotV = max(dot(N, V), 0.0);
    float NdotL = max(dot(N, L), 0.0);
    float ggx2  = GeometrySchlickGGX(NdotV, roughness);
    float ggx1  = GeometrySchlickGGX(NdotL, roughness);
	
    return ggx1 * ggx2;
}

vec3 aces(vec3 x) {
    float a = 2.51;
    float b = 0.03;
    float c = 2.43;
    float d = 0.59;
    float e = 0.14;
    return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
}

void main() {
    vec4 surfaceColor = u_albedo;
    if (u_textureIds.x >= 0) {
        vec4 textureColor = texture(u_textures, vec3(v_texCoord, float(u_textureIds.x)));
        surfaceColor *= textureColor;
    }

    if (u_pbrProperties.w > 0.5) {
        fragColor = surfaceColor;
        return;
    }

    surfaceColor.rgb = pow(surfaceColor.rgb, vec3(2.2));

    vec3 lightPosition = vec3(0.0);
    vec3 lightColor = vec3(100.0, 100.0, 110.0);

    vec3 N = normalize(v_normal);
    vec3 V = normalize(u_cameraPosition - v_worldPosition);

    if (u_textureIds.y >= 0 && length(v_tangent.xyz) > 0.0) {
        vec3 T = normalize(v_tangent.xyz);
        vec3 B = cross(N, T) * v_tangent.w;
        mat3 TBN = mat3(T, B, N);

        vec3 mapNormal = texture(u_textures, vec3(v_texCoord, float(u_textureIds.y))).rgb * 2.0 - 1.0;
        N = normalize(TBN * mapNormal);
    }

    float roughness = clamp(u_pbrProperties.x, 0.0001, 1.0);
    float metallic = clamp(u_pbrProperties.y, 0.0, 1.0);
    float ao = u_pbrProperties.z;

    if (u_textureIds.z >= 0) {
        vec3 orm = texture(u_textures, vec3(v_texCoord, float(u_textureIds.z))).rgb;
        ao *= orm.r;
        roughness *= orm.g;
        metallic *= orm.b;
        roughness = clamp(roughness, 0.0001, 1.0);
    }

    vec3 F0 = vec3(0.04);
    F0 = mix(F0, surfaceColor.rgb, metallic);

    vec3 Lo = vec3(0.0);
    
    vec3 diff = lightPosition - v_worldPosition;
    vec3 L = normalize(diff);
    vec3 H = normalize(V + L);
    float distance = length(diff);
    float attenuation = 1.0 / (distance * distance);
    vec3 radiance = lightColor * attenuation;

    float NDF = DistributionGGX(N, H, roughness);
    float G = GeometrySmith(N, V, L, roughness);
    vec3 F = fresnelSchlick(max(dot(H, V), 0.0), F0);
    
    vec3 kS = F;
    vec3 kD = vec3(1.0) - kS;
    kD *= 1.0 - metallic;  
        
    vec3 numerator = NDF * G * F;
    float denominator = 4.0 * max(dot(N, V), 0.0) * max(dot(N, L), 0.0) + 0.0001;
    vec3 specular = numerator / denominator;

    float NdotL = max(dot(N, L), 0.0);
    Lo += (kD * surfaceColor.rgb / PI + specular) * radiance * NdotL;
  
    vec3 ambient = vec3(0.03) * surfaceColor.rgb * ao;
    vec3 color = ambient + Lo;

    color = aces(color);
    color = pow(color, vec3(1.0 / 2.2));

    fragColor = vec4(color, surfaceColor.a);
} `;
