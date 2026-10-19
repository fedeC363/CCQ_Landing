import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LanguageProvider } from './i18n/useLanguage.js'
import App from './App.jsx'
import './styles/tokens.css'
import './styles/global.css'
import './styles/sections.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
)
