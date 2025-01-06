import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'

// Add custom styles for fixed circular overlay
const style = document.createElement('style')
style.textContent = `
  .cropper-view-box {
    outline: 0;
  }

  .image-container {
    position: relative;
    overflow: hidden;
  }

  .fixed-circle-overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: 2px solid white;
    pointer-events: none;
    z-index: 100;
  }

  .overlay-background {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 99;
  }

  .overlay-background::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
  }

  .overlay-background::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: transparent;
    box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.7);
  }

  .cropper-container {
    position: relative !important;
  }

  .cropper-crop-box {
    opacity: 0;
  }

  .cropper-modal {
    background: none !important;
  }

  .cropper-view-box {
    outline: none;
  }

  .cropper-face {
    opacity: 0;
  }

  /* Style the profile preview */
  #profilePreview {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover;
  }

  #uploadButton {
    width: 96px !important;
    height: 96px !important;
    border-radius: 50% !important;
    overflow: hidden !important;
  }
`
document.head.appendChild(style)

export function initImageEditor() {
  const profileImage = document.getElementById('profileImage') as HTMLInputElement
  const profilePreview = document.getElementById('profilePreview') as HTMLImageElement
  const defaultAvatar = document.getElementById('defaultAvatar') as HTMLElement
  const uploadButton = document.getElementById('uploadButton')
  const imageEditorModal = document.getElementById('imageEditorModal')
  const cropperImage = document.getElementById('cropperImage') as HTMLImageElement
  const closeEditor = document.getElementById('closeEditor')
  const saveEdit = document.getElementById('saveEdit')
  const cancelEdit = document.getElementById('cancelEdit')
  const zoomSlider = document.getElementById('zoomSlider') as HTMLInputElement
  
  let cropper: Cropper | null = null
  let circleOverlay: HTMLDivElement | null = null
  let overlayBackground: HTMLDivElement | null = null

  // Initialize cropper when image is selected
  function initCropper(imageData: string) {
    console.log('Initializing cropper')
    imageEditorModal?.classList.remove('hidden')
    cropperImage.src = imageData
    cropperImage.classList.remove('hidden')
    
    // Add image-container class to the container
    const container = document.querySelector('.aspect-square') as HTMLElement
    if (container) {
      container.classList.add('image-container')
    }
    
    // Create overlay background if it doesn't exist
    if (!overlayBackground) {
      overlayBackground = document.createElement('div')
      overlayBackground.className = 'overlay-background'
      container?.appendChild(overlayBackground)
    }
    
    // Create circle overlay if it doesn't exist
    if (!circleOverlay) {
      circleOverlay = document.createElement('div')
      circleOverlay.className = 'fixed-circle-overlay'
      container?.appendChild(circleOverlay)
    }
    
    // Wait for image to load
    cropperImage.onload = function() {
      console.log('Image loaded')
      if (cropper) {
        cropper.destroy()
      }
      
      try {
        cropper = new Cropper(cropperImage, {
          viewMode: 1,
          dragMode: 'move',
          aspectRatio: 1,
          autoCropArea: 1,
          cropBoxMovable: false,
          cropBoxResizable: false,
          zoomable: true,
          rotatable: false,
          scalable: false,
          guides: false,
          center: false,
          highlight: false,
          background: true,
          minCropBoxWidth: 200,
          minCropBoxHeight: 200,
          responsive: true,
          toggleDragModeOnDblclick: false,
          ready: function() {
            // Set initial crop box position
            const canvasData = cropper?.getCanvasData()
            if (canvasData) {
              const centerX = canvasData.left + (canvasData.width / 2)
              const centerY = canvasData.top + (canvasData.height / 2)
              cropper?.setCropBoxData({
                left: centerX - 100,
                top: centerY - 100,
                width: 200,
                height: 200
              })
            }
          }
        })
        console.log('Cropper initialized')
      } catch (error) {
        console.error('Error initializing cropper:', error)
      }
    }
  }

  // Close editor handler
  function closeImageEditor() {
    console.log('Closing editor')
    imageEditorModal?.classList.add('hidden')
    if (cropper) {
      cropper.destroy()
      cropper = null
    }
    if (circleOverlay && circleOverlay.parentNode) {
      circleOverlay.parentNode.removeChild(circleOverlay)
      circleOverlay = null
    }
    if (overlayBackground && overlayBackground.parentNode) {
      overlayBackground.parentNode.removeChild(overlayBackground)
      overlayBackground = null
    }
    // Remove image-container class
    const container = document.querySelector('.aspect-square')
    container?.classList.remove('image-container')
  }

  closeEditor?.addEventListener('click', closeImageEditor)
  cancelEdit?.addEventListener('click', closeImageEditor)

  // Zoom handler
  zoomSlider?.addEventListener('input', (e) => {
    const target = e.target as HTMLInputElement
    const value = parseFloat(target.value)
    if (cropper) {
      const currentZoom = cropper.getImageData().width / cropper.getImageData().naturalWidth
      const zoomChange = value - currentZoom
      cropper.zoom(zoomChange)
    }
  })

  // Save edit handler
  saveEdit?.addEventListener('click', function() {
    console.log('Save clicked')
    if (cropper) {
      try {
        const canvas = cropper.getCroppedCanvas({
          width: 96, // Match the button size
          height: 96,
        })
        console.log('Canvas created')
        const croppedImageData = canvas.toDataURL('image/jpeg')
        profilePreview.src = croppedImageData
        profilePreview.classList.remove('hidden')
        defaultAvatar?.classList.add('hidden')
        closeImageEditor()
        console.log('Image saved')
      } catch (error) {
        console.error('Error saving crop:', error)
      }
    } else {
      console.error('Cropper not initialized')
    }
  })

  // Handle image upload
  if (profileImage && uploadButton) {
    uploadButton.addEventListener('click', () => {
      profileImage.click()
    })

    profileImage.addEventListener('change', (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        console.log('File selected:', file.name)
        const reader = new FileReader()
        reader.onload = (e) => {
          const result = e.target?.result
          if (result) {
            initCropper(result as string)
          }
        }
        reader.readAsDataURL(file)
      }
    })
  }
}
