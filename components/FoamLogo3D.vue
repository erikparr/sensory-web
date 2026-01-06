<template>
  <div
    ref="containerRef"
    class="foam-logo-3d"
    :style="{ width: '100%', height: '100%', background: '#0a0a0a' }"
  >
    <div v-if="webglFailed" class="foam-fallback">
      <h1 class="foam-fallback-text">foam</h1>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  autoRotate: { type: Boolean, default: true }
})

const containerRef = ref(null)
const webglFailed = ref(false)

let scene, camera, renderer, clock, dracoLoader, bubbleGeometry
let animationId = 0
let letterMeshes = []
let bubbles = []
let isContextLost = false
let contextLossCount = 0
let sceneContentWidth = 0
let sceneContentHeight = 0
let initialized = false

// Shader code
const iridescenceVertexShader = `
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec3 vWorldPosition;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    vec4 mvPosition = viewMatrix * worldPosition;
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`

const isSafari = typeof navigator !== 'undefined' &&
  /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

const createFragmentShader = (useLowQuality = false) => `
  uniform float uTime;
  uniform float uThickness;
  uniform float uFresnelPower;
  uniform vec3 uBaseColor;
  uniform vec3 uEnvColor1;
  uniform vec3 uEnvColor2;
  uniform vec3 uEnvColor3;

  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec3 vWorldPosition;
  varying vec2 vUv;

  const float IOR = 1.33;
  const float PI = 3.14159265359;

  vec3 wavelengthToRGB(float wavelength) {
    float w = clamp(wavelength, 380.0, 780.0);
    vec3 rgb;

    if (w < 440.0) {
      rgb = vec3(-(w - 440.0) / 60.0, 0.0, 1.0);
    } else if (w < 490.0) {
      rgb = vec3(0.0, (w - 440.0) / 50.0, 1.0);
    } else if (w < 510.0) {
      rgb = vec3(0.0, 1.0, -(w - 510.0) / 20.0);
    } else if (w < 580.0) {
      rgb = vec3((w - 510.0) / 70.0, 1.0, 0.0);
    } else if (w < 645.0) {
      rgb = vec3(1.0, -(w - 645.0) / 65.0, 0.0);
    } else {
      rgb = vec3(1.0, 0.0, 0.0);
    }

    float factor;
    if (w < 420.0) {
      factor = 0.3 + 0.7 * (w - 380.0) / 40.0;
    } else if (w > 700.0) {
      factor = 0.3 + 0.7 * (780.0 - w) / 80.0;
    } else {
      factor = 1.0;
    }

    return rgb * factor;
  }

  vec3 thinFilmInterference(float cosTheta, float thickness) {
    vec3 color = vec3(0.0);

    ${useLowQuality ? `
    for (float w = 420.0; w <= 680.0; w += 52.0) {
    ` : `
    for (float w = 400.0; w <= 700.0; w += 20.0) {
    `}
      float delta = 2.0 * IOR * thickness * cosTheta;
      float phase = 2.0 * PI * delta / w;
      float intensity = 0.5 + 0.5 * cos(phase + PI);
      color += wavelengthToRGB(w) * intensity;
    }

    ${useLowQuality ? 'color /= 6.0;' : 'color /= 16.0;'}
    return color;
  }

  float fresnel(vec3 viewDir, vec3 normal, float power) {
    float NdotV = max(dot(normal, viewDir), 0.0);
    return pow(1.0 - NdotV, power);
  }

  vec3 sampleEnvironment(vec3 reflectDir) {
    float y = reflectDir.y * 0.5 + 0.5;
    float x = atan(reflectDir.z, reflectDir.x) / (2.0 * PI) + 0.5;

    vec3 topColor = uEnvColor1;
    vec3 midColor = uEnvColor2;
    vec3 bottomColor = uEnvColor3;

    float noise = sin(x * 20.0 + uTime * 0.5) * 0.1 + sin(y * 15.0 - uTime * 0.3) * 0.1;

    vec3 envColor;
    if (y > 0.5) {
      envColor = mix(midColor, topColor, (y - 0.5) * 2.0);
    } else {
      envColor = mix(bottomColor, midColor, y * 2.0);
    }

    return envColor * (1.0 + noise);
  }

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);

    float cosTheta = abs(dot(normal, viewDir));

    float thicknessVariation = sin(vUv.x * 10.0 + uTime) * 0.1
                            + sin(vUv.y * 8.0 - uTime * 0.7) * 0.1
                            + sin(length(vWorldPosition) * 5.0 + uTime * 0.5) * 0.05;
    float thickness = uThickness * (1.0 + thicknessVariation);

    vec3 interferenceColor = thinFilmInterference(cosTheta, thickness) * 1.5;

    float fresnelFactor = fresnel(viewDir, normal, uFresnelPower);

    vec3 reflectDir = reflect(-viewDir, normal);
    vec3 envReflection = sampleEnvironment(reflectDir) * 1.3;

    vec3 baseContrib = uBaseColor * (1.0 - fresnelFactor) * 0.4;
    vec3 iridContrib = interferenceColor * (0.7 + fresnelFactor * 0.5);
    vec3 envContrib = envReflection * fresnelFactor * 0.8;

    vec3 finalColor = baseContrib + iridContrib + envContrib;

    vec3 emissive = vec3(0.15, 0.2, 0.25) + interferenceColor * 0.2;
    finalColor += emissive;

    float edgeGlow = pow(1.0 - cosTheta, 2.5) * 0.5;
    finalColor += vec3(0.9, 0.95, 1.0) * edgeGlow;

    finalColor = finalColor / (finalColor * 0.5 + vec3(1.0));

    float alpha = 0.9 + fresnelFactor * 0.1;

    gl_FragColor = vec4(finalColor, alpha);
  }
`

const BASE_ASPECT = 16 / 9
const BASE_FOV = 35
const MAX_FOV = 65

function calculateResponsiveFOV(width, height) {
  const aspect = width / height
  let fov = BASE_FOV
  if (aspect < BASE_ASPECT) {
    fov = BASE_FOV * (BASE_ASPECT / aspect)
    fov = Math.min(fov, MAX_FOV)
  }
  return fov
}

function calculateCameraZ(contentWidth, contentHeight, fov, aspect) {
  const vFovRad = (fov * Math.PI) / 180
  const hFovRad = 2 * Math.atan(Math.tan(vFovRad / 2) * aspect)
  const padding = 1.15

  const zForWidth = (contentWidth * padding) / (2 * Math.tan(hFovRad / 2))
  const zForHeight = (contentHeight * padding) / (2 * Math.tan(vFovRad / 2))

  let z = Math.max(zForWidth, zForHeight)

  if (aspect > BASE_ASPECT) {
    const widenessFactor = aspect / BASE_ASPECT
    z *= 1 + (widenessFactor - 1) * (2 / 3)
  }

  return z
}

let THREE = null

const initThreeJS = async () => {
  if (THREE) return THREE
  THREE = await import('three')
  return THREE
}

onMounted(async () => {
  const container = containerRef.value
  if (!container) return

  try {
    await initThreeJS()
    const { GLTFLoader } = await import('three/addons/loaders/GLTFLoader.js')
    const { DRACOLoader } = await import('three/addons/loaders/DRACOLoader.js')

    let lastTime = performance.now()

    const createIridescentMaterial = () => {
      return new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uThickness: { value: 300.0 },
          uFresnelPower: { value: 2.5 },
          uBaseColor: { value: new THREE.Color(0.05, 0.05, 0.1) },
          uEnvColor1: { value: new THREE.Color(1.0, 0.3, 0.9) },
          uEnvColor2: { value: new THREE.Color(0.3, 1.0, 0.8) },
          uEnvColor3: { value: new THREE.Color(0.3, 0.4, 1.0) },
        },
        vertexShader: iridescenceVertexShader,
        fragmentShader: createFragmentShader(isSafari),
        transparent: true,
        side: THREE.DoubleSide,
      })
    }

    const resetBubble = (bubble, randomY) => {
      bubble.baseX = (Math.random() - 0.5) * 8
      bubble.mesh.position.x = bubble.baseX
      bubble.mesh.position.y = randomY ? (Math.random() - 0.5) * 5 : -3.5 - Math.random()
      bubble.mesh.position.z = 1 + Math.random() * 1.5
      bubble.speed = 0.3 + Math.random() * 0.4
      bubble.wobblePhase = Math.random() * Math.PI * 2
      bubble.wobbleSpeed = 1 + Math.random() * 1.5
      const size = 0.015 + Math.random() * 0.04
      bubble.mesh.scale.setScalar(size)
    }

    const initScene = (width, height) => {
      if (initialized) return
      initialized = true

      scene = new THREE.Scene()

      const initialFOV = calculateResponsiveFOV(width, height)
      camera = new THREE.PerspectiveCamera(initialFOV, width / height, 0.1, 1000)
      camera.position.z = 6

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: isSafari ? 'low-power' : 'high-performance',
        failIfMajorPerformanceCaveat: false
      })
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSafari ? 1.5 : 2))
      renderer.outputColorSpace = THREE.SRGBColorSpace
      container.appendChild(renderer.domElement)

      const canvas = renderer.domElement
      canvas.addEventListener('webglcontextlost', (event) => {
        event.preventDefault()
        isContextLost = true
        contextLossCount++
        if (animationId) {
          cancelAnimationFrame(animationId)
          animationId = 0
        }
        if (contextLossCount >= 5) {
          webglFailed.value = true
        }
      })

      canvas.addEventListener('webglcontextrestored', () => {
        isContextLost = false
        if (contextLossCount >= 3) return
        letterMeshes.forEach((mesh) => {
          if (mesh.material) {
            mesh.material.dispose()
            mesh.material = createIridescentMaterial()
          }
        })
        bubbles.forEach((bubble) => {
          if (bubble.mesh.material) {
            bubble.mesh.material.dispose()
            bubble.mesh.material = createIridescentMaterial()
          }
        })
        clock.start()
        animate()
      })

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
      scene.add(ambientLight)

      const keyLight = new THREE.DirectionalLight(0xffffff, 1.2)
      keyLight.position.set(5, 5, 5)
      scene.add(keyLight)

      const fillLight = new THREE.DirectionalLight(0x88ccff, 0.6)
      fillLight.position.set(-5, 2, 3)
      scene.add(fillLight)

      const rimLight = new THREE.DirectionalLight(0xff00ff, 0.8)
      rimLight.position.set(0, -3, -5)
      scene.add(rimLight)

      const pointLight1 = new THREE.PointLight(0x00ffff, 1.0, 20)
      pointLight1.position.set(3, 2, 4)
      scene.add(pointLight1)

      const pointLight2 = new THREE.PointLight(0xff88ff, 0.8, 20)
      pointLight2.position.set(-3, -1, 4)
      scene.add(pointLight2)

      clock = new THREE.Clock()

      const BUBBLE_COUNT = 20
      bubbleGeometry = new THREE.SphereGeometry(1, 12, 8)

      for (let i = 0; i < BUBBLE_COUNT; i++) {
        const mesh = new THREE.Mesh(bubbleGeometry, createIridescentMaterial())
        const bubble = { mesh, speed: 0, wobblePhase: 0, wobbleSpeed: 0, baseX: 0 }
        resetBubble(bubble, true)
        bubbles.push(bubble)
        scene.add(mesh)
      }

      dracoLoader = new DRACOLoader()
      dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/')

      const loader = new GLTFLoader()
      loader.setDRACOLoader(dracoLoader)

      const letters = ['F', 'O', 'A', 'M']
      const letterSpacing = 2.5
      const startX = -((letters.length - 1) * letterSpacing) / 2
      let loadedCount = 0

      letters.forEach((letter, index) => {
        const modelPath = `/foam-logo-3d/optimized/${letter}.glb`

        loader.load(
          modelPath,
          (gltf) => {
            const model = gltf.scene

            model.traverse((child) => {
              if (child instanceof THREE.Mesh) {
                child.material = createIridescentMaterial()
                letterMeshes.push(child)
              }
            })

            model.rotation.x = Math.PI / 2
            model.position.x = startX + index * letterSpacing
            model.position.y = 0

            const box = new THREE.Box3().setFromObject(model)
            const size = box.getSize(new THREE.Vector3())
            const maxDim = Math.max(size.x, size.y, size.z)
            const scale = 2.0 / maxDim
            model.scale.setScalar(scale)

            box.setFromObject(model)
            const center = box.getCenter(new THREE.Vector3())
            model.position.y -= center.y

            scene.add(model)
            loadedCount++

            if (loadedCount === letters.length) {
              const sceneBounds = new THREE.Box3()
              letterMeshes.forEach(mesh => sceneBounds.expandByObject(mesh))
              const sceneSize = sceneBounds.getSize(new THREE.Vector3())

              sceneContentWidth = sceneSize.x
              sceneContentHeight = sceneSize.y
              camera.position.z = calculateCameraZ(sceneContentWidth, sceneContentHeight, camera.fov, camera.aspect)
              camera.position.y = 1
            }
          },
          undefined,
          (error) => {
            console.warn(`Failed to load ${letter}.glb:`, error)
            const geometry = new THREE.BoxGeometry(1.5, 2, 0.5)
            const material = createIridescentMaterial()
            const mesh = new THREE.Mesh(geometry, material)
            mesh.position.x = startX + index * letterSpacing
            scene.add(mesh)
            letterMeshes.push(mesh)
          }
        )
      })

      const animate = () => {
        if (isContextLost) return

        animationId = requestAnimationFrame(animate)

        const elapsed = clock.getElapsedTime()
        const now = performance.now()
        const deltaTime = (now - lastTime) / 1000
        lastTime = now

        letterMeshes.forEach((mesh, index) => {
          if (mesh.material instanceof THREE.ShaderMaterial) {
            mesh.material.uniforms.uTime.value = elapsed
          }

          const floatOffset = Math.sin(elapsed * 0.8 + index * 0.5) * 0.1
          const floatY = Math.sin(elapsed * 0.6 + index * 0.7) * 0.05

          if (mesh.parent) {
            mesh.parent.position.y = floatOffset
            mesh.parent.rotation.z = floatY * 0.1
          }

          if (props.autoRotate) {
            mesh.rotation.y = Math.sin(elapsed * 0.3 + index * 0.2) * 0.15
          }
        })

        bubbles.forEach((bubble) => {
          bubble.mesh.position.y += bubble.speed * deltaTime
          const wobble = Math.sin(elapsed * bubble.wobbleSpeed + bubble.wobblePhase) * 0.15
          bubble.mesh.position.x = bubble.baseX + wobble

          if (bubble.mesh.position.y > 3.5) {
            resetBubble(bubble, false)
          }

          const mat = bubble.mesh.material
          if (mat.uniforms) {
            mat.uniforms.uTime.value = elapsed
          }
        })

        camera.position.x = Math.sin(elapsed * 0.3) * 0.4
        camera.lookAt(0.5, 1, 0)

        renderer.render(scene, camera)
      }
      animate()
    }

    const handleResize = (entries) => {
      const { width, height } = entries[0].contentRect
      if (width === 0 || height === 0) return

      if (!initialized) {
        initScene(width, height)
        return
      }

      camera.aspect = width / height
      camera.fov = calculateResponsiveFOV(width, height)

      if (sceneContentWidth > 0) {
        camera.position.z = calculateCameraZ(sceneContentWidth, sceneContentHeight, camera.fov, camera.aspect)
      }

      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(container)

  } catch (error) {
    console.error('Failed to initialize WebGL:', error)
    webglFailed.value = true
  }
})

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId)
  if (dracoLoader) dracoLoader.dispose()
  if (bubbleGeometry) bubbleGeometry.dispose()
  bubbles.forEach((b) => {
    if (b.mesh.material) b.mesh.material.dispose()
    if (scene) scene.remove(b.mesh)
  })
  letterMeshes.forEach((mesh) => {
    if (mesh.material) mesh.material.dispose()
    if (mesh.geometry) mesh.geometry.dispose()
  })
  if (renderer) {
    renderer.dispose()
    const canvas = renderer.domElement
    const container = containerRef.value
    if (container && container.contains(canvas)) {
      container.removeChild(canvas)
    }
  }
})
</script>

<style scoped>
.foam-logo-3d {
  border-radius: 4px;
  overflow: hidden;
  background: #0a0a0a;
  position: relative;
}

.foam-logo-3d :deep(canvas) {
  display: block;
}

.foam-fallback {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.foam-fallback-text {
  font-family: monospace;
  font-size: clamp(48px, 12vw, 96px);
  font-weight: 900;
  background: linear-gradient(135deg, #ff6b9d, #c44dff, #6b9dff, #4dffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-transform: lowercase;
  letter-spacing: -0.02em;
}
</style>
