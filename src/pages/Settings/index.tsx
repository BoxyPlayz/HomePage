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

	return (
		<div>
			<h2>Konfig</h2>
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
			<button onClick={() => setSearchy(!searchy)}>
				{searchy ? 'Disable' : 'Enable'} Searchy
			</button>
		</div>
	);
}
