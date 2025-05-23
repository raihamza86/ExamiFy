import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(),
    tailwindcss(),],
    fontFamily: {
      merriweather: ["Merriweather", "serif"],
      opensans: ["Open Sans", "sans-serif"],
    },

  
  
})
