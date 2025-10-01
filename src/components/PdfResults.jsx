import { useAppStore } from '../store.js'

export function PdfResults() {
  const { pdfData } = useAppStore()

  if (!pdfData) {
    return null
  }

  const { pdfs, stats } = pdfData

  return (
    <div className="results-container">
      <div className="results-card">
        <h2 className="results-title">PDF Discovery Results</h2>
        
        <div className="wa-grid stats-grid">
          <wa-card className="stat-card">
            <div className="stat-value">{stats.pdfCount}</div>
            <div className="stat-label">PDFs Found</div>
          </wa-card>
          
          <wa-card className="stat-card">
            <div className="stat-value">{stats.totalFiles}</div>
            <div className="stat-label">Total Files</div>
          </wa-card>
          
          <wa-card className="stat-card">
            <div className="stat-value">
              {stats.totalFiles > 0 ? Math.round((stats.pdfCount / stats.totalFiles) * 100) : 0}%
            </div>
            <div className="stat-label">PDF Ratio</div>
          </wa-card>
          
          <wa-card className="stat-card">
            <div className="stat-value">
              {formatFileSize(stats.averageSize || 0)}
            </div>
            <div className="stat-label">Average Size</div>
          </wa-card>
          
          {stats.sizesChecked && stats.sizesChecked < stats.pdfCount && (
            <wa-card className="stat-card">
              <div className="stat-value">{stats.sizesChecked}</div>
              <div className="stat-label">Sizes Checked</div>
            </wa-card>
          )}
        </div>

        {pdfs.length > 0 && (
          <div className="pdf-section">
            <h3>Found PDFs</h3>
            <ul className="pdf-list">
              {pdfs.map((pdf, index) => (
                <li key={index} className="pdf-item">
                  <div className="pdf-url">{pdf.url}</div>
                  <div className="pdf-size">
                    Size: {pdf.size !== null ? formatFileSize(pdf.size) : 'Not checked'}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

function formatFileSize(bytes) {
  if (!bytes) return 'Unknown'
  
  const units = ['B', 'KB', 'MB', 'GB']
  let size = bytes
  let unitIndex = 0
  
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024
    unitIndex++
  }
  
  return `${size.toFixed(1)} ${units[unitIndex]}`
}