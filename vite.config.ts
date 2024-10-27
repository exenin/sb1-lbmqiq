import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // Fix for Excalidraw "process is not defined" error
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      DEBUG_MODE: JSON.stringify(process.env.DEBUG_MODE || 'false'),
      DEMO_MODE: JSON.stringify(process.env.DEMO_MODE || 'true')
    }
  },
  optimizeDeps: {
    include: ['@excalidraw/excalidraw']
  }
});