import { StrictMode } from 'react' //tools for debugging
import { createRoot } from 'react-dom/client' //createRoot from react-dom/client library to create a "root" in the DOM where React application will be sent.
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
