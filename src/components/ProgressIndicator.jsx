import { useAppStore } from '../store.js'

export function ProgressIndicator() {
  const { currentPhase, isLoading } = useAppStore()

  if (!isLoading && !currentPhase) {
    return null
  }

  const phases = [
    { key: 'discovering', label: 'Discovering PDFs', icon: '🔍' },
    { key: 'discovered', label: 'PDFs Found', icon: '📄' },
    { key: 'auditing', label: 'Running Audit', icon: '🔍' },
    { key: 'completed', label: 'Analysis Complete', icon: '✅' }
  ]

  const getPhaseIndex = (phase) => {
    return phases.findIndex(p => p.key === phase)
  }

  const currentIndex = getPhaseIndex(currentPhase)

  return (
    <div className="progress-card">
      <div className="wa-cluster progress-steps">
        {phases.map((phase, index) => {
          const isActive = index === currentIndex
          const isCompleted = index < currentIndex
          const isCurrent = index === currentIndex && isLoading
          
          return (
            <div 
              key={phase.key}
              className={`wa-stack progress-step ${
                isActive || isCompleted || isCurrent ? 'active' : 'inactive'
              }`}
            >
              <div className={`progress-icon ${
                isCompleted ? 'completed' : isCurrent ? 'current' : 'pending'
              }`}>
                {isCurrent ? <span className="spinner-small"></span> : phase.icon}
              </div>
              <div className="progress-label">
                {phase.label}
              </div>
            </div>
          )
        })}
      </div>
      
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${Math.max(0, (currentIndex + 1) / phases.length * 100)}%` }}
        ></div>
      </div>
    </div>
  )
}