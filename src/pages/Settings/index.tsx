import { useLocalStorage } from '@reactuses/core';

export default function Settings() {
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
		</div>
	);
}
