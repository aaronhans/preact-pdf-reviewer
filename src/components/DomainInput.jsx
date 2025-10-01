import { useState } from 'preact/hooks'
import { useAppStore } from '../store.js'

export function DomainInput() {
  const [inputValue, setInputValue] = useState('')
  const { isLoading, error, processDomain, setDomain, clearError, getPhaseMessage } = useAppStore()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!inputValue.trim()) {
      return
    }

    clearError()
    setDomain(inputValue.trim())
    await processDomain(inputValue.trim())
  }

  const handleInputChange = (e) => {
    const value = e.target.value || e.detail?.value || ''
    setInputValue(value)
    if (error) {
      clearError()
    }
  }

  return (
    <div className="domain-input-card">
      <form onSubmit={handleSubmit} className="wa-stack">
        <div>
          <wa-input
            id="domain"
            type="text"
            value={inputValue}
            onInput={handleInputChange}
            onChange={handleInputChange}
            placeholder="Enter domain (e.g., example.com)"
            disabled={isLoading}
            label="Domain Name"
            size="large"
            style="width: 100%"
          />
        </div>
        
        {error && (
          <div className="error-message">
            <strong>Error:</strong> {error}
          </div>
        )}

        <wa-button 
          type="submit" 
          variant="primary"
          size="large"
          disabled={isLoading || !inputValue.trim()}
          loading={isLoading}
          style="width: 100%"
        >
          {getPhaseMessage()}
        </wa-button>
      </form>
    </div>
  )
}