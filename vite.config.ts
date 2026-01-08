import preact from '@preact/preset-vite';
import 'dotenv/config';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
	base: '/HomePage/',
	appType: 'spa',
	build: {
		rollupOptions: {
			input: { main: 'index.html', notfound: '404.html' },
		},
	},
	resolve: { alias: { '@/': '/src/' } },
	server: { port: 8000 },
	preview: { port: 8000 },
	plugins: [
		preact(),
		VitePWA({
			registerType: 'prompt',
			injectRegister: 'auto',
			pwaAssets: { disabled: false, config: true },
			manifest: {
				name: "Boxy's Homepage",
				short_name: 'Searchy',
				description: 'A goofy little homepage I made.',
			},
			workbox: {
				globPatterns: ['**/*.{js,css,html,svg,png,ico,txt,json}'],
				cleanupOutdatedCaches: true,
				clientsClaim: true,
			},
			devOptions: {
				enabled: false,
				navigateFallback: 'index.html',
				suppressWarnings: true,
				type: 'module',
			},
		}),
	],
});
