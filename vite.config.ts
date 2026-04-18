import preact from '@preact/preset-vite';
import 'dotenv/config';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
	base: '/HomePage/',
	appType: 'spa',
	build: {
		license: true,
		sourcemap: "inline",
		manifest: true,
		reportCompressedSize: false,
		rollupOptions: {
			input: { main: 'index.html', notfound: '404.html' },
			output: {
				codeSplitting: {
					maxSize: 10000,
					minSize: 100,
					groups: [
						{
							test: /node_modules/,
							name: "libs"
						},
						{
							test: /hooks/,
							name: "hooks"
						},
						{
							test: /pages/,
							name: "pages"
						},
						{
							test: /components/,
							name: "components"
						},
						{
							test: /contexts/,
							name: "contexts"
						}
					]
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
				runtimeCaching: [
					{
						handler: 'CacheFirst',
						urlPattern: /.*/,
						options: { cacheName: 'homepage-cache-box26' },
					},
				],
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
