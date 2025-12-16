import eslint from '@eslint/js';
// import path from 'node:path';
// import { fileURLToPath } from 'node:url';
import preact from 'eslint-config-preact';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

export default defineConfig(eslint.configs.recommended, ...preact, tseslint.configs.strict, [
	globalIgnores(['node_modules', 'dist']),
	{
		languageOptions: {
			parserOptions: {
				projectService: { allowDefaultProject: ['*.mjs', '*.tsx'] },
			},
		},
	},
]);
