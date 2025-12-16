import preact from '@preact/preset-vite';
import 'dotenv/config';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vitejs.dev/config/
export default defineConfig({
	base: '/HomePage/',
	appType: 'spa',
	build: { rollupOptions: { input: { main: 'index.html', notfound: '404.html' } } },
	resolve: { alias: { '@/': '/src/' } },
	server: { port: 8000 },
	preview: { port: 8000 },
	plugins: [preact(), nodePolyfills({ include: ['path'] })],
});
