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
			output: {
				manualChunks: function manualChunks(id) {
					if (id.includes('iso')) {
						return 'preact-iso';
					}
					if (id.includes('preact')) {
						return 'preact';
					}
					if (id.includes('node_modules')) {
						return 'vendor';
					}
					if (id.includes('hooks')) {
						return 'hooks';
					}
					if (id.includes('cat')) {
						return 'cat';
					}
					if (id.includes('header')) {
						return 'head';
					}
					if (id.includes('dictionary')) {
						return 'dictionary';
					}
					if (id.includes('notes')) {
						return 'notes';
					}
					if (id.includes('wiki')) {
						return 'wiki';
					}
					if (id.includes('lrclib')) {
						return 'lrclib';
					}
					if (id.includes('Splash')) {
						return 'splash';
					}
					if (id.includes('jokes')) {
						return 'jokes';
					}
					if (id.includes('home')) {
						return 'home';
					}
					if (id.includes('searchy')) {
						return 'searchy';
					}
					if (id.includes('settings')) {
						return 'konfig';
					}

					return null;
				},
			},
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
