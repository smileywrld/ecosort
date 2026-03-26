import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SectionTitle from '../components/SectionTitle'
import { inferWasteFromFilename } from '../data'

export default function UploadPage({ analysis, setAnalysis }) {
  const [preview, setPreview] = useState(null)
  const [fileName, setFileName] = useState(analysis?.imageName ?? '')
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  function handleFile(file) {
    if (!file) return

    const nextAnalysis = {
      ...inferWasteFromFilename(file.name),
      imageName: file.name,
    }

    setAnalysis(nextAnalysis)
    setFileName(file.name)
    setPreview(URL.createObjectURL(file))
  }

  function onDrop(event) {
    event.preventDefault()
    setDragActive(false)
    handleFile(event.dataTransfer.files?.[0])
  }

  function analyzeImage() {
    navigate('/result')
  }

  return (
    <div className="page-stack">
      <section className="upload-layout">
        <div className="glass-card">
          <SectionTitle
            eyebrow="Upload / Scanner"
            title="Drop a waste image and let EcoSort AI inspect it"
            text="This demo uses filename-based waste hints to simulate AI analysis. Try names like plastic-bottle.jpg, food-scraps.png, or metal-can.jpeg."
          />

          <div
            className={`dropzone ${dragActive ? 'drag-active' : ''}`}
            onDragEnter={() => setDragActive(true)}
            onDragLeave={() => setDragActive(false)}
            onDragOver={(event) => event.preventDefault()}
            onDrop={onDrop}
            onClick={() => inputRef.current?.click()}
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(event) => handleFile(event.target.files?.[0])}
            />
            <p>Drag and drop your image here</p>
            <span>or click to upload</span>
          </div>

          <div className="upload-actions">
            <button
              type="button"
              className="button button-secondary"
              onClick={() => inputRef.current?.click()}
            >
              Upload Image
            </button>
            <button
              type="button"
              className="button button-primary"
              disabled={!fileName}
              onClick={analyzeImage}
            >
              Analyze
            </button>
          </div>
        </div>

        <aside className="preview-panel">
          <div className="preview-card">
            <p className="eyebrow">Preview image</p>
            {preview ? (
              <img src={preview} alt="Waste preview" className="preview-image" />
            ) : (
              <div className="preview-placeholder">Image preview appears here</div>
            )}
            <strong>{fileName || 'No file selected yet'}</strong>
          </div>
        </aside>
      </section>
    </div>
  )
}
