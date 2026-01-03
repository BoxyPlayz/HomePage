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
				<optgroup label='Common'>
					<option value='https://www.google.com/search?q='>
						Google
					</option>
					<option value='https://www.bing.com/search?q='>Bing</option>
					<option value='https://search.yahoo.com/search?p='>
						Yahoo
					</option>
					<option value='https://duckduckgo.com/?q='>
						Duckduckgo
					</option>
					<option value='https://en.wikipedia.org/wiki/'>
						Wikipedia
					</option>
				</optgroup>
				<optgroup label='Music and Video'>
					<option value='https://www.youtube.com/results?search_query='>
						YouTube
					</option>
					<option value='https://open.spotify.com/search/'>
						Spotify
					</option>
					<option value='https://www.tiktok.com/search/video?q='>
						TikTok
					</option>
				</optgroup>
				<optgroup label='Social Media'>
					<option value='https://www.facebook.com/search/top/?q='>
						Facebook
					</option>
					<option value='https://x.com/search?q='>Twitter</option>
					<option value='https://www.reddit.com/search/?q='>
						Reddit
					</option>
				</optgroup>
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
