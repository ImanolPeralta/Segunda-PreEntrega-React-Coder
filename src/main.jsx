import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// Firebase imports
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCvTIPMCB9pDdABWRD02iGZb7aCoqOT2_M",
  authDomain: "the-dev-store-aab65.firebaseapp.com",
  projectId: "the-dev-store-aab65",
  storageBucket: "the-dev-store-aab65.firebasestorage.app",
  messagingSenderId: "311935800552",
  appId: "1:311935800552:web:380e249751183863dc655d"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
