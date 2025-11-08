<template>
  <div class="qr-code-wrapper">
    <!-- Generate Mode -->
    <div v-if="mode === 'generate'" class="qr-code-generate">
      <canvas ref="qrCanvas" data-testid="canvas-qr-generate"></canvas>
      <p v-if="error" class="qr-code-error" role="alert">{{ error }}</p>
    </div>

    <!-- Read Mode -->
    <div v-else-if="mode === 'read'" class="qr-code-read">
      <div class="qr-code-video-container">
        <video ref="videoElement" data-testid="video-qr-scanner" autoplay playsinline></video>
        <canvas ref="scanCanvas" data-testid="canvas-qr-scan"></canvas>
        <div class="qr-code-overlay">
          <div class="qr-code-scanning-box"></div>
          <p class="qr-code-scan-text">{{ scanningText }}</p>
        </div>
      </div>
      <p v-if="error" class="qr-code-error" role="alert">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount, defineProps, defineEmits } from 'vue'
import QRCode from 'qrcode'
import jsQR from 'jsqr'

const props = defineProps({
  data: {
    type: [Object, Array, String],
    default: null,
  },
  mode: {
    type: String,
    default: 'generate',
    validator: (value) => ['generate', 'read'].includes(value),
  },
  size: {
    type: Number,
    default: 300,
  },
  errorCorrectionLevel: {
    type: String,
    default: 'M',
    validator: (value) => ['L', 'M', 'Q', 'H'].includes(value),
  },
})

const emit = defineEmits(['scanned', 'error'])

const qrCanvas = ref(null)
const videoElement = ref(null)
const scanCanvas = ref(null)
const error = ref('')
const scanningText = ref('Position QR code in the frame')
let mediaStream = null
let animationFrameId = null

// Generate QR Code
const generateQRCode = async () => {
  if (!props.data || !qrCanvas.value) {
    return
  }

  try {
    error.value = ''
    const jsonString = JSON.stringify(props.data)

    await QRCode.toCanvas(qrCanvas.value, jsonString, {
      width: props.size,
      errorCorrectionLevel: props.errorCorrectionLevel,
      margin: 1,
    })
  } catch (err) {
    error.value = 'Failed to generate QR code'
    emit('error', { type: 'generation', message: err.message })
  }
}

// Start Camera
const startCamera = async () => {
  try {
    error.value = ''
    scanningText.value = 'Requesting camera access...'

    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' },
    })

    mediaStream = stream

    if (videoElement.value) {
      videoElement.value.srcObject = stream
      videoElement.value.setAttribute('playsinline', true)
      await videoElement.value.play()
      scanningText.value = 'Position QR code in the frame'
      requestAnimationFrame(scanQRCode)
    }
  } catch (err) {
    error.value = 'Camera access denied or not available'
    scanningText.value = 'Unable to access camera'
    emit('error', { type: 'camera', message: err.message })
  }
}

// Scan QR Code from video stream
const scanQRCode = () => {
  if (!videoElement.value || !scanCanvas.value) {
    return
  }

  const video = videoElement.value
  const canvas = scanCanvas.value
  const canvasContext = canvas.getContext('2d')

  if (video.readyState === video.HAVE_ENOUGH_DATA) {
    canvas.height = video.videoHeight
    canvas.width = video.videoWidth

    canvasContext.drawImage(video, 0, 0, canvas.width, canvas.height)
    const imageData = canvasContext.getImageData(0, 0, canvas.width, canvas.height)
    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: 'dontInvert',
    })

    if (code) {
      try {
        scanningText.value = 'QR Code detected! Processing...'
        const parsedData = JSON.parse(code.data)
        emit('scanned', parsedData)
        scanningText.value = 'QR Code scanned successfully!'

        // Optional: Stop scanning after successful read
        // You can remove these lines if you want continuous scanning
        setTimeout(() => {
          scanningText.value = 'Position QR code in the frame'
        }, 2000)
      } catch (err) {
        error.value = 'Invalid QR code data (not valid JSON)'
        scanningText.value = 'Invalid QR code detected'
        emit('error', { type: 'parsing', message: err.message })
      }
    }
  }

  animationFrameId = requestAnimationFrame(scanQRCode)
}

// Stop Camera
const stopCamera = () => {
  if (mediaStream) {
    mediaStream.getTracks().forEach((track) => track.stop())
    mediaStream = null
  }

  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }

  if (videoElement.value) {
    videoElement.value.srcObject = null
  }
}

// Watch for mode changes
watch(
  () => props.mode,
  (newMode) => {
    error.value = ''
    stopCamera()

    if (newMode === 'generate') {
      generateQRCode()
    } else if (newMode === 'read') {
      startCamera()
    }
  },
)

// Watch for data changes in generate mode
watch(
  () => props.data,
  () => {
    if (props.mode === 'generate') {
      generateQRCode()
    }
  },
  { deep: true },
)

// Initialize component
onMounted(() => {
  if (props.mode === 'generate') {
    generateQRCode()
  } else if (props.mode === 'read') {
    startCamera()
  }
})

// Cleanup on unmount
onBeforeUnmount(() => {
  stopCamera()
})
</script>
