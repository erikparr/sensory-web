<template>
  <div ref="containerRef" class="pixel-grid-container"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const containerRef = ref(null)

let renderer, mainScene, mainCamera, renderTarget
let shaderScene, shaderCamera, shaderMaterial
let circleGeometry
let instancedMeshes = []
let materials = []
let animationId = 0
let pixelBuffer = null

const COLS = 40
const ROWS = 30
const TOTAL = COLS * ROWS

const waveVertexShader = `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`

const waveFragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution;
    float r = sin(uv.x * 6.0 - uTime * 1.5) * 0.5 + 0.5;
    float g = sin(uv.x * 6.0 - uTime * 1.5 + 2.094) * 0.5 + 0.5;
    float b = sin(uv.x * 6.0 - uTime * 1.5 + 4.189) * 0.5 + 0.5;
    float yWave = sin(uv.y * 5.0 + uTime * 1.0) * 0.5 + 0.5;
    gl_FragColor = vec4(r * yWave, g * yWave, b * yWave, 1.0);
  }
`

// Scale range — constrained for subtle variation
const SCALE_MIN = 0.15
const SCALE_MAX = 0.55

// Triangular offsets for each color grid
const GRID_LAYERS = [
  { color: 0xff6b6b, offsetX: 0,     offsetY: 0.33,  channel: 0 }, // coral
  { color: 0x4ecdc4, offsetX: -0.29, offsetY: -0.17, channel: 1 }, // teal
  { color: 0xc44dff, offsetX: 0.29,  offsetY: -0.17, channel: 2 }, // violet
]

let THREE = null

onMounted(async () => {
  const container = containerRef.value
  if (!container) return

  THREE = await import('three')

  const width = container.clientWidth || window.innerWidth
  const height = container.clientHeight || window.innerHeight

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000)
  container.appendChild(renderer.domElement)

  // Offscreen render target for wave shader
  renderTarget = new THREE.WebGLRenderTarget(COLS, ROWS, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter
  })

  // Shader scene (fullscreen quad)
  shaderScene = new THREE.Scene()
  shaderCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
  shaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(COLS, ROWS) }
    },
    vertexShader: waveVertexShader,
    fragmentShader: waveFragmentShader,
    depthTest: false
  })
  const quadGeometry = new THREE.PlaneGeometry(2, 2)
  const quad = new THREE.Mesh(quadGeometry, shaderMaterial)
  shaderScene.add(quad)

  // Main scene with orthographic camera
  mainScene = new THREE.Scene()
  mainScene.background = new THREE.Color(0x000000)

  const updateCamera = (w, h) => {
    const aspect = w / h
    const gridAspect = COLS / ROWS

    let halfW, halfH
    if (aspect > gridAspect) {
      halfH = ROWS / 2 + 1
      halfW = halfH * aspect
    } else {
      halfW = COLS / 2 + 1
      halfH = halfW / aspect
    }

    if (!mainCamera) {
      mainCamera = new THREE.OrthographicCamera(-halfW, halfW, halfH, -halfH, 0.1, 10)
      mainCamera.position.z = 5
    } else {
      mainCamera.left = -halfW
      mainCamera.right = halfW
      mainCamera.top = halfH
      mainCamera.bottom = -halfH
      mainCamera.updateProjectionMatrix()
    }
  }
  updateCamera(width, height)

  // Shared circle geometry
  circleGeometry = new THREE.CircleGeometry(0.4, 32)

  // Create 3 instanced meshes — one per color layer
  const dummy = new THREE.Object3D()
  for (const layer of GRID_LAYERS) {
    const mat = new THREE.MeshBasicMaterial({
      color: layer.color,
      blending: THREE.AdditiveBlending,
      transparent: true
    })
    materials.push(mat)

    const mesh = new THREE.InstancedMesh(circleGeometry, mat, TOTAL)
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const x = col - (COLS - 1) / 2 + layer.offsetX
        const y = row - (ROWS - 1) / 2 + layer.offsetY
        dummy.position.set(x, y, 0)
        dummy.scale.set(1, 1, 1)
        dummy.updateMatrix()
        mesh.setMatrixAt(row * COLS + col, dummy.matrix)
      }
    }
    mesh.instanceMatrix.needsUpdate = true
    mainScene.add(mesh)
    instancedMeshes.push({ mesh, layer })
  }

  // Pixel buffer
  pixelBuffer = new Uint8Array(COLS * ROWS * 4)

  // Animation
  const dummy2 = new THREE.Object3D()
  const clock = new THREE.Clock()

  const animate = () => {
    animationId = requestAnimationFrame(animate)

    const elapsed = clock.getElapsedTime()
    shaderMaterial.uniforms.uTime.value = elapsed

    // Render color shader to offscreen target
    renderer.setRenderTarget(renderTarget)
    renderer.render(shaderScene, shaderCamera)

    // Read pixels once
    renderer.readRenderTargetPixels(renderTarget, 0, 0, COLS, ROWS, pixelBuffer)

    // Update each layer's instance scales from its channel
    for (const { mesh, layer } of instancedMeshes) {
      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          const i = row * COLS + col
          const pixelIndex = i * 4 + layer.channel
          const brightness = pixelBuffer[pixelIndex] / 255
          const s = SCALE_MIN + brightness * (SCALE_MAX - SCALE_MIN)

          const x = col - (COLS - 1) / 2 + layer.offsetX
          const y = row - (ROWS - 1) / 2 + layer.offsetY
          dummy2.position.set(x, y, 0)
          dummy2.scale.set(s, s, 1)
          dummy2.updateMatrix()
          mesh.setMatrixAt(i, dummy2.matrix)
        }
      }
      mesh.instanceMatrix.needsUpdate = true
    }

    // Render main scene
    renderer.setRenderTarget(null)
    renderer.render(mainScene, mainCamera)
  }
  animate()

  // Resize
  const onResize = () => {
    const w = container.clientWidth
    const h = container.clientHeight
    if (w === 0 || h === 0) return
    renderer.setSize(w, h)
    updateCamera(w, h)
    mainCamera.updateProjectionMatrix()
  }
  window.addEventListener('resize', onResize)
  container._onResize = onResize
})

onBeforeUnmount(() => {
  if (animationId) cancelAnimationFrame(animationId)
  if (containerRef.value?._onResize) {
    window.removeEventListener('resize', containerRef.value._onResize)
  }
  if (circleGeometry) circleGeometry.dispose()
  materials.forEach(m => m.dispose())
  if (shaderMaterial) shaderMaterial.dispose()
  if (renderTarget) renderTarget.dispose()
  if (renderer) {
    renderer.dispose()
    const canvas = renderer.domElement
    if (containerRef.value?.contains(canvas)) {
      containerRef.value.removeChild(canvas)
    }
  }
})
</script>

<style scoped>
.pixel-grid-container {
  width: 100%;
  height: 100%;
  background: #000;
}

.pixel-grid-container :deep(canvas) {
  display: block;
}
</style>
