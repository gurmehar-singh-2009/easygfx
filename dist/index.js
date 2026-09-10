class q{title;description;notificationType;parent;duration=5000;accentColor;domContainer=document.createElement("div");titleElm=document.createElement("div");descElm=document.createElement("div");lifetimeElm=document.createElement("div");constructor(t="",e="",r=0,i=document.body){this.title=t;this.description=e;this.notificationType=r;this.parent=i;this.accentColor=this.getColor(),this.titleElm.className="title",this.descElm.className="description",this.lifetimeElm.className="lifetime",this.domContainer.className="notification-container",this.domContainer.setAttribute("role","alert"),this.domContainer.appendChild(this.titleElm),this.domContainer.appendChild(this.descElm),this.domContainer.appendChild(this.lifetimeElm),this.parent.appendChild(this.domContainer),this.domContainer.style.setProperty("--accent-color",this.accentColor),this.domContainer.style.setProperty("--lifetime",`${this.duration}ms`),this.titleElm.textContent=t,this.descElm.textContent=e,this.lifetimeElm.style.backgroundColor=this.accentColor}destroy(){this.domContainer.remove()}getColor(){switch(this.notificationType){case 0:return"#3b82f6";case 1:return"#f59e0b";case 2:return"#f97316";case 3:return"#ff0000";default:return"#3b82f6"}}}class it{currentNotificationId=0;activeNotifications=[];domContainer=document.createElement("div");constructor(){this.domContainer.className="notification-host",document.body.appendChild(this.domContainer)}create(t,e,r){let i=this.currentNotificationId++,a=new q(t,e,r,this.domContainer);this.activeNotifications.push([i,a]),setTimeout(()=>{a.destroy(),this.activeNotifications=this.activeNotifications.filter((n)=>n[0]!==i)},a.duration)}}var C=new it;var nt;((i)=>{i[i.CANVAS=0]="CANVAS";i[i.WEBGL=1]="WEBGL";i[i.WEBGPU=2]="WEBGPU"})(nt||={});class d{x;y;z;w;constructor(t=0,e=0,r=0,i=1){this.x=t,this.y=e,this.z=r,this.w=i}set(t,e,r,i){return this.x=t,this.y=e,this.z=r,this.w=i,this}copy(t){return this.set(t.x,t.y,t.z,t.w)}identity(){return this.set(0,0,0,1)}static identity(t=new d){return t.set(0,0,0,1)}static fromAxisAngle(t,e,r=new d){let i=e*0.5,a=Math.sin(i);return r.set(t.x*a,t.y*a,t.z*a,Math.cos(i))}magnitudeSquared(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}magnitude(){return Math.sqrt(this.magnitudeSquared())}normalize(t=this){let e=this.magnitudeSquared();if(e===0)return t.set(0,0,0,1);let r=1/Math.sqrt(e);return t.set(this.x*r,this.y*r,this.z*r,this.w*r)}static multiply(t,e,r=new d){let{x:i,y:a,z:n,w:o}=t,s=e.x,l=e.y,c=e.z,u=e.w;return r.set(o*s+i*u+a*c-n*l,o*l-i*c+a*u+n*s,o*c+i*l-a*s+n*u,o*u-i*s-a*l-n*c)}multiply(t){return d.multiply(this,t,this)}conjugate(t=this){return t.set(-this.x,-this.y,-this.z,this.w)}}class g{x;y;z;constructor(t,e,r){this.x=t,this.y=e,this.z=r}add(t){return new g(this.x+t.x,this.y+t.y,this.z+t.z)}sub(t){return new g(this.x-t.x,this.y-t.y,this.z-t.z)}mul(t){return new g(this.x*t,this.y*t,this.z*t)}negative(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}mag(){return Math.sqrt(this.mag_squared())}mag_squared(){return this.x*this.x+this.y*this.y+this.z*this.z}clone(){return new g(this.x,this.y,this.z)}normalize(){let t=this.mag();if(t===0)return g.ZERO;return this.mul(1/t)}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}cross(t){return new g(this.y*t.z-this.z*t.y,this.z*t.x-this.x*t.z,this.x*t.y-this.y*t.x)}distanceTo(t){let e=this.x-t.x,r=this.y-t.y,i=this.z-t.z;return Math.sqrt(e*e+r*r+i*i)}squaredDistanceTo(t){let e=this.x-t.x,r=this.y-t.y,i=this.z-t.z;return e*e+r*r+i*i}equals(t){return this.x===t.x&&this.y===t.y&&this.z===t.z}angleBetween(t){let e=Math.sqrt(this.mag_squared()*t.mag_squared());if(e===0)return 0;let r=this.dot(t)/e;return Math.acos(Math.max(-1,Math.min(1,r)))}static get ZERO(){return new g(0,0,0)}}class Y{configs;ctx;constructor(t,e){this.configs=e,this.ctx=t.getContext("2d")}clear(t,e,r,i){this.ctx.fillStyle=`rgba(${t}, ${e}, ${r}, ${i})`,this.ctx.fillRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height)}setColor(t,e,r,i){this.ctx.fillStyle=`rgba(${t}, ${e}, ${r}, ${i})`}drawLine(t,e,r,i,a){this.ctx.lineWidth=a,this.ctx.beginPath(),this.ctx.moveTo(t,e),this.ctx.lineTo(r,i),this.ctx.closePath(),this.ctx.stroke()}drawCircle(t,e,r){this.ctx.beginPath(),this.ctx.arc(t,e,r,0,Math.PI*2),this.ctx.fill()}drawTriangle(t,e,r,i,a,n){this.ctx.beginPath(),this.ctx.moveTo(t,e),this.ctx.lineTo(r,i),this.ctx.lineTo(a,n),this.ctx.lineTo(t,e),this.ctx.closePath(),this.ctx.fill()}drawRect(t,e,r,i){this.ctx.fillRect(t,e,r,i)}drawRegularPolygon(t,e,r,i,a){a=a||0,this.ctx.beginPath();for(let n=a;n<Math.PI*2+a;n+=Math.PI*2/i){let o={x:t+r*Math.cos(n),y:e+r*Math.sin(n)};this.ctx[n===a?"moveTo":"lineTo"](o.x,o.y)}this.ctx.closePath(),this.ctx.fill()}drawPolygon(t){this.ctx.beginPath(),this.ctx.moveTo(t[0].x,t[0].y);for(let e=1;e<t.length;e++)this.ctx.lineTo(t[e].x,t[e].y);this.ctx.closePath(),this.ctx.fill()}drawText(t,e,r,i,a){this.ctx.font=`${i}px sans-serif`,this.ctx.textAlign=a===0?"left":a===1?"center":"right",this.ctx.fillText(r,t,e)}resize(t,e){}flush(){}}var at=`#version 300 es

layout(location = 0) in vec3 a_position;
layout(location = 3) in vec2 a_texCoord;
layout(location = 4) in vec4 a_colour;
layout(location = 5) in float a_type;

out vec2 v_texCoord;
out vec4 v_colour;
out float v_type;

uniform mat4 u_viewProjection;

void main() {
    v_texCoord = a_texCoord;
    v_colour = a_colour;
    v_type = a_type;

    gl_Position = u_viewProjection * vec4(a_position, 1.0);
}`;var ot=`#version 300 es

precision highp float;

in vec2 v_texCoord;
in vec4 v_colour;
in float v_type;

uniform sampler2D u_textures[8];

out vec4 outColour;

void main() {
    if (int(v_type) == 0) {
        vec4 texColor;
        texColor = texture(u_textures[0], v_texCoord);
        outColour = texColor * v_colour;
    } else if (int(v_type) == 1) {
        outColour = v_colour;
    } else {
        vec2 uv = v_texCoord - vec2(0.5);
        float distSq = dot(uv, uv);
        if(distSq > 0.25) discard;
        outColour = v_colour;
    }
}`;class Q{configs;ctx;shaderLocations;vao;vertexBuffer;floatsPerVertex=10;trianglesPerBatch=1e4;batchData;batchOffset;currentColor=[1,0,0,1];viewProjectionMatrix=new Float32Array(16);constructor(t,e){this.configs=e,this.ctx=t.getContext("webgl2"),this.shaderLocations=this.initShaderProgram(at,ot),this.ctx.enable(this.ctx.BLEND),this.ctx.blendFunc(this.ctx.SRC_ALPHA,this.ctx.ONE_MINUS_SRC_ALPHA),this.ctx.useProgram(this.shaderLocations.program),this.vao=this.ctx.createVertexArray(),this.ctx.bindVertexArray(this.vao),this.vertexBuffer=this.ctx.createBuffer(),this.ctx.bindBuffer(this.ctx.ARRAY_BUFFER,this.vertexBuffer),this.ctx.bufferData(this.ctx.ARRAY_BUFFER,this.floatsPerVertex*this.trianglesPerBatch*3*4,this.ctx.DYNAMIC_DRAW);let r=this.floatsPerVertex*4;this.ctx.enableVertexAttribArray(this.shaderLocations.attributes.position),this.ctx.vertexAttribPointer(this.shaderLocations.attributes.position,3,this.ctx.FLOAT,!1,r,0),this.ctx.enableVertexAttribArray(this.shaderLocations.attributes.texCoord),this.ctx.vertexAttribPointer(this.shaderLocations.attributes.texCoord,2,this.ctx.FLOAT,!1,r,12),this.ctx.enableVertexAttribArray(this.shaderLocations.attributes.colour),this.ctx.vertexAttribPointer(this.shaderLocations.attributes.colour,4,this.ctx.FLOAT,!1,r,20),this.ctx.enableVertexAttribArray(this.shaderLocations.attributes.type),this.ctx.vertexAttribPointer(this.shaderLocations.attributes.type,1,this.ctx.FLOAT,!1,r,36),this.ctx.bindVertexArray(null),this.batchData=new Float32Array(this.trianglesPerBatch*3*this.floatsPerVertex),this.batchOffset=0,this.resize(500,500)}initShaderProgram(t,e){let r=this.ctx.createProgram();return this.ctx.attachShader(r,this.loadShader(this.ctx.VERTEX_SHADER,t)),this.ctx.attachShader(r,this.loadShader(this.ctx.FRAGMENT_SHADER,e)),this.ctx.linkProgram(r),{program:r,attributes:{position:this.ctx.getAttribLocation(r,"a_position"),texCoord:this.ctx.getAttribLocation(r,"a_texCoord"),colour:this.ctx.getAttribLocation(r,"a_colour"),type:this.ctx.getAttribLocation(r,"a_type")},uniforms:{viewProjection:this.ctx.getUniformLocation(r,"u_viewProjection")}}}loadShader(t,e){let r=this.ctx.createShader(t);if(this.ctx.shaderSource(r,e),this.ctx.compileShader(r),!this.ctx.getShaderParameter(r,this.ctx.COMPILE_STATUS))throw Error("Shader Error: "+this.ctx.getShaderInfoLog(r));return r}flush(){if(this.batchOffset===0)return;this.ctx.bindBuffer(this.ctx.ARRAY_BUFFER,this.vertexBuffer),this.ctx.bufferSubData(this.ctx.ARRAY_BUFFER,0,this.batchData,0,this.batchOffset),this.ctx.bindVertexArray(this.vao),this.ctx.drawArrays(this.ctx.TRIANGLES,0,this.batchOffset/this.floatsPerVertex),this.ctx.bindVertexArray(null),this.batchOffset=0}addVertex(t,e,r=0,i,a,n,o,s,l,c){if(this.batchOffset+this.floatsPerVertex>this.batchData.length)this.flush();this.batchData[this.batchOffset++]=t,this.batchData[this.batchOffset++]=e,this.batchData[this.batchOffset++]=r,this.batchData[this.batchOffset++]=i,this.batchData[this.batchOffset++]=a,this.batchData[this.batchOffset++]=n,this.batchData[this.batchOffset++]=o,this.batchData[this.batchOffset++]=s,this.batchData[this.batchOffset++]=l,this.batchData[this.batchOffset++]=c}clear(t,e,r,i){this.ctx.clearColor(t/255,e/255,r/255,i),this.ctx.clear(this.ctx.COLOR_BUFFER_BIT)}setColor(t,e,r,i){this.currentColor=[t/255,e/255,r/255,i]}drawLine(t,e,r,i,a){let n=r-t,o=i-e,s=Math.hypot(n,o);if(s===0)return;let l=-o/s*(a/2),c=n/s*(a/2);this.drawTriangle(t+l,e+c,t-l,e-c,r+l,i+c),this.drawTriangle(r+l,i+c,r-l,i-c,t-l,e-c)}drawCircle(t,e,r){let[i,a,n,o]=this.currentColor;this.addVertex(t-r,e-r,0,0,0,i,a,n,o,2),this.addVertex(t+r,e-r,0,1,0,i,a,n,o,2),this.addVertex(t+r,e+r,0,1,1,i,a,n,o,2),this.addVertex(t-r,e-r,0,0,0,i,a,n,o,2),this.addVertex(t-r,e+r,0,0,1,i,a,n,o,2),this.addVertex(t+r,e+r,0,1,1,i,a,n,o,2)}drawRect(t,e,r,i){let[a,n,o,s]=this.currentColor;this.addVertex(t,e,0,0,0,a,n,o,s,1),this.addVertex(t+r,e,0,1,0,a,n,o,s,1),this.addVertex(t+r,e+i,0,1,1,a,n,o,s,1),this.addVertex(t,e,0,0,0,a,n,o,s,1),this.addVertex(t,e+i,0,0,1,a,n,o,s,1),this.addVertex(t+r,e+i,0,1,1,a,n,o,s,1)}drawTriangle(t,e,r,i,a,n){let[o,s,l,c]=this.currentColor;this.addVertex(t,e,0,0,0,o,s,l,c,1),this.addVertex(r,i,0,0,0,o,s,l,c,1),this.addVertex(a,n,0,0,0,o,s,l,c,1)}drawRegularPolygon(t,e,r,i,a=0){if(i<3)return;let n=Math.PI*2/i,o=t+r*Math.cos(a),s=e+r*Math.sin(a);for(let l=1;l<=i;l++){let c=a+l*n,u=t+r*Math.cos(c),h=e+r*Math.sin(c);this.drawTriangle(t,e,o,s,u,h),o=u,s=h}}updateView(t){this.flush(),this.ctx.uniformMatrix4fv(this.shaderLocations.uniforms.viewProjection,!1,t.viewProjectionMatrix.data)}resize(t,e){this.ctx.viewport(0,0,t,e)}}var st=`const PI: f32 = 3.14159265359;

@group(1) @binding(0) var atlas_tex: texture_2d<f32>;
@group(1) @binding(1) var atlas_samp: sampler;

struct VertexOutput {
    @builtin(position) clip_position: vec4<f32>,
    @location(0) uv: vec2<f32>,
    @location(1) world_pos: vec2<f32>,
    @location(2) @interpolate(flat) shape_type: u32,
    @location(3) @interpolate(flat) sides: u32,
    @location(4) @interpolate(flat) fill_color: vec4<f32>,
    @location(5) @interpolate(flat) border_color: vec4<f32>,
    @location(6) @interpolate(flat) border_thickness: f32,
    @location(7) @interpolate(flat) extra_param: f32,
    @location(8) @interpolate(flat) size: vec2<f32>,
};

fn draw_grid(
    world_pos: vec2<f32>,
    cell_size: f32,
    line_width: f32,
    bg_color: vec4<f32>,
    line_color: vec4<f32>,
    line_alpha: f32,
    line_aa: f32,
) -> vec4<f32> {
    let grid_coord = abs(fract(world_pos / cell_size - 0.5) - 0.5) * cell_size;

    let half_width = line_width * 0.5;
    let aa = line_aa;

    let factor_x = 1.0 - smoothstep(half_width - aa, half_width + aa, grid_coord.x);
    let factor_y = 1.0 - smoothstep(half_width - aa, half_width + aa, grid_coord.y);

    let line_factor = max(factor_x, factor_y);

    let factor = line_factor * line_alpha;

    return vec4<f32>(
        mix(bg_color.rgb, line_color.rgb, factor),
        1.0,
    );
}

@fragment
fn fs_main(in: VertexOutput) -> @location(0) vec4<f32> {
    let world_fwidth = fwidth(in.world_pos);
    let grid_line_aa = max(world_fwidth.x, world_fwidth.y);

    let uv_fwidth = fwidth(in.uv);
    let delta = max(uv_fwidth.x, uv_fwidth.y);

    if (in.shape_type == 2u) {
        let cell_size = in.extra_param;
        return draw_grid(
            in.world_pos,
            cell_size,
            in.border_thickness,
            in.fill_color,
            in.border_color,
            in.border_color.a,
            grid_line_aa,
        );
    }

    let min_size = min(in.size.x, in.size.y);
    let border_uv_width = in.border_thickness * (2.0 / min_size);

    if (in.shape_type == 0u) {
        let dist_circle = length(in.uv);
        let alpha = 1.0 - smoothstep(1.0 - delta, 1.0 + delta, dist_circle);
        if (alpha < 0.001) {
            discard;
        }

        let border_mix = smoothstep(1.0 - border_uv_width - delta, 1.0 - border_uv_width + delta, dist_circle);

        let final_color = mix(in.fill_color, in.border_color, border_mix);
        return vec4<f32>(final_color.rgb, final_color.a * alpha);
    }

    if (in.shape_type == 1u) {
        let dist_box = max(abs(in.uv.x), abs(in.uv.y));
        let alpha = 1.0 - smoothstep(1.0 - delta, 1.0 + delta, dist_box);
        if (alpha < 0.001) {
            discard;
        }

        let border_mix = smoothstep(1.0 - border_uv_width - delta, 1.0 - border_uv_width + delta, dist_box);

        let final_color = mix(in.fill_color, in.border_color, border_mix);
        return vec4<f32>(final_color.rgb, final_color.a * alpha);
    }

    if (in.shape_type == 4u) {
        let radius = in.extra_param;
        let q = abs(in.uv) - 1.0 + radius;
        let dist_rounded = length(max(q, vec2<f32>(0.0))) + min(max(q.x, q.y), 0.0) - radius;

        let alpha = 1.0 - smoothstep(0.0 - delta, 0.0 + delta, dist_rounded);
        if (alpha < 0.001) {
            discard;
        }
        return vec4<f32>(in.fill_color.rgb, in.fill_color.a * alpha);
    }

    if (in.shape_type == 3u && in.sides >= 3u) {
        let sides_f = f32(in.sides);
        let angle = atan2(in.uv.y, in.uv.x);
        let slice = (2.0 * PI) / sides_f;

        let apothem = cos(PI / sides_f);
        let dist_poly = (cos(floor(0.5 + angle / slice) * slice - angle) * length(in.uv)) / apothem;

        let alpha = 1.0 - smoothstep(1.0 - delta, 1.0 + delta, dist_poly);
        if (alpha < 0.001) {
            discard;
        }

        let border_mix = smoothstep(1.0 - border_uv_width - delta, 1.0 - border_uv_width + delta, dist_poly);

        let final_color = mix(in.fill_color, in.border_color, border_mix);
        return vec4<f32>(final_color.rgb, final_color.a * alpha);
    }

    if (in.shape_type == 5u) {
        let local01 = (in.uv * 0.5) + vec2<f32>(0.5, 0.5);
        // border_color is repurposed for glyphs: [u0, v0, uWidth, vHeight]
        let atlas_uv = in.border_color.xy + local01 * in.border_color.zw;
        let coverage = textureSampleLevel(atlas_tex, atlas_samp, atlas_uv, 0.0).a;

        if (coverage < 0.01) {
            discard;
        }

        return vec4<f32>(in.fill_color.rgb, in.fill_color.a * coverage);
    }

    return in.fill_color;
}
`;var ct=`struct CameraUniform {
    view_proj: mat4x4<f32>,
    camera_pos: vec3<f32>,
    zoom: f32,
    aspect_ratio: f32,
};

@group(0) @binding(0)
var<uniform> camera: CameraUniform;

struct InstanceInput {
    @location(0) pos: vec3<f32>,
    @location(1) size: vec2<f32>,
    @location(2) rotation: f32,
    @location(3) shape_type: u32,
    @location(4) sides: u32,
    @location(5) fill_color: vec4<f32>,
    @location(6) border_color: vec4<f32>,
    @location(7) border_thickness: f32,
    @location(8) extra_param: f32,
};

struct VertexOutput {
    @builtin(position) clip_position: vec4<f32>,
    @location(0) uv: vec2<f32>,
    @location(1) world_pos: vec2<f32>,
    @location(2) @interpolate(flat) shape_type: u32,
    @location(3) @interpolate(flat) sides: u32,
    @location(4) @interpolate(flat) fill_color: vec4<f32>,
    @location(5) @interpolate(flat) border_color: vec4<f32>,
    @location(6) @interpolate(flat) border_thickness: f32,
    @location(7) @interpolate(flat) extra_param: f32,
    @location(8) @interpolate(flat) size: vec2<f32>,
};

const QUAD_VERTICES: array<vec2<f32>, 6> = array<vec2<f32>, 6>(
    vec2<f32>(-1.0, -1.0),
    vec2<f32>( 1.0, -1.0),
    vec2<f32>(-1.0,  1.0),
    vec2<f32>(-1.0,  1.0),
    vec2<f32>( 1.0, -1.0),
    vec2<f32>( 1.0,  1.0)
);

@vertex
fn vs_main(
    @builtin(vertex_index) vertex_index: u32,
    instance: InstanceInput,
) -> VertexOutput {
    var out: VertexOutput;
    let local_position = QUAD_VERTICES[vertex_index];
    let cos_r = cos(instance.rotation);
    let sin_r = sin(instance.rotation);
    let rot_mat = mat2x2<f32>(cos_r, sin_r, -sin_r, cos_r);
    let local_scaled = local_position * (instance.size * 0.5);
    let rotated_pos = rot_mat * local_scaled;
    let world_pos_2d = instance.pos.xy + rotated_pos;

    out.clip_position = camera.view_proj * vec4<f32>(world_pos_2d, instance.pos.z, 1.0);
    out.uv = local_position;
    out.world_pos = world_pos_2d;
    out.shape_type = instance.shape_type;
    out.sides = instance.sides;
    out.fill_color = instance.fill_color;
    out.border_color = instance.border_color;
    out.border_thickness = instance.border_thickness;
    out.extra_param = instance.extra_param;
    out.size = instance.size;

    return out;
}
`;class _{x;y;constructor(t,e){this.x=t,this.y=e}add(t){return new _(this.x+t.x,this.y+t.y)}sub(t){return new _(this.x-t.x,this.y-t.y)}mul(t){return new _(this.x*t,this.y*t)}mag(){return Math.sqrt(this.mag_squared())}mag_squared(){return this.x*this.x+this.y*this.y}clone(){return new _(this.x,this.y)}normalize(){let t=this.mag();if(t===0)return _.ZERO;return this.mul(1/t)}dot(t){return this.x*t.x+this.y*t.y}distanceTo(t){let e=this.x-t.x,r=this.y-t.y;return Math.sqrt(e*e+r*r)}squaredDistanceTo(t){let e=this.x-t.x,r=this.y-t.y;return e*e+r*r}equals(t){return this.x===t.x&&this.y===t.y}angle(){return Math.atan2(this.y,this.x)}angleBetween(t){let e=Math.sqrt(this.mag_squared()*t.mag_squared());if(e===0)return 0;let r=this.dot(t)/e;return Math.acos(Math.max(-1,Math.min(1,r)))}rotate(t){let e=Math.cos(t),r=Math.sin(t);return new _(this.x*e-this.y*r,this.x*r+this.y*e)}static get ZERO(){return new _(0,0)}}function Gt(t,e,r){return new _((t.x+1)/2*e,(1-(t.y+1)/2)*r)}function Ft(t){return new _(t.x/t.z,t.y/t.z)}function H(t,e,r,i){let a=r[0],n=a+t/i,o=r[1],s=o+e/i;return new Float32Array([2/(n-a),0,0,0,0,-2/(s-o),0,0,0,0,1,0,-(n+a)/(n-a),(s+o)/(s-o),0,1])}function lt(t){let e=t.positions,r=new Float32Array(e.length),i=t.indices,a=i?i.length/3:e.length/9;for(let n=0;n<a;n++){let o=(i?i[n*3]:n*3)*3,s=(i?i[n*3+1]:n*3+1)*3,l=(i?i[n*3+2]:n*3+2)*3,c=e[s]-e[o],u=e[s+1]-e[o+1],h=e[s+2]-e[o+2],m=e[l]-e[o],v=e[l+1]-e[o+1],x=e[l+2]-e[o+2],p=u*x-h*v,b=h*m-c*x,y=c*v-u*m,f=Math.hypot(p,b,y)||1;p/=f,b/=f,y/=f;for(let M of[o,s,l])r[M]=p,r[M+1]=b,r[M+2]=y}return r}class A{static SIZE_BYTES=96;buffer;view;constructor(){this.buffer=new ArrayBuffer(A.SIZE_BYTES),this.view=new Float32Array(this.buffer)}set viewProj(t){this.view.set(t,0)}get viewProj(){return this.view.subarray(0,16)}set cameraPos([t,e,r]){this.view[16]=t,this.view[17]=e,this.view[18]=r}get cameraPos(){return[this.view[16],this.view[17],this.view[18]]}set zoom(t){this.view[19]=t}get zoom(){return this.view[19]}set aspectRatio(t){this.view[20]=t}get aspectRatio(){return this.view[20]}get bytes(){return this.view}}class X{position;size;rotation;shape_type;sides;fill_style;border_color;border_thickness;extra_param;constructor(t,e,r,i,a,n,o,s,l){this.position=t,this.size=e,this.rotation=r,this.shape_type=i,this.sides=a,this.fill_style=n,this.border_color=o,this.border_thickness=s,this.extra_param=l}static desc(){return{arrayStride:72,stepMode:"instance",attributes:[{shaderLocation:0,format:"float32x3",offset:0},{shaderLocation:1,format:"float32x2",offset:12},{shaderLocation:2,format:"float32",offset:20},{shaderLocation:3,format:"uint32",offset:24},{shaderLocation:4,format:"uint32",offset:28},{shaderLocation:5,format:"float32x4",offset:32},{shaderLocation:6,format:"float32x4",offset:48},{shaderLocation:7,format:"float32",offset:64},{shaderLocation:8,format:"float32",offset:68}]}}}class Z{canvas;glyphs=new Map;baseSize;spaceAdvance;constructor(t="sans-serif",e=256,r=" !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~",i=2048){this.baseSize=e,this.canvas=new OffscreenCanvas(i,i);let a=this.canvas.getContext("2d");a.font=`${e}px ${t}`,a.textAlign="left",a.textBaseline="top",a.fillStyle="white";let n=2,o=0,s=0,l=0;for(let c of r){let u=a.measureText(c),h=Math.ceil(u.actualBoundingBoxLeft??0),m=Math.ceil(u.actualBoundingBoxRight??u.width),v=Math.ceil(u.actualBoundingBoxAscent),x=Math.ceil(u.actualBoundingBoxDescent),p=h+m+n*2,b=v+x+n*2;if(o+p>i)o=0,s+=l+n,l=0;a.fillText(c,o+h+n,s+v+n),this.glyphs.set(c,{u0:o/i,v0:s/i,u1:(o+p)/i,v1:(s+b)/i,width:p,height:b,advance:u.width}),o+=p,l=Math.max(l,b)}this.spaceAdvance=this.glyphs.get(" ")?.advance??e*0.3}}var ut=`struct CameraUniform {
    view_proj: mat4x4<f32>,
    camera_pos: vec3<f32>,
    zoom: f32,
    aspect_ratio: f32,
};

@group(0) @binding(0)
var<uniform> camera: CameraUniform;

struct MeshVertexInput {
    @location(0) position: vec3<f32>,
    @location(1) normal: vec3<f32>,
};

struct MeshInstanceInput {
    @location(2) model_col0: vec4<f32>,
    @location(3) model_col1: vec4<f32>,
    @location(4) model_col2: vec4<f32>,
    @location(5) model_col3: vec4<f32>,
    @location(6) color: vec4<f32>,
};

struct VertexOutput {
    @builtin(position) clip_position: vec4<f32>,
    @location(0) world_normal: vec3<f32>,
    @location(1) world_position: vec3<f32>,
    @location(2) @interpolate(flat) color: vec4<f32>,
};

@vertex
fn vs_main(vertex: MeshVertexInput, instance: MeshInstanceInput) -> VertexOutput {
    let model = mat4x4<f32>(
        instance.model_col0,
        instance.model_col1,
        instance.model_col2,
        instance.model_col3,
    );

    var out: VertexOutput;
    let world_position = model * vec4<f32>(vertex.position, 1.0);
    out.clip_position = camera.view_proj * world_position;

    out.world_normal = (model * vec4<f32>(vertex.normal, 0.0)).xyz;
    out.world_position = world_position.xyz;
    out.color = instance.color;
    return out;
}
`;var ht=`struct CameraUniform {
    view_proj: mat4x4<f32>,
    camera_pos: vec3<f32>,
    zoom: f32,
    aspect_ratio: f32,
};

@group(0) @binding(0)
var<uniform> camera: CameraUniform;

struct VertexOutput {
    @location(0) world_normal: vec3<f32>,
    @location(1) world_position: vec3<f32>,
    @location(2) @interpolate(flat) color: vec4<f32>,
};

// notes:
// camera.camera_pos is the world space eye position
@fragment
fn fs_main(in: VertexOutput) -> @location(0) vec4<f32> {
    let n = normalize(in.world_normal);

    // right now its fixed
    let light_dir = normalize(vec3<f32>(0.4, 1.0, 0.3));

    // i do NOT know what most of this does
    // i will learn and then improve the lighting system drastically
    // (i remember a tiny bit from when i made minecraft shaders :thumbsup:)
    // this was from a tutorial though
    let lambert = max(dot(n, light_dir), 0.0);
    let ambient = 0.25;
    let shade = ambient + 0.75 * lambert;

    let view_dir = normalize(camera.camera_pos - in.world_position);
    let half_dir = normalize(light_dir + view_dir);
    let specular = pow(max(dot(n, half_dir), 0.0), 32.0) * 0.35;

    return vec4<f32>(in.color.rgb * shade + vec3<f32>(specular), in.color.a);
}
`;class K{configs;ctx;device;queue;render_pipeline;instance_buffer;camera_buffer;camera_bind_group;num_instances=0;width=1;height=1;clearColor=[1,0,0,1];currentColor=[1,1,1,1];frameInstances=[];cameraPos=[0,0];zoom=1;viewProjectionMatrix=new Float32Array(16);currentZ=0;depth_texture;depth_texture_view;mesh_pipeline;mesh_instance_buffer;meshes=new Map;pendingMeshes=[];frameMeshInstances=[];meshDraws=[];cameraPos3=[0,0,0];fontAtlas;atlas_texture;atlas_sampler;atlas_bind_group_layout;atlas_bind_group;constructor(t,e){this.ctx=t.getContext("webgpu"),this.configs=e,this.fontAtlas=new Z,(async()=>{await this.initializeWebGPU()})()}async initializeWebGPU(){if(!navigator.gpu){alert("WEBGPU IS NOT SUPPORTED ON YOUR DEVICE. PLEASE FIX!!");return}let e=await(await navigator.gpu.requestAdapter())?.requestDevice(),r=e?.queue;if(!e||!r)return;let i=navigator.gpu.getPreferredCanvasFormat();this.ctx.configure({device:e,format:i,alphaMode:"opaque"});let a=this.ctx.canvas;this.width=a.width||1,this.height=a.height||1,this.depth_texture=e.createTexture({label:"depth texture",size:[this.width,this.height],format:"depth24plus",usage:GPUTextureUsage.RENDER_ATTACHMENT}),this.depth_texture_view=this.depth_texture.createView();let n=new A;n.viewProj=H(this.width,this.height,this.cameraPos,this.zoom),n.cameraPos=[0,0,0],n.zoom=0.005,n.aspectRatio=this.ctx.canvas.width/this.ctx.canvas.height;let o=e.createBuffer({label:"camera buffer",size:n.bytes.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST,mappedAtCreation:!0});new Float32Array(o.getMappedRange()).set(n.bytes),o.unmap();let s=e.createBindGroupLayout({label:"camera bind group layout",entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform",hasDynamicOffset:!1,minBindingSize:0}}]}),l=e.createBindGroup({label:"camera bind group",layout:s,entries:[{binding:0,resource:{buffer:o}}]}),c=e.createShaderModule({label:"vertex shader",code:ct}),u=e.createShaderModule({label:"fragment shader",code:st});this.atlas_texture=e.createTexture({label:"font atlas",size:[this.fontAtlas.canvas.width,this.fontAtlas.canvas.height],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT}),e.queue.copyExternalImageToTexture({source:this.fontAtlas.canvas},{texture:this.atlas_texture},[this.fontAtlas.canvas.width,this.fontAtlas.canvas.height]),this.atlas_sampler=e.createSampler({magFilter:"linear",minFilter:"linear"}),this.atlas_bind_group_layout=e.createBindGroupLayout({label:"atlas bind group layout",entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,texture:{}},{binding:1,visibility:GPUShaderStage.FRAGMENT,sampler:{}}]}),this.atlas_bind_group=e.createBindGroup({label:"atlas bind group",layout:this.atlas_bind_group_layout,entries:[{binding:0,resource:this.atlas_texture.createView()},{binding:1,resource:this.atlas_sampler}]});let h=e.createPipelineLayout({label:"Render pipeline layout",bindGroupLayouts:[s,this.atlas_bind_group_layout],immediateSize:0}),m=e.createRenderPipeline({label:"render pipeline",layout:h,vertex:{module:c,entryPoint:"vs_main",buffers:[X.desc()]},fragment:{module:u,entryPoint:"fs_main",targets:[{format:i,blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}},writeMask:GPUColorWrite.ALL}]},depthStencil:{format:"depth24plus",depthWriteEnabled:!0,depthCompare:"less"},multisample:{count:1,mask:4294967295,alphaToCoverageEnabled:!1},primitive:{topology:"triangle-list",frontFace:"ccw",cullMode:"none"}}),v=e.createBuffer({label:"instance buffer",usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST,size:294912,mappedAtCreation:!1}),x=e.createShaderModule({label:"mesh vertex shader",code:ut}),p=e.createShaderModule({label:"mesh fragment shader",code:ht}),b={arrayStride:24,attributes:[{shaderLocation:0,format:"float32x3",offset:0},{shaderLocation:1,format:"float32x3",offset:12}]},y={arrayStride:80,stepMode:"instance",attributes:[{shaderLocation:2,format:"float32x4",offset:0},{shaderLocation:3,format:"float32x4",offset:16},{shaderLocation:4,format:"float32x4",offset:32},{shaderLocation:5,format:"float32x4",offset:48},{shaderLocation:6,format:"float32x4",offset:64}]};this.mesh_pipeline=e.createRenderPipeline({label:"mesh render pipeline",layout:e.createPipelineLayout({label:"mesh pipeline layout",bindGroupLayouts:[s]}),vertex:{module:x,entryPoint:"vs_main",buffers:[b,y]},fragment:{module:p,entryPoint:"fs_main",targets:[{format:i}]},depthStencil:{format:"depth24plus",depthWriteEnabled:!0,depthCompare:"less"},multisample:{count:1,mask:4294967295,alphaToCoverageEnabled:!1},primitive:{topology:"triangle-list",frontFace:"ccw",cullMode:"none"}}),this.mesh_instance_buffer=e.createBuffer({label:"mesh instance buffer",usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST,size:81920}),this.device=e,this.queue=r,this.render_pipeline=m,this.instance_buffer=v,this.camera_buffer=o,this.camera_bind_group=l,this.depth_texture=this.depth_texture,this.depth_texture_view=this.depth_texture_view;for(let[f,M]of this.pendingMeshes)this.uploadMesh(f,M);this.pendingMeshes.length=0}resize(t,e){if(!this.queue||!this.camera_buffer||!this.device)return;let r=window.devicePixelRatio,i=Math.floor(t*r),a=Math.floor(e*r);if(i>0&&a>0){if(this.width=i,this.height=a,this.ctx.canvas instanceof HTMLCanvasElement)this.ctx.canvas.width=i,this.ctx.canvas.height=a;this.depth_texture?.destroy(),this.depth_texture=this.device.createTexture({label:"depth texture",size:[i,a],format:"depth24plus",usage:GPUTextureUsage.RENDER_ATTACHMENT}),this.depth_texture_view=this.depth_texture.createView()}}update(t){if(this.num_instances=t.length,t.length===0)return;let e=18,r=new Float32Array(t.length*e),i=new Uint32Array(r.buffer);t.forEach((n,o)=>{let s=o*e;r[s+0]=n.position[0],r[s+1]=n.position[1],r[s+2]=n.position[2],r[s+3]=n.size[0],r[s+4]=n.size[1],r[s+5]=n.rotation,i[s+6]=n.shape_type,i[s+7]=n.sides,r[s+8]=n.fill_style[0],r[s+9]=n.fill_style[1],r[s+10]=n.fill_style[2],r[s+11]=n.fill_style[3],r[s+12]=n.border_color[0],r[s+13]=n.border_color[1],r[s+14]=n.border_color[2],r[s+15]=n.border_color[3],r[s+16]=n.border_thickness,r[s+17]=n.extra_param});let a=r.byteLength;if(a>this.instance_buffer.size)this.instance_buffer.destroy(),this.instance_buffer=this.device.createBuffer({label:"dyn instance buffer",size:a,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST,mappedAtCreation:!0}),new Float32Array(this.instance_buffer.getMappedRange()).set(r),this.instance_buffer.unmap();else this.queue.writeBuffer(this.instance_buffer,0,r)}update_camera(t,e){let r=Math.max(1,this.width/this.height),i=new A;i.viewProj=H(this.width,this.height,t,e),i.cameraPos=[...t,0],i.zoom=e,i.aspectRatio=r,this.queue.writeBuffer(this.camera_buffer,0,i.bytes.buffer)}render_entities_with_text(t,e,r){if(!t.length)return;this.update_camera(e,r),this.update(t);let a=this.ctx.getCurrentTexture().createView(),n=this.device.createCommandEncoder({label:"entities render encoder"}),o=n.beginRenderPass({label:"entities render pass",colorAttachments:[{view:a,resolveTarget:void 0,depthSlice:void 0,loadOp:"clear",clearValue:{r:this.clearColor[0],g:this.clearColor[1],b:this.clearColor[2],a:this.clearColor[3]},storeOp:"store"}],depthStencilAttachment:{view:this.depth_texture_view,depthClearValue:1,depthLoadOp:"clear",depthStoreOp:"store"},occlusionQuerySet:void 0,timestampWrites:void 0});o.setPipeline(this.render_pipeline),o.setBindGroup(0,this.camera_bind_group),o.setBindGroup(1,this.atlas_bind_group),o.setVertexBuffer(0,this.instance_buffer),o.draw(6,this.num_instances),o.end(),this.queue.submit([n.finish()])}pushInstance(t){let[e,r,i,a]=this.currentColor;this.frameInstances.push({position:[...t.position,this.currentZ],size:t.size,rotation:t.rotation,shape_type:t.shape_type,sides:t.sides??0,fill_style:[e,r,i,a],border_color:[0,0,0,0],border_thickness:0,extra_param:t.extra_param??0})}clear(t,e,r,i){this.clearColor=[t/255,e/255,r/255,i]}setColor(t,e,r,i){this.currentColor=[t/255,e/255,r/255,i]}drawTriangle(t,e,r,i,a,n){let o=(t+r+a)/3,s=(e+i+n)/3,l=(Math.hypot(t-o,e-s)+Math.hypot(r-o,i-s)+Math.hypot(a-o,n-s))/3,c=Math.atan2(e-s,t-o);this.pushInstance({position:[o,s],size:[l*2,l*2],rotation:c,shape_type:3,sides:3})}drawRect(t,e,r,i){this.pushInstance({position:[t+r/2,e+i/2],size:[r,i],rotation:0,shape_type:1})}drawRegularPolygonImpl(t,e,r,i,a=0){this.pushInstance({position:[t,e],size:[r,r],rotation:a,shape_type:3,sides:i})}drawCustomSides(t,e,r,i,a){this.drawRegularPolygonImpl(t,e,r,i,a)}drawRegularPolygon(t,e,r,i,a){this.drawRegularPolygonImpl(t,e,r,i,a)}drawPolygon(t){if(!t.length)return;let e=t.reduce((n,o)=>n+o.x,0)/t.length,r=t.reduce((n,o)=>n+o.y,0)/t.length,i=t.reduce((n,{x:o,y:s})=>n+Math.hypot(o-e,s-r),0)/t.length,a=Math.atan2(t[0].y-r,t[0].x-e);this.pushInstance({position:[e,r],size:[i*2,i*2],rotation:a,shape_type:3,sides:t.length})}drawLine(t,e,r,i,a){let n=(t+r)/2,o=(e+i)/2,s=Math.hypot(r-t,i-e),l=Math.atan2(i-e,r-t);this.pushInstance({position:[n,o],size:[s,a],rotation:l,shape_type:1})}drawCircle(t,e,r){this.pushInstance({position:[t,e],size:[r*2,r*2],rotation:0,shape_type:3,sides:32})}flush(){if(!this.device||!this.queue||!this.render_pipeline){this.frameInstances.length=0,this.frameMeshInstances.length=0;return}this.update(this.frameInstances),this.updateMeshInstances();let t=this.ctx.getCurrentTexture().createView(),e=this.device.createCommandEncoder({label:"immediate-mode frame encoder"}),r=e.beginRenderPass({label:"immediate-mode frame pass",colorAttachments:[{view:t,loadOp:"clear",clearValue:{r:this.clearColor[0],g:this.clearColor[1],b:this.clearColor[2],a:this.clearColor[3]},storeOp:"store"}],depthStencilAttachment:{view:this.depth_texture_view,depthClearValue:1,depthLoadOp:"clear",depthStoreOp:"store"}});if(this.meshDraws.length>0){r.setPipeline(this.mesh_pipeline),r.setBindGroup(0,this.camera_bind_group);for(let i of this.meshDraws)if(r.setVertexBuffer(0,i.mesh.vertexBuffer),r.setVertexBuffer(1,this.mesh_instance_buffer,i.byteOffset),i.mesh.indexBuffer)r.setIndexBuffer(i.mesh.indexBuffer,"uint32"),r.drawIndexed(i.mesh.indexCount,i.instanceCount);else r.draw(i.mesh.vertexCount,i.instanceCount)}if(this.num_instances>0)r.setPipeline(this.render_pipeline),r.setBindGroup(0,this.camera_bind_group),r.setBindGroup(1,this.atlas_bind_group),r.setVertexBuffer(0,this.instance_buffer),r.draw(6,this.num_instances);r.end(),this.queue.submit([e.finish()]),this.frameInstances=[],this.frameMeshInstances=[]}pushGlyphInstance(t,e,r){let[i,a,n,o]=this.currentColor;this.frameInstances.push({position:[...t,this.currentZ],size:e,rotation:0,shape_type:5,sides:0,fill_style:[i,a,n,o],border_color:r,border_thickness:0,extra_param:0})}setDepth(t){this.currentZ=t}drawText(t,e,r,i,a){if(!this.fontAtlas)return;let n=i/this.fontAtlas.baseSize,o=0;for(let l of r){let c=this.fontAtlas.glyphs.get(l);o+=c?c.advance*n:this.fontAtlas.spaceAdvance*n}let s=t;if(a===1)s-=o/2;else if(a===2)s-=o;for(let l of r){let c=this.fontAtlas.glyphs.get(l);if(!c){s+=this.fontAtlas.spaceAdvance*n;continue}let u=c.width*n,h=c.height*n;this.pushGlyphInstance([s+u/2,e+h/2],[u,h],[c.u0,c.v0,c.u1-c.u0,c.v1-c.v0]),s+=c.advance*n}}updateView(t){if(!this.queue||!this.camera_buffer)return;this.viewProjectionMatrix.set(t.viewProjectionMatrix.data),this.cameraPos3=[t.position.x,t.position.y,t.position.z];let e=new A;e.viewProj=this.viewProjectionMatrix,e.cameraPos=this.cameraPos3,e.zoom=this.zoom,e.aspectRatio=this.width/Math.max(1,this.height),this.queue.writeBuffer(this.camera_buffer,0,e.bytes.buffer)}createMesh(t,e){if(!this.device){this.pendingMeshes.push([t,e]);return}this.uploadMesh(t,e)}uploadMesh(t,e){if(e.positions.length%3!==0)throw Error("meshdata.positions length must be a multiple of 3");let r=e.normals??lt(e),i=e.positions.length/3,a=new Float32Array(i*6);for(let c=0;c<i;c++)a[c*6+0]=e.positions[c*3],a[c*6+1]=e.positions[c*3+1],a[c*6+2]=e.positions[c*3+2],a[c*6+3]=r[c*3],a[c*6+4]=r[c*3+1],a[c*6+5]=r[c*3+2];let n=this.device.createBuffer({label:`mesh ${t} vertices`,size:a.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST,mappedAtCreation:!0});new Float32Array(n.getMappedRange()).set(a),n.unmap();let o,s=0;if(e.indices&&e.indices.length>0)s=e.indices.length,o=this.device.createBuffer({label:`mesh ${t} indices`,size:e.indices.byteLength,usage:GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST,mappedAtCreation:!0}),new Uint32Array(o.getMappedRange()).set(e.indices),o.unmap();let l=this.meshes.get(t);this.meshes.set(t,{vertexBuffer:n,indexBuffer:o,vertexCount:i,indexCount:s}),l?.vertexBuffer.destroy(),l?.indexBuffer?.destroy()}updateMeshInstances(){if(this.meshDraws=[],!this.frameMeshInstances.length)return;let t=20,e=new Map;for(let n of this.frameMeshInstances){let o=e.get(n.meshId);if(o)o.push(n);else e.set(n.meshId,[n])}let r=new Float32Array(this.frameMeshInstances.length*t),i=0;for(let[n,o]of e){let s=this.meshes.get(n);if(!s){console.warn(`WebGPUBackend: drawMesh referenced unknown mesh id ${n}`);continue}let l=i;for(let c of o)this.composeModelMatrix(c,r,i),r[i+16]=c.color[0],r[i+17]=c.color[1],r[i+18]=c.color[2],r[i+19]=c.color[3],i+=t;this.meshDraws.push({mesh:s,byteOffset:l*4,instanceCount:o.length})}if(i===0)return;let a=i*4;if(a>this.mesh_instance_buffer.size)this.mesh_instance_buffer.destroy(),this.mesh_instance_buffer=this.device.createBuffer({label:"dyn mesh instance buffer",size:a,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST,mappedAtCreation:!0}),new Float32Array(this.mesh_instance_buffer.getMappedRange()).set(r.subarray(0,i)),this.mesh_instance_buffer.unmap();else this.queue.writeBuffer(this.mesh_instance_buffer,0,r,0,i)}composeModelMatrix(t,e,r){let[i,a,n]=t.position,[o,s,l,c]=t.rotation,[u,h,m]=t.scale,v=Math.hypot(o,s,l,c)||1,x=o/v,p=s/v,b=l/v,y=c/v;e[r+0]=(1-2*(p*p+b*b))*u,e[r+1]=2*(x*p+y*b)*u,e[r+2]=2*(x*b-y*p)*u,e[r+3]=0,e[r+4]=2*(x*p-y*b)*h,e[r+5]=(1-2*(x*x+b*b))*h,e[r+6]=2*(p*b+y*x)*h,e[r+7]=0,e[r+8]=2*(x*b+y*p)*m,e[r+9]=2*(p*b-y*x)*m,e[r+10]=(1-2*(x*x+p*p))*m,e[r+11]=0,e[r+12]=i,e[r+13]=a,e[r+14]=n,e[r+15]=1}drawMesh(t,e,r,i){let[a,n,o,s]=this.currentColor;this.frameMeshInstances.push({meshId:t,position:[e.x,e.y,e.z],rotation:[r.x,r.y,r.z,r.w],scale:[i.x,i.y,i.z],color:[a,n,o,s]})}}class J{configs;backend;warnedNoView=!1;constructor(t,e){if(this.configs=e,e.backend===2){let i=(a)=>{let n=document.createElement("dialog");n.style.cssText=`
          all: initial !important;
          position: fixed !important;
          inset: 0 !important;
          width: 100vw !important;
          height: 100vh !important;
          max-width: none !important;
          max-height: none !important;
          margin: 0 !important;
          padding: 0 !important;
          border: 0 !important;
          background: transparent !important;
          color: initial !important;
          font: initial !important;
          z-index: 2147483647 !important;
        `;let o=document.createElement("div");o.style.cssText=`
          all: initial !important;
          position: absolute !important;
          top: 50% !important;
          left: 50% !important;
          transform: translate(-50%, -50%) !important;

          box-sizing: border-box !important;
          width: min(500px, calc(100vw - 40px)) !important;

          padding: 24px !important;
          border: 1px solid #444 !important;
          border-radius: 10px !important;

          background: #1e1e1e !important;
          color: #ffffff !important;

          font-family: Arial, sans-serif !important;
          font-size: 16px !important;
          line-height: 1.5 !important;

          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5) !important;
        `;let s=document.createElement("h2");s.textContent="WebGPU is unavailable",s.style.cssText=`
          all: initial !important;
          display: block !important;
          margin: 0 0 12px 0 !important;

          color: #ffffff !important;
          font-family: Arial, sans-serif !important;
          font-size: 22px !important;
          font-weight: 700 !important;
          line-height: 1.2 !important;
        `;let l=document.createElement("p");l.textContent=a,l.style.cssText=`
          all: initial !important;
          display: block !important;
          margin: 0 0 16px 0 !important;

          color: #dddddd !important;
          font-family: Arial, sans-serif !important;
          font-size: 16px !important;
          line-height: 1.5 !important;
        `;let c=document.createElement("a");c.href="https://developer.chrome.com/docs/web-platform/webgpu/troubleshooting-tips",c.target="_blank",c.rel="noopener noreferrer",c.textContent="Open the WebGPU troubleshooting guide",c.style.cssText=`
          all: initial !important;
          display: inline-block !important;
          margin-bottom: 16px !important;

          color: #6ea8fe !important;
          font-family: Arial, sans-serif !important;
          font-size: 16px !important;
          text-decoration: underline !important;
          cursor: pointer !important;
        `;let u=document.createElement("button");u.type="button",u.textContent="Copy link",u.style.cssText=`
          all: initial !important;
          display: inline-block !important;

          box-sizing: border-box !important;
          padding: 8px 14px !important;

          border: 1px solid #555 !important;
          border-radius: 6px !important;

          background: #333333 !important;
          color: #ffffff !important;

          font-family: Arial, sans-serif !important;
          font-size: 14px !important;

          cursor: pointer !important;
        `,u.addEventListener("click",async()=>{try{await navigator.clipboard.writeText("https://developer.chrome.com/docs/web-platform/webgpu/troubleshooting-tips"),u.textContent="Copied!"}catch{u.textContent="Copy failed"}});let h=document.createElement("button");h.type="button",h.textContent="Close",h.style.cssText=`
          all: initial !important;
          display: inline-block !important;

          box-sizing: border-box !important;
          margin-left: 8px !important;
          padding: 8px 14px !important;

          border: 1px solid #555 !important;
          border-radius: 6px !important;

          background: #333333 !important;
          color: #ffffff !important;

          font-family: Arial, sans-serif !important;
          font-size: 14px !important;

          cursor: pointer !important;
        `,h.addEventListener("click",()=>{n.close(),n.remove()}),o.appendChild(s),o.appendChild(l),o.appendChild(c),o.appendChild(document.createElement("br")),o.appendChild(u),o.appendChild(h),n.appendChild(o),document.body.appendChild(n);let m=document.createElement("style");m.textContent=`
          dialog[webgpu-error-dialog] {
            all: initial !important;
          }

          dialog[webgpu-error-dialog]::backdrop {
            all: initial !important;
            background: rgba(0, 0, 0, 0.75) !important;
          }
        `,document.head.appendChild(m),n.setAttribute("webgpu-error-dialog",""),n.addEventListener("close",()=>{m.remove(),n.remove()},{once:!0}),n.showModal()};if(!navigator.gpu)throw i("Your browser does not currently provide WebGPU. Please enable WebGPU or use a browser that supports it."),Error("WebGPU is not available.");(async()=>{if(!await navigator.gpu.requestAdapter())throw i("WebGPU is available, but your browser could not find a compatible GPU adapter. Make sure hardware acceleration and WebGPU are enabled."),Error("No WebGPU adapter available.")})()}switch(e.backend){case 0:this.backend=new Y(t,e);break;case 2:this.backend=new K(t,e);break;case 1:this.backend=new Q(t,e);break;default:throw Error(`Unsupported backend: ${String(e.backend)}`)}}fn(t){let e=this.backend[t];if(typeof e!=="function")throw Error(`${this.backend.constructor.name} does not implement '${String(t)}()'.`);return e}clear(t,e,r,i){this.fn("clear").call(this.backend,t,e,r,i)}setColor(t,e,r,i){this.fn("setColor").call(this.backend,t,e,r,i)}drawLine(t,e,r){this.fn("drawLine").call(this.backend,t.x,t.y,e.x,e.y,r)}drawCircle(t,e,r){this.fn("drawCircle").call(this.backend,t,e,r)}drawRect(t,e,r,i,a){this.fn("drawRect").call(this.backend,t,e,r,i,a)}drawTriangle(t,e,r,i,a,n){this.fn("drawTriangle").call(this.backend,t,e,r,i,a,n)}drawRegularPolygon(t,e,r,i,a){this.fn("drawRegularPolygon").call(this.backend,t,e,r,i,a)}drawPolygon(t){this.fn("drawPolygon").call(this.backend,t)}drawText(t,e,r,i,a){this.fn("drawText").call(this.backend,t,e,r,i,a)}setDepth(t){this.fn("setDepth").call(this.backend,t)}createMesh(t,e){this.fn("createMesh").call(this.backend,t,e)}drawMesh(t,e,r=d.identity(),i=new g(1,1,1)){this.fn("drawMesh").call(this.backend,t,e,r,i)}updateView(t){if(typeof this.backend.updateView!=="function"){if(!this.warnedNoView)console.warn(`${this.backend.constructor.name} does not implement 'updateView()'.`),this.warnedNoView=!0;return}this.backend.updateView(t)}setCamera(t){this.updateView(t)}resize(t,e){this.backend.resize?.(t,e)}drawPentagon(t,e,r,i){this.drawRegularPolygon(t,e,r,5,i)}drawHexagon(t,e,r,i){this.drawRegularPolygon(t,e,r,6,i)}drawSeptagon(t,e,r,i){this.drawRegularPolygon(t,e,r,7,i)}drawOctagon(t,e,r,i){this.drawRegularPolygon(t,e,r,8,i)}processFrame(t){if(this.configs.debug)this.drawDebugPanel(t);this.fn("flush").call(this.backend)}drawDebugPanel(t){this.setColor(0,0,0,1),this.drawRect(10,10,400,200),this.setColor(255,255,255,1),this.drawText(200,35,"DEBUG PANEL",18,1),this.drawText(20,85,`FPS: ${t.toFixed(2)}`,16,0);let e=performance.memory;this.drawText(20,105,`Memory: ${e?`${(e.usedJSHeapSize/1048576).toFixed(2)}MB / ${(e.jsHeapSizeLimit/1048576).toFixed(2)}MB`:"N/A"}`,16,0),this.drawText(20,125,`CPU Cores: ${navigator.hardwareConcurrency||"N/A"}`,16,0),this.drawText(20,145,`Resolution: ${window.innerWidth}x${window.innerHeight}`,16,0),this.drawText(20,165,`Network: ${navigator.onLine?"Online":"Offline"} (${navigator.connection?.effectiveType||"unknown"})`,16,0)}}class ft{canvas;activeCamera;renderEvent;active=!1;fps=60;lastFrameTimestamp=performance.now();width;height;onFrame=()=>{};constructor(t,e){this.canvas=t,this.width=t.width||100,this.height=t.height||100,this.renderEvent=new J(t,e)}start(){if(this.active)return;this.active=!0,this.lastFrameTimestamp=performance.now();let t=(e)=>{if(!this.active)return;let r=Math.min(e-this.lastFrameTimestamp,100);if(this.lastFrameTimestamp=e,r>0){let i=1000/r;this.fps=this.fps*0.9+i*0.1}if(this.onFrame(this.renderEvent,e,r),this.activeCamera)this.renderEvent.updateView(this.activeCamera);this.renderEvent.processFrame(this.fps),requestAnimationFrame(t)};requestAnimationFrame(t)}stop(){this.active=!1}setCamera(t){this.activeCamera=t,this.activeCamera.resize(this.width,this.height),this.renderEvent.updateView(this.activeCamera)}resize(t,e){if(this.width=t,this.height=e,this.canvas.width=t,this.canvas.height=e,this.renderEvent.resize(t,e),this.activeCamera)this.activeCamera.resize(t,e),this.renderEvent.updateView(this.activeCamera)}}class P{elements;rows;cols;constructor(t,e,r){this.rows=t,this.cols=e;let i=t*e;if(r){if(r.length!==i)throw Error(`Expected ${i} elements for a ${t}x${e} matrix, but got ${r.length}.`);this.elements=[...r]}else this.elements=Array(i).fill(0)}get(t,e){if(t<0||t>=this.rows||e<0||e>=this.cols)throw Error(`Index (${t}, ${e}) out of bounds for a ${this.rows}x${this.cols} matrix.`);return this.elements[t*this.cols+e]}set(t,e,r){if(t<0||t>=this.rows||e<0||e>=this.cols)throw Error(`Index (${t}, ${e}) out of bounds for a ${this.rows}x${this.cols} matrix.`);return this.elements[t*this.cols+e]=r,this}static identity(t){let e=new P(t,t);for(let r=0;r<t;r++)e.elements[r*t+r]=1;return e}static zeros(t,e){return new P(t,e)}clone(){return new P(this.rows,this.cols,this.elements)}transpose(){let t=new P(this.cols,this.rows);for(let e=0;e<this.rows;e++)for(let r=0;r<this.cols;r++)t.set(r,e,this.get(e,r));return t}multiply(t){let e=this.rows,r=t.cols,i=this.cols,a=Array(e*r).fill(0);for(let n=0;n<e;n++)for(let o=0;o<r;o++){let s=0;for(let l=0;l<i;l++)s+=this.get(n,l)*t.get(l,o);a[n*r+o]=s}return new P(e,r,a)}add(t){let e=this.elements.map((r,i)=>r+t.elements[i]);return new P(this.rows,this.cols,e)}sub(t){let e=this.elements.map((r,i)=>r-t.elements[i]);return new P(this.rows,this.cols,e)}scale(t){let e=this.elements.map((r)=>r*t);return new P(this.rows,this.cols,e)}equals(t){if(this.rows!==t.rows||this.cols!==t.cols)return!1;return this.elements.every((e,r)=>e===t.elements[r])}}class w{data=new Float32Array(16);constructor(t=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]){this.data.set(t)}static fromQuaternion(t,e=new w){t.normalize();let{x:r,y:i,z:a,w:n}=t,o=r+r,s=i+i,l=a+a,c=n*o,u=n*s,h=n*l,m=r*o,v=r*s,x=r*l,p=i*s,b=i*l,y=a*l,f=e.data;return f[0]=1-p-y,f[1]=v+h,f[2]=x-u,f[3]=0,f[4]=v-h,f[5]=1-m-y,f[6]=b+c,f[7]=0,f[8]=x+u,f[9]=b-c,f[10]=1-m-p,f[11]=0,f[12]=0,f[13]=0,f[14]=0,f[15]=1,e}static fromVector3(t,e=new w){let{x:r,y:i,z:a}=t,n=e.data;return n[0]=1,n[1]=0,n[2]=0,n[3]=0,n[4]=0,n[5]=1,n[6]=0,n[7]=0,n[8]=0,n[9]=0,n[10]=1,n[11]=0,n[12]=r,n[13]=i,n[14]=a,n[15]=1,e}static multiply(t,e,r=new w){let i=r.data,a=t.data,n=e.data,o=a[0],s=a[1],l=a[2],c=a[3],u=a[4],h=a[5],m=a[6],v=a[7],x=a[8],p=a[9],b=a[10],y=a[11],f=a[12],M=a[13],E=a[14],z=a[15],V=n[0],T=n[1],L=n[2],R=n[3],B=n[4],U=n[5],S=n[6],D=n[7],k=n[8],I=n[9],G=n[10],F=n[11],O=n[12],N=n[13],j=n[14],W=n[15];return i[0]=o*V+u*T+x*L+f*R,i[1]=s*V+h*T+p*L+M*R,i[2]=l*V+m*T+b*L+E*R,i[3]=c*V+v*T+y*L+z*R,i[4]=o*B+u*U+x*S+f*D,i[5]=s*B+h*U+p*S+M*D,i[6]=l*B+m*U+b*S+E*D,i[7]=c*B+v*U+y*S+z*D,i[8]=o*k+u*I+x*G+f*F,i[9]=s*k+h*I+p*G+M*F,i[10]=l*k+m*I+b*G+E*F,i[11]=c*k+v*I+y*G+z*F,i[12]=o*O+u*N+x*j+f*W,i[13]=s*O+h*N+p*j+M*W,i[14]=l*O+m*N+b*j+E*W,i[15]=c*O+v*N+y*j+z*W,r}static getPerspectiveMatrix(t,e,r,i,a=new w){if(r<=0||r===i)return console.warn("Invalid near/far values."),a;let n=a.data,o=1/Math.tan(t*Math.PI/360),s=1/(r-i);return n[0]=o/e,n[1]=0,n[2]=0,n[3]=0,n[4]=0,n[5]=o,n[6]=0,n[7]=0,n[8]=0,n[9]=0,n[10]=(i+r)*s,n[11]=-1,n[12]=0,n[13]=0,n[14]=2*i*r*s,n[15]=0,a}static getOrthographicMatrix(t,e,r,i,a=-1,n=1,o=new w){if(t===e)return console.warn("Invalid left/right values."),o;if(r===i)return console.warn("Invalid bottom/top values."),o;if(a===n)return console.warn("Invalid near/far values."),o;let s=1/(t-e),l=1/(r-i),c=1/(a-n),u=o.data;return u[0]=-2*s,u[1]=0,u[2]=0,u[3]=0,u[4]=0,u[5]=-2*l,u[6]=0,u[7]=0,u[8]=0,u[9]=0,u[10]=2*c,u[11]=0,u[12]=(t+e)*s,u[13]=(i+r)*l,u[14]=(n+a)*c,u[15]=1,o}}class xt{position;rotation;fov;aspectRatio;near;far;projectionMatrix=new w;viewMatrix=new w;viewProjectionMatrix=new w;constructor(t=60,e=1.7777777777777777,r=0.1,i=1000,a=new g(0,0,0),n=d.identity()){this.fov=t,this.aspectRatio=e,this.near=r,this.far=i,this.position=a,this.rotation=n,this.updateProjectionMatrix(),this.updateViewMatrix(),this.updateViewProjectionMatrix()}update(){this.updateViewMatrix(),this.updateViewProjectionMatrix()}updateProjectionMatrix(){w.getPerspectiveMatrix(this.fov,this.aspectRatio,this.near,this.far,this.projectionMatrix)}updateViewMatrix(){let t=this.rotation.conjugate(new d),e=w.fromQuaternion(t),r=new w;r.data[12]=-this.position.x,r.data[13]=-this.position.y,r.data[14]=-this.position.z,w.multiply(e,r,this.viewMatrix)}resize(t,e){if(e<=0)return;this.aspectRatio=t/e,this.updateProjectionMatrix(),this.updateViewProjectionMatrix()}updateViewProjectionMatrix(){w.multiply(this.projectionMatrix,this.viewMatrix,this.viewProjectionMatrix)}}class vt{position;rotation;left;right;top;bottom;near;far;projectionMatrix=new w;viewMatrix=new w;viewProjectionMatrix=new w;constructor(t,e=1.7777777777777777,r=-1,i=1,a=new g(0,0,0),n=d.identity()){this.left=-t/2,this.right=t/2,this.top=t/e/2,this.bottom=-(t/e)/2,this.near=r,this.far=i,this.position=a,this.rotation=n,this.updateProjectionMatrix(),this.updateViewMatrix(),this.updateViewProjectionMatrix()}update(){this.updateViewMatrix(),this.updateViewProjectionMatrix()}updateProjectionMatrix(){w.getOrthographicMatrix(this.left,this.right,this.bottom,this.top,this.near,this.far,this.projectionMatrix)}updateViewMatrix(){let t=this.rotation.conjugate(new d),e=w.fromQuaternion(t),r=new w;r.data[12]=-this.position.x,r.data[13]=-this.position.y,r.data[14]=-this.position.z,w.multiply(e,r,this.viewMatrix)}updateViewProjectionMatrix(){w.multiply(this.projectionMatrix,this.viewMatrix,this.viewProjectionMatrix)}resize(t,e){if(e<=0)return;this.left=-t/2,this.right=t/2,this.top=e/2,this.bottom=-e/2,this.updateProjectionMatrix(),this.updateViewProjectionMatrix()}}var tt=new g(1,0,0),et=new g(0,1,0);function rt(t,e,r,i){let a=2*(t.y*i-t.z*r),n=2*(t.z*e-t.x*i),o=2*(t.x*r-t.y*e);return[e+t.w*a+(t.y*o-t.z*n),r+t.w*n+(t.z*a-t.x*o),i+t.w*o+(t.x*n-t.y*a)]}class wt{camera;enabled=!0;target;distance;yaw;pitch;minDistance;maxDistance;minPitch;maxPitch;rotateSpeed;panSpeed;zoomSpeed;dragMode=0;lastX=0;lastY=0;constructor(t,e={}){this.camera=t,this.target=e.target??new g(0,0,0),this.distance=e.distance??10,this.yaw=e.yaw??0,this.pitch=e.pitch??Math.PI/6,this.minDistance=e.minDistance??0.1,this.maxDistance=e.maxDistance??2000,this.minPitch=e.minPitch??-Math.PI/2+0.01,this.maxPitch=e.maxPitch??Math.PI/2-0.01,this.rotateSpeed=e.rotateSpeed??0.005,this.panSpeed=e.panSpeed??0.002,this.zoomSpeed=e.zoomSpeed??0.001}attach(t){let e=(o)=>{if(!this.enabled)return;this.dragMode=o.button===0&&!o.shiftKey?1:2,this.lastX=o.clientX,this.lastY=o.clientY,t.setPointerCapture(o.pointerId)},r=(o)=>{if(!this.enabled||this.dragMode===0)return;let s=o.clientX-this.lastX,l=o.clientY-this.lastY;if(this.lastX=o.clientX,this.lastY=o.clientY,this.dragMode===1)this.yaw-=s*this.rotateSpeed,this.pitch=Math.min(this.maxPitch,Math.max(this.minPitch,this.pitch+l*this.rotateSpeed));else this.pan(s,l)},i=()=>{this.dragMode=0},a=(o)=>{if(!this.enabled)return;o.preventDefault(),this.distance=Math.min(this.maxDistance,Math.max(this.minDistance,this.distance*Math.exp(o.deltaY*this.zoomSpeed)))},n=(o)=>o.preventDefault();return t.addEventListener("pointerdown",e),t.addEventListener("pointermove",r),t.addEventListener("pointerup",i),t.addEventListener("wheel",a,{passive:!1}),t.addEventListener("contextmenu",n),this}update(t=0){let e=Math.cos(this.pitch),r=e*Math.sin(this.yaw),i=Math.sin(this.pitch),a=e*Math.cos(this.yaw);this.camera.position.x=this.target.x+r*this.distance,this.camera.position.y=this.target.y+i*this.distance,this.camera.position.z=this.target.z+a*this.distance;let n=d.fromAxisAngle(et,this.yaw,new d),o=d.fromAxisAngle(tt,-this.pitch,new d);d.multiply(n,o,this.camera.rotation),this.camera.update()}pan(t,e){let r=d.fromAxisAngle(et,this.yaw,new d),i=d.fromAxisAngle(tt,-this.pitch,new d),a=d.multiply(r,i,new d),[n,o,s]=rt(a,1,0,0),[l,c,u]=rt(a,0,1,0),h=this.distance*this.panSpeed;this.target.x+=(-n*t+l*e)*h,this.target.y+=(-o*t+c*e)*h,this.target.z+=(-s*t+u*e)*h}}class yt{camera;enabled=!0;yaw;pitch;speed;fastMultiplier;sensitivity;keys=new Set;constructor(t,e={}){this.camera=t,this.yaw=e.yaw??0,this.pitch=e.pitch??0,this.speed=e.speed??5,this.fastMultiplier=e.fastMultiplier??4,this.sensitivity=e.sensitivity??0.002}attach(t){let e=(o)=>{if(!this.enabled||o.button!==0)return;t.requestPointerLock?.()},r=(o)=>{if(!this.enabled||document.pointerLockElement!==t)return;this.yaw-=o.movementX*this.sensitivity,this.pitch=Math.max(-Math.PI/2+0.001,Math.min(Math.PI/2-0.001,this.pitch-o.movementY*this.sensitivity))},i=(o)=>this.keys.add(o.code),a=(o)=>this.keys.delete(o.code),n=()=>this.keys.clear();return t.addEventListener("pointerdown",e),document.addEventListener("mousemove",r),window.addEventListener("keydown",i),window.addEventListener("keyup",a),window.addEventListener("blur",n),this}update(t){let e=Math.min(t,0.1),r=this.speed*(this.keys.has("ShiftLeft")||this.keys.has("ShiftRight")?this.fastMultiplier:1)*e,i=d.fromAxisAngle(et,this.yaw,new d),a=d.fromAxisAngle(tt,this.pitch,new d);d.multiply(i,a,this.camera.rotation);let[n,o,s]=this.forward(),[l,,c]=rt(this.camera.rotation,1,0,0),u=this.camera.position;if(this.keys.has("KeyW"))u.x+=n*r,u.y+=o*r,u.z+=s*r;if(this.keys.has("KeyS"))u.x-=n*r,u.y-=o*r,u.z-=s*r;if(this.keys.has("KeyA"))u.x-=l*r,u.z-=c*r;if(this.keys.has("KeyD"))u.x+=l*r,u.z+=c*r;if(this.keys.has("Space"))u.y+=r;if(this.keys.has("KeyC"))u.y-=r;this.camera.update()}forward(){let t=Math.cos(this.pitch);return[-t*Math.sin(this.yaw),Math.sin(this.pitch),-t*Math.cos(this.yaw)]}}class gt{static box(t=1,e=1,r=1){let i=t/2,a=e/2,n=r/2,o=[],s=[],l=[],c=[[[0,0,1],[[-i,-a,n],[i,-a,n],[i,a,n],[-i,a,n]]],[[0,0,-1],[[i,-a,-n],[-i,-a,-n],[-i,a,-n],[i,a,-n]]],[[1,0,0],[[i,-a,n],[i,-a,-n],[i,a,-n],[i,a,n]]],[[-1,0,0],[[-i,-a,-n],[-i,-a,n],[-i,a,n],[-i,a,-n]]],[[0,1,0],[[-i,a,n],[i,a,n],[i,a,-n],[-i,a,-n]]],[[0,-1,0],[[-i,-a,-n],[i,-a,-n],[i,-a,n],[-i,-a,n]]]];for(let[u,h]of c){let m=o.length/3;for(let v of h)o.push(v[0],v[1],v[2]),s.push(u[0],u[1],u[2]);l.push(m,m+1,m+2,m,m+2,m+3)}return{positions:new Float32Array(o),normals:new Float32Array(s),indices:new Uint32Array(l)}}static plane(t=1,e=1,r=1){let i=[],a=[],n=[],o=t/2,s=e/2;for(let c=0;c<=r;c++){let u=-s+c/r*e;for(let h=0;h<=r;h++)i.push(-o+h/r*t,0,u),a.push(0,1,0)}let l=r+1;for(let c=0;c<r;c++)for(let u=0;u<r;u++){let h=c*l+u;n.push(h,h+l,h+l+1,h,h+l+1,h+1)}return{positions:new Float32Array(i),normals:new Float32Array(a),indices:new Uint32Array(n)}}static sphere(t=1,e=32,r=16){let i=[],a=[],n=[];for(let o=0;o<=r;o++){let s=o/r*Math.PI;for(let l=0;l<=e;l++){let c=l/e*Math.PI*2,u=-Math.cos(c)*Math.sin(s),h=Math.cos(s),m=Math.sin(c)*Math.sin(s);i.push(u*t,h*t,m*t),a.push(u,h,m)}}for(let o=0;o<r;o++)for(let s=0;s<e;s++){let l=o*(e+1)+s,c=l+e+1;n.push(l,c,l+1,c,c+1,l+1)}return{positions:new Float32Array(i),normals:new Float32Array(a),indices:new Uint32Array(n)}}static cylinder(t=1,e=1,r=32){let i=[],a=[],n=[],o=e/2;for(let s=0;s<=r;s++){let l=s/r*Math.PI*2,c=Math.cos(l),u=Math.sin(l);i.push(c*t,-o,u*t,c*t,o,u*t),a.push(c,0,u,c,0,u)}for(let s=0;s<r;s++){let l=s*2;n.push(l,l+1,l+3,l,l+3,l+2)}for(let s of[1,-1]){let l=o*s,c=i.length/3;i.push(0,l,0),a.push(0,s,0);let u=c+1;for(let h=0;h<=r;h++){let m=h/r*Math.PI*2;i.push(Math.cos(m)*t,l,Math.sin(m)*t),a.push(0,s,0)}for(let h=0;h<r;h++)if(s===1)n.push(c,u+h+1,u+h);else n.push(c,u+h,u+h+1)}return{positions:new Float32Array(i),normals:new Float32Array(a),indices:new Uint32Array(n)}}}window.console.log2=new Proxy(window.console.log,{apply(t,e,r){return C.create(r[0],r[1],0),Reflect.apply(t,e,r)}});window.console.warn2=new Proxy(window.console.warn,{apply(t,e,r){return C.create(r[0],r[1],1),Reflect.apply(t,e,r)}});window.console.error2=new Proxy(window.console.error,{apply(t,e,r){return C.create(r[0],r[1],2),Reflect.apply(t,e,r)}});C.create("JAJAJAJ","works!!",0);export{nt as Backends,ft as Engine,yt as FPSController,P as Matrix,w as Matrix4,gt as MeshBuilder,wt as OrbitCameraController,vt as OrthographicCamera,xt as PerspectiveCamera,d as Quaternion,J as RenderEvent,_ as Vector2,g as Vector3,lt as computeFlatNormals,H as computeViewProjMatrix,Gt as normalizedToScreenCoords,Ft as project};

//# debugId=EDB275F3368884A764756E2164756E21
//# sourceMappingURL=index.js.map
