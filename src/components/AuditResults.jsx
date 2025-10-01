import { useAppStore } from '../store.js'

export function AuditResults() {
  const { auditData } = useAppStore()

  if (!auditData || !auditData.audits || auditData.audits.length === 0) {
    return null
  }

  return (
    <div className="results-container">
      <div className="results-card">
        <h2 className="results-title">Accessibility Audit Results</h2>
        <p className="results-subtitle">
          Showing accessibility analysis for {auditData.audits.length} PDF{auditData.audits.length > 1 ? 's' : ''}:
        </p>
        
        <div className="wa-stack audit-list">
          {auditData.audits.map((audit, index) => (
            <div key={index} className="audit-item">
              <div className="audit-url">{audit.url}</div>
              
              {audit.pdfAuditReport ? (
                <VeraPdfReport report={audit.pdfAuditReport} />
              ) : audit.issues && audit.issues.length > 0 ? (
                <LegacyIssuesList issues={audit.issues} />
              ) : (
                <div className="no-issues">
                  ✅ No accessibility issues detected for this PDF
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function VeraPdfReport({ report }) {
  const { overview, topProblemAreas, metadata } = report
  const isCompliant = overview.complianceStatus === 'COMPLIANT'

  return (
    <div className="verapdf-report">
      <div className="compliance-overview">
        <div className={`compliance-status ${isCompliant ? 'compliant' : 'non-compliant'}`}>
          {isCompliant ? '✅ COMPLIANT' : '❌ NON-COMPLIANT'}
        </div>
        <div className="overview-stats">
          <span className="stat">
            <strong>{overview.totalIssues}</strong> total issues
          </span>
          {overview.criticalIssues > 0 && (
            <span className="stat critical">
              <strong>{overview.criticalIssues}</strong> critical
            </span>
          )}
          <span className="stat">
            Severity: <strong>{overview.overallSeverity}</strong>
          </span>
          <span className="stat">
            Complexity: <strong>{overview.estimatedComplexity}</strong>
          </span>
        </div>
      </div>

      {topProblemAreas.length > 0 && (
        <div className="problem-areas">
          <h4>Problem Areas</h4>
          <div className="problem-list">
            {topProblemAreas.map((area, index) => (
              <div key={index} className="problem-area">
                <span className="area-name">{area.name}</span>
                <span className="issue-count">{area.issueCount} issues</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {metadata && (
        <div className="audit-metadata">
          <small>Audited on {formatDate(metadata.auditDate)}</small>
        </div>
      )}
    </div>
  )
}

function LegacyIssuesList({ issues }) {
  return (
    <ul className="audit-issues">
      {issues.map((issue, issueIndex) => (
        <li key={issueIndex} className="audit-issue">
          <div className="issue-type">{issue.type || 'Accessibility Issue'}</div>
          <div className="issue-description">{issue.description}</div>
        </li>
      ))}
    </ul>
  )
}

function formatDate(dateString) {
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch {
    return dateString
  }
}