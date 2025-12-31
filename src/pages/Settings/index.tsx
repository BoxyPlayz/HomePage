import { useLocalStorage } from '@reactuses/core';
import { useContext } from 'preact/hooks';
import { SearchyContext } from '@/contexts/searchyContext';

export default function Settings() {
	const ctx = useContext(SearchyContext);
	if (!ctx) throw new Error('SearchyContext missing');

	const { searchy, setSearchy } = ctx;

	const [selectedEngine, setSelectedEngine] = useLocalStorage(
		'searchURI',
		'https://www.google.com/search?q='
	);

	const [autoSave, setAutoSave] = useLocalStorage('autosave', false);

	return (
		<div>
			<h1>Konfig</h1>
			<h2>Main</h2>
			<select
				value={selectedEngine}
				onChange={(e) =>
					setSelectedEngine((e.target as HTMLSelectElement).value)
				}>
				<option value='https://www.google.com/search?q='>Google</option>
				<option value='https://www.bing.com/search?q='>Bing</option>
				<option value='https://search.yahoo.com/search?p='>Yahoo</option>
			</select>
			<br />
			<h2>Searchy</h2>
			<button onClick={() => setSearchy(!searchy)}>
				{searchy ? 'Disable' : 'Enable'} Searchy
			</button>
			<br />
			<h2>Notes</h2>
			<button onClick={() => setAutoSave(!autoSave)}>
				{autoSave ? 'Disable' : 'Enable'} AutoSave
			</button>
		</div>
	);
}
