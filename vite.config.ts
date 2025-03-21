import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// vite.config.js
export default {
  server: {
    host: '0.0.0.0', // Aceita conexões de qualquer IP
    port: 5173,
  },
};