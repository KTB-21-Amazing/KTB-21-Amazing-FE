import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      phaser: 'phaser/src/phaser.js', // Phaser 내부 모듈 직접 참조
    },
  },
  build: {
    rollupOptions: {
      external: ['phaser3spectorjs'], // Phaser3SpectorJS를 빌드에서 제외
    },
  },
});
