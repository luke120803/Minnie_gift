import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        rollupOptions: {
            output: {
                // Isso força o Vite a separar bibliotecas pesadas em arquivos próprios
                manualChunks: {
                    'react-vendor': ['react', 'react-dom'],
                    'animations': ['framer-motion'],
                    'icons': ['lucide-react']
                }
            }
        }
    }
})