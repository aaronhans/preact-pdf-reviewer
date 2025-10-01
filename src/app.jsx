import { DomainInput } from './components/DomainInput.jsx'
import { PdfResults } from './components/PdfResults.jsx'
import { AuditResults } from './components/AuditResults.jsx'
import { ProgressIndicator } from './components/ProgressIndicator.jsx'

export function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">
          PDF Accessibility Reviewer
        </h1>
        <p className="app-subtitle">
          Discover PDFs on any domain and audit their accessibility
        </p>
      </header>

      <main className="wa-stack app-main">
        <DomainInput />
        <ProgressIndicator />
        <AuditResults />
        <PdfResults />
      </main>
    </div>
  )
}