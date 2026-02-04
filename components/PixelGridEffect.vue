<template>
  <div ref="containerRef" class="pixel-grid-container"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const containerRef = ref(null)

let renderer, mainScene, mainCamera, renderTarget
let shaderScene, shaderCamera, shaderMaterial
let instancedMesh, circleGeometry, circleMaterial
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
    float wave = sin(uv.x * 10.0 - uTime * 2.0) * 0.5 + 0.5;
    wave *= sin(uv.y * 8.0 + uTime * 1.5) * 0.5 + 0.5;
    gl_FragColor = vec4(vec3(wave), 1.0);
  }
`

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

  // Calculate ortho bounds to keep grid centered and fitting
  const updateCamera = (w, h) => {
    const aspect = w / h
    const gridAspect = COLS / ROWS

    let halfW, halfH
    if (aspect > gridAspect) {
      // Window wider than grid — fit height
      halfH = ROWS / 2 + 1
      halfW = halfH * aspect
    } else {
      // Window taller than grid — fit width
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

  // Circle grid using InstancedMesh
  circleGeometry = new THREE.CircleGeometry(0.4, 32)
  circleMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })
  instancedMesh = new THREE.InstancedMesh(circleGeometry, circleMaterial, TOTAL)

  const dummy = new THREE.Object3D()
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const x = col - (COLS - 1) / 2
      const y = row - (ROWS - 1) / 2
      dummy.position.set(x, y, 0)
      dummy.scale.set(1, 1, 1)
      dummy.updateMatrix()
      instancedMesh.setMatrixAt(row * COLS + col, dummy.matrix)
    }
  }
  instancedMesh.instanceMatrix.needsUpdate = true
  mainScene.add(instancedMesh)

  // Pixel buffer for readRenderTargetPixels
  pixelBuffer = new Uint8Array(COLS * ROWS * 4)

  // Animation
  const dummy2 = new THREE.Object3D()
  const clock = new THREE.Clock()

  const animate = () => {
    animationId = requestAnimationFrame(animate)

    const elapsed = clock.getElapsedTime()
    shaderMaterial.uniforms.uTime.value = elapsed

    // Render wave to offscreen target
    renderer.setRenderTarget(renderTarget)
    renderer.render(shaderScene, shaderCamera)

    // Read pixels
    renderer.readRenderTargetPixels(renderTarget, 0, 0, COLS, ROWS, pixelBuffer)

    // Update instance scales based on brightness
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const i = row * COLS + col
        const pixelIndex = i * 4
        const brightness = pixelBuffer[pixelIndex] / 255
        const s = Math.max(brightness, 0.05)

        const x = col - (COLS - 1) / 2
        const y = row - (ROWS - 1) / 2
        dummy2.position.set(x, y, 0)
        dummy2.scale.set(s, s, 1)
        dummy2.updateMatrix()
        instancedMesh.setMatrixAt(i, dummy2.matrix)
      }
    }
    instancedMesh.instanceMatrix.needsUpdate = true

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
  if (circleMaterial) circleMaterial.dispose()
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
