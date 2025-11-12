import { useEffect, useRef, useState, useMemo } from 'preact/hooks';
import './styles.css';
import { DictionaryApiRequest } from './dictionaryApi';

const Dictionary = ({ word }: { word: string }) => {
	const [content, setContent] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [searchTerm, setSearchTerm] = useState<string>(word);
	const [Title, setTitle] = useState<string | null>(word);
	const contentRef = useRef<HTMLParagraphElement>(null);
	const searchRef = useRef<HTMLInputElement>(null);

	const handleSearch = () => {
		const value = searchRef.current.value;
		if (value) {
			setSearchTerm(value);
		}
	};

	useEffect(() => {
		(async () => {
			try {
				fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`)
					.then((response) => response.json() as Promise<DictionaryApiRequest>)
					.then((data) => {
						if (data[0].meanings.length > 1) {
							let contentString = '';
							data[0].meanings.forEach((entry) => {
								contentString += `(${entry.partOfSpeech})\n`;
								contentString += `${entry.definitions[0].definition}\n\n`;
							});
							setContent(contentString);
						}
						else if (data.length == 0) {
							setError('No definitions found.');
							setContent(null);
							return;
						}
						else {
						setContent(data[0].meanings[0].definitions[0].definition);
						}
						setTitle(data[0].word)
					})
				setError(null);
			} catch (err) {
				console.error(err);
				setError('Failed to load lyrics.');
				setContent(null);
				setTitle(null);
				if (contentRef.current) {
					contentRef.current.innerHTML = null;
				}
			}
		})();
	}, [searchTerm]);

	return (
		<div className='dict-component'>
			<h1 className='center'>Dictionary</h1>
			<input
				type='text'
				name='dict--search'
				value={searchTerm}
				ref={searchRef}
				placeholder='Search Words...'
				style={{ width: 'auto', marginBottom: '1rem' }}
			/>
			<button onClick={handleSearch}>Search</button>
			{Title && <h2>{Title}</h2>}
			{error && <p>{error}</p>}
			{!content && !error && <p>Loading...</p>}
			<p ref={contentRef}>{content}</p>
		</div>
	);
};

export default Dictionary;
