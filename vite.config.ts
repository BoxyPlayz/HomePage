import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

// https://vitejs.dev/config/
export default defineConfig({
	base: 'https://boxyplayz.github.io/HomePage/',
	appType: 'spa',
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					preact: ['preact', 'preact/hooks', 'preact-iso'],
					wiki: ['wikipedia']
				}
			}
		}
	},
	server: {
		port: 8000
	},
	preview: {
		port: 8000
	},
	plugins: [preact()],
});
