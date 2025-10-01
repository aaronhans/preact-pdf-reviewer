// API configuration for different environments
export const API_CONFIG = {
  // Development: local Architect app
  development: {
    baseUrl: 'http://localhost:3333'
  },
  
  // Production: deployed API endpoints
  production: {
    // Option 1: Same domain as 11ty site
    baseUrl: 'https://pdf.my.scangov.com' // Relative URLs like /api/discover-pdfs
    
    // Option 2: Different domain (if your API is deployed elsewhere)
    // baseUrl: 'https://your-api-domain.com'
  }
}

export const getApiUrl = (endpoint) => {
  const env = process.env.NODE_ENV || 'development'
  const config = API_CONFIG[env]
  return `${config.baseUrl}${endpoint}`
}