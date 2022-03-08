import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	server: {
		port: 8000,
		strictPort: false,
	},
	build: {
		outDir: 'dist',
		sourcemap: false,
		minify: false,
	},
	plugins: [
		react(),
	],
});
