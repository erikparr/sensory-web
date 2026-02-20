<template>
  <div
    ref="containerRef"
    class="hero-sphere"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
  >
    <div v-if="webglFailed" class="hero-sphere-fallback">
      <div class="hero-sphere-fallback-circle" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const containerRef = ref(null)
const webglFailed = ref(false)

let scene, camera, renderer, clock, sphere
let animationId = 0
let isContextLost = false
let mouseTarget = { x: 0, y: 0 }
let mouseCurrent = { x: 0, y: 0 }
let shaderUniforms = null

const vertexShader = `
uniform float speed;
uniform float _time;
uniform float noiseFrequency;
uniform float waveAmplitude;
uniform vec2 mouse;

varying vec3 vNormal;
varying vec3 vViewPosition;
varying vec3 vOrigPosition;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289v2(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289v2(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float getNoise(vec2 uv, float scale) {
  return snoise(uv * scale) * 0.5 + 0.5;
}

void main() {
  vOrigPosition = position;

  // Time-scrolling noise offset + mouse influence
  float timeOffset = -(speed * _time);
  vec2 noiseUV = vec2(
    timeOffset + position.x * 0.5 + mouse.x * 0.5,
    position.y + position.z * 0.5 + mouse.y * 0.3
  );

  float noise = getNoise(noiseUV, noiseFrequency);
  float displacement = noise * waveAmplitude;

  // Displace along normal
  vec3 newPosition = position + normal * displacement;

  // Approximate displaced normal via finite differences
  float eps = 0.01;
  vec2 noiseUV_dx = noiseUV + vec2(eps, 0.0);
  vec2 noiseUV_dy = noiseUV + vec2(0.0, eps);
  float noise_dx = getNoise(noiseUV_dx, noiseFrequency);
  float noise_dy = getNoise(noiseUV_dy, noiseFrequency);
  float dndx = (noise_dx - noise) / eps;
  float dndy = (noise_dy - noise) / eps;

  vec3 displacedNormal = normalize(normal + vec3(-dndx, -dndy, 0.0) * waveAmplitude * 0.3);
  vNormal = normalize(normalMatrix * displacedNormal);

  vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
  vViewPosition = -mvPosition.xyz;
  gl_Position = projectionMatrix * mvPosition;
}
`

const fragmentShader = `
uniform vec4 colorPrimary;
uniform vec4 colorSecondary1;
uniform vec4 colorSecondary;
uniform float colorMix;
uniform float speed;
uniform float _time;
uniform float noiseFrequency;
uniform float waveAmplitude;
uniform float shininess;
uniform vec2 mouse;

varying vec3 vNormal;
varying vec3 vViewPosition;
varying vec3 vOrigPosition;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289v2(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289v2(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float getNoise(vec2 uv, float scale) {
  return snoise(uv * scale) * 0.5 + 0.5;
}

void main() {
  // Color mixing from original shader
  vec4 mixedSecondary = mix(colorSecondary1, colorSecondary, vec4(vec3(colorMix), 1.0));

  float timeOffset = -(speed * _time);
  vec2 noiseUV = vec2(
    timeOffset + vOrigPosition.x * 0.5 + mouse.x * 0.5,
    vOrigPosition.y + vOrigPosition.z * 0.5 + mouse.y * 0.3
  );

  float noise = getNoise(noiseUV, noiseFrequency);
  float colorBlend = noise * waveAmplitude;
  vec4 surfaceColor = mix(colorPrimary, mixedSecondary, vec4(vec3(colorBlend), 1.0));
  vec3 baseColor = surfaceColor.xyz;

  // Lighting
  vec3 N = normalize(vNormal);
  vec3 V = normalize(vViewPosition);

  // Key light
  vec3 L1 = normalize(vec3(2.0, 1.5, 3.0));
  float diff1 = max(dot(N, L1), 0.0);
  vec3 H1 = normalize(L1 + V);
  float spec1 = pow(max(dot(N, H1), 0.0), 64.0);

  // Fill light
  vec3 L2 = normalize(vec3(-1.5, 0.5, 1.0));
  float diff2 = max(dot(N, L2), 0.0);

  // Rim / fresnel
  float rim = 1.0 - max(dot(V, N), 0.0);
  rim = pow(rim, 3.0);

  // Combine
  vec3 ambient = baseColor * 0.2;
  vec3 diffuse = baseColor * (diff1 * 0.6 + diff2 * 0.2);
  vec3 specular = vec3(1.0) * spec1 * (1.0 - shininess) * 0.5;
  vec3 rimColor = baseColor * rim * 0.5;
  vec3 emissive = baseColor * 0.25;

  vec3 finalColor = ambient + diffuse + specular + rimColor + emissive;

  gl_FragColor = vec4(finalColor, 1.0);
}
`

