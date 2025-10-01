import { create } from 'zustand'
import { getApiUrl } from './config.js'

export const useAppStore = create((set, get) => ({
  domain: '',
  isLoading: false,
  currentPhase: null,
  error: null,
  pdfData: null,
  auditData: null,

  setDomain: (domain) => set({ domain }),
  
  setLoading: (isLoading) => set({ isLoading }),
  
  setPhase: (phase) => set({ currentPhase: phase }),
  
  setError: (error) => set({ error }),
  
  clearError: () => set({ error: null }),

  setPdfData: (pdfData) => set({ pdfData }),

  setAuditData: (auditData) => set({ auditData }),

  reset: () => set({
    domain: '',
    isLoading: false,
    currentPhase: null,
    error: null,
    pdfData: null,
    auditData: null
  }),

  discoverPdfs: async (domain) => {
    set({ isLoading: true, currentPhase: 'discovering', error: null, pdfData: null, auditData: null })
    
    try {
      const response = await fetch(getApiUrl('/api/discover-pdfs'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ domain }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      set({ pdfData: data, currentPhase: 'discovered' })
      return data
    } catch (error) {
      set({ error: error.message, currentPhase: null })
      throw error
    }
  },

  auditPdfs: async (pdfUrls) => {
    set({ currentPhase: 'auditing' })
    
    try {
      const response = await fetch(getApiUrl('/api/audit-pdfs'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pdfUrls: pdfUrls.slice(0, 1) }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      set({ auditData: data, isLoading: false, currentPhase: 'completed' })
      return data
    } catch (error) {
      set({ error: error.message, isLoading: false, currentPhase: null })
      throw error
    }
  },

  processDomain: async (domain) => {
    console.log('domain is:'+domain)
    const { discoverPdfs, auditPdfs } = get()
    
    try {
      const pdfData = await discoverPdfs(domain)
      
      if (pdfData.pdfs && pdfData.pdfs.length > 0) {
        const pdfUrls = pdfData.pdfs.map(pdf => pdf.url)
        await auditPdfs(pdfUrls)
      } else {
        set({ isLoading: false, currentPhase: 'no-pdfs' })
      }
    } catch (error) {
      set({ isLoading: false, currentPhase: null })
    }
  },

  getPhaseMessage: () => {
    const { currentPhase } = get()
    
    switch (currentPhase) {
      case 'discovering':
        return 'Discovering PDFs...'
      case 'discovered':
        return 'PDFs found, preparing audit...'
      case 'auditing':
        return 'Running accessibility audit...'
      case 'completed':
        return 'Analysis complete!'
      case 'no-pdfs':
        return 'No PDFs found'
      default:
        return 'Discover & Audit PDFs'
    }
  }
}))