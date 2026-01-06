import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="h-dvh w-screen bg-black text-white overflow-hidden flex flex-col select-none">
    <App/>
    </div>
  </StrictMode>,
)