function onMouseMove(event) {
  if (!containerRef.value) return
  const rect = containerRef.value.getBoundingClientRect()
  mouseTarget.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  mouseTarget.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
}

function onMouseLeave() {
  mouseTarget.x = 0
  mouseTarget.y = 0
}

function init() {
  const container = containerRef.value
  if (!container) return

  const width = container.clientWidth
  const height = container.clientHeight

  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
  camera.position.z = 8

  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  } catch {
    webglFailed.value = true
    return
  }
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)
  container.appendChild(renderer.domElement)

  renderer.domElement.addEventListener('webglcontextlost', (e) => {
    e.preventDefault()
    isContextLost = true
    cancelAnimationFrame(animationId)
  })
  renderer.domElement.addEventListener('webglcontextrestored', () => {
    isContextLost = false
    animate()
  })

  clock = new THREE.Clock()

  shaderUniforms = {
    speed: { value: 0.6 },
    _time: { value: 0 },
    noiseFrequency: { value: 0.96 },
    waveAmplitude: { value: 1.06 },
    colorPrimary: { value: new THREE.Vector4(1, 1, 1, 1) },
    colorSecondary1: { value: new THREE.Vector4(0.1, 0.6, 0.2, 1) },
    colorSecondary: { value: new THREE.Vector4(0.298, 0.851, 0.392, 1) },
    colorMix: { value: 0.85 },
    shininess: { value: 0.13 },
    mouse: { value: new THREE.Vector2(0, 0) },
  }

  const geometry = new THREE.SphereGeometry(1.5, 256, 256)
  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: shaderUniforms,
  })

  sphere = new THREE.Mesh(geometry, material)
  scene.add(sphere)

  animate()
}

function animate() {
  if (isContextLost) return
  animationId = requestAnimationFrame(animate)

  const elapsed = clock.getElapsedTime()
  shaderUniforms._time.value = elapsed

  // Smooth mouse interpolation
  mouseCurrent.x += (mouseTarget.x - mouseCurrent.x) * 0.05
  mouseCurrent.y += (mouseTarget.y - mouseCurrent.y) * 0.05
  shaderUniforms.mouse.value.set(mouseCurrent.x, mouseCurrent.y)

  // Gentle rotation
  sphere.rotation.y = elapsed * 0.15
  sphere.rotation.x = Math.sin(elapsed * 0.1) * 0.1

  renderer.render(scene, camera)
}

function onResize() {
  if (!containerRef.value || !renderer || !camera) return
  const width = containerRef.value.clientWidth
  const height = containerRef.value.clientHeight
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
}

onMounted(() => {
  init()
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
  cancelAnimationFrame(animationId)
  if (renderer) {
    renderer.dispose()
    if (renderer.domElement && renderer.domElement.parentNode) {
      renderer.domElement.parentNode.removeChild(renderer.domElement)
    }
  }
  if (sphere) {
    sphere.geometry.dispose()
    sphere.material.dispose()
  }
})
</script>

<style scoped>
.hero-sphere {
  width: 100%;
  height: 100%;
  min-height: 400px;
  cursor: default;
}

.hero-sphere canvas {
  display: block;
}

.hero-sphere-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-sphere-fallback-circle {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #ff6b9d, #4a00e0);
}
</style>
