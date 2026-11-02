import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    // Shared by the client and prerender builds so the footer year hydrates cleanly.
    __BUILD_YEAR__: JSON.stringify(new Date().getFullYear()),
  },
  build: {
    // Hashed JS/CSS/fonts go to /static (cached for a year, see vercel.json),
    // keeping them apart from the editable images in /assets.
    assetsDir: 'static',
  },
})
