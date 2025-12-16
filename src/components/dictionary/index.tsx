import { useEffect, useRef, useState } from 'preact/hooks';
import type { DictionaryApiRequest } from './dictionaryApi.d.ts';
import './styles.css';

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
				fetch(
					`https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`
				)
					.then(
						(response) =>
							response.json() as Promise<DictionaryApiRequest>
					)
					.then((data) => {
						if (data[0].meanings.length > 1) {
							let contentString = '';
							let index = 1;
							data[0].meanings.forEach((entry) => {
								contentString += `(${entry.partOfSpeech})\n`;
								entry.definitions.forEach((ex) => {
									contentString += `${index}. ${ex.definition}\n`;
									contentString +=
										ex.example ?
											`Example: ${ex.example}\n`
										:	'';
									contentString +=
										(
											ex.synonyms
												.length >
											0
										) ?
											`Synonyms: ${ex.synonyms.join(', ')}\n`
										:	'';
									contentString +=
										(
											ex.antonyms
												.length >
											0
										) ?
											`Antonyms: ${ex.antonyms.join(', ')}\n`
										:	'';
									contentString += '\n';
									index++;
								});
							});
							setContent(contentString);
						} else if (data.length == 0) {
							setError('No definitions found.');
							setContent(null);
							return;
						} else {
							setContent(
								data[0].meanings[0].definitions[0]
									.definition
							);
						}
						setTitle(data[0].word);
					});
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
