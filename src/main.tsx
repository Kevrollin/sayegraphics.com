import '@fontsource-variable/manrope'
import './styles/index.css'
import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Production builds ship prerendered HTML (see scripts/prerender.mjs), which
// React hydrates. The dev server starts with an empty root instead.
if (root.firstElementChild) {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}
