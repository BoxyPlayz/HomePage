import { useEffect, useRef, useState, useMemo } from 'preact/hooks';
import './styles.css';
import { Client } from 'lrclib-api';

const Lrclib = ({ song }: { song: string }) => {
	const [content, setContent] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [searchTerm, setSearchTerm] = useState<string>(song);
	const [Title, setTitle] = useState<string | null>(song);
	const contentRef = useRef<HTMLParagraphElement>(null);
	const searchRef = useRef<HTMLInputElement>(null);

	const client = useMemo(() => new Client(), []);

	const handleSearch = () => {
		const value = searchRef.current.value;
		if (value) {
			setSearchTerm(value);
		}
	};

	useEffect(() => {
		(async () => {
			try {
				client.searchLyrics({ query: searchTerm }).then((lyrics) => {
					if (!lyrics || lyrics.length === 0) {
						setError('No lyrics found.');
						setContent(null);
						return;
					}
					let lyric = lyrics[0].plainLyrics;
					if (new RegExp(/(?:\r\n|\r|\n)/g).test(lyric) == true)
						setContent(lyric.replace(/(?:\r\n|\r|\n)/g, '<br>'));
					if (lyrics[0].instrumental == true) {
						setContent('[Instrumental]');
					}
					setTitle(lyrics[0].trackName);
					setError(null);
					if (contentRef.current) {
						contentRef.current.innerHTML = lyric;
					}
				});
			} catch (err) {
				console.error(err);
				setError('Failed to load lyrics.');
				setContent(null);
				setTitle(null);
			}
		})();
	}, [searchTerm, client]);

	return (
		<div class='lrclib-component'>
			<h1 className='center'>Lrclib Search</h1>
			<input
				type='text'
				name='lrc-search'
				value={searchTerm}
				ref={searchRef}
				placeholder='Search Lrclib...'
				style={{ width: 'auto', marginBottom: '1rem' }}
			/>
			<button onClick={handleSearch}>Search</button>
			{Title && <h2>{Title}</h2>}
			{error && <p>{error}</p>}
			{!content && !error && <p>Loading...</p>}
			<p ref={contentRef} />
		</div>
	);
};

export default Lrclib;
