import preact from '@preact/preset-vite';
import 'dotenv/config';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
	base: '/HomePage/',
	appType: 'spa',
	build: {
		rollupOptions: {
			input: { main: 'index.html', notfound: '404.html' },
			output: {
				advancedChunks: {
					groups: [
						{ name: 'libs', test: '/node_modules/' },
						{ name: 'components', test: '/src/components' },
						{ name: 'contexts', test: '/src/contexts' },
						{ name: 'home', test: '/src/pages/Home' },
						{ name: 'searchy', test: '/src/pages/Searchy' },
						{ name: 'konfig', test: '/src/pages/Settings' },
					],
				},
			},
		},
	},
	resolve: { alias: { '@/': '/src/' } },
	server: { port: 8000 },
	preview: { port: 8000 },
	plugins: [
		preact(),
		nodePolyfills({ include: ['path'] }),
		VitePWA({
			registerType: 'autoUpdate',
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
