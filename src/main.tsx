import { createRoot } from 'react-dom/client'
import { Toaster } from 'sonner'

import './styles.css'
import './styles/globals.css'

import App from './App.tsx'


createRoot(document.getElementById('root')!).render(
  <>
    <App />
    <Toaster position="top-center" />
  </>,
)
