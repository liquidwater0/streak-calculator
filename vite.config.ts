import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/streak-calculator/",
  build: {
		emptyOutDir: true,
	},
	resolve: {
		alias: {
			'@': `${path.resolve(__dirname, 'src')}`,
			'@assets': `${path.resolve(__dirname, 'src/assets')}`,
			'@scss': `${path.resolve(__dirname, 'src/scss')}`,
			'@components': `${path.resolve(__dirname, 'src/components')}`,
			'@store': `${path.resolve(__dirname, 'src/store')}`,
		},
	},
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@scss/_colors.scss" as *;
          @use "@scss/_font.scss" as *;
          @use "@scss/_theme.scss" as *;
        `
      }
    }
  }
});