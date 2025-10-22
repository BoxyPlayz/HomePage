import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

// https://vitejs.dev/config/
export default defineConfig({
	base: './',
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
	plugins: [preact()],
});
