import { defineConfig, globalIgnores } from 'eslint/config';
// import path from 'node:path';
// import { fileURLToPath } from 'node:url';
import preact from 'eslint-config-preact';
import tseslint from 'typescript-eslint';
import eslint from '@eslint/js';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

export default defineConfig(
	eslint.configs.recommended,
	...preact,
	tseslint.configs.strict,
	[
		globalIgnores(['node_modules', 'dist']),
		{ languageOptions: { parserOptions: { projectService: true } } },
	]
);
