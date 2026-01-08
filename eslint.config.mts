import eslint from '@eslint/js';
import preact from 'eslint-config-preact';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';

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
