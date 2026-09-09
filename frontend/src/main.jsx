import { BrowserRouter } from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  // React routing, no reloading browser, makes <Link> work
  <BrowserRouter>
  <App />
  </BrowserRouter>
  
)
