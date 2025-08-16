import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000, // Optional: avoids warning, but chunks are still optimized
    rollupOptions: {
      output: {
        manualChunks(id) {
          // All node_modules go into separate vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('firebase')) {
              return 'firebase'; // separate firebase chunk
            }
            if (id.includes('chart.js')) {
              return 'charts';
            }
            if (id.includes('lucide-react')) {
              return 'ui';
            }
            return 'vendor'; // all other node_modules
          }
        },
      },
    },
  },
});
