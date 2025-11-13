import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import 'dotenv/config';

// https://vitejs.dev/config/
export default defineConfig({
	base: "/HomePage/",
	appType: 'spa',
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					preact: ['preact', 'preact/hooks', 'preact-iso'],
					wiki: ['wikipedia'],
				},
			},
		},
	},
	resolve: { alias: { '@/': '/src/' } },
	server: { port: 8000 },
	preview: { port: 8000 },
	plugins: [preact(), nodePolyfills({ include: ['path'] })],
});
