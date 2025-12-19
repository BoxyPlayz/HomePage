import { useEffect, useRef, useState } from 'preact/hooks';
import wiki from 'wikipedia';
import './styles.css';

const Wikipedia = ({ title }: { title: string }) => {
	const [content, setContent] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [searchTerm, setSearchTerm] = useState<string>(title);
	const [Title, setTitle] = useState<string | null>(title);
	const [siteURL, setSiteURL] = useState<string>(title);
	const searchRef = useRef<HTMLInputElement>(null);

	const handleSearch = () => {
		const value = searchRef.current.value;
		setSearchTerm(value);
	};

	useEffect(() => {
		(async () => {
			try {
				const page = await wiki.summary(searchTerm);
				setContent(page.extract);
				setTitle(page.title);
				setSiteURL(page.content_urls["desktop"].page);
				setError(null);
			} catch (err) {
				console.error(err);
				setError('Failed to load summary.');
				setContent(null);
				setTitle(null);
			}
		})();
	}, [searchTerm]);

	return (
		<div class='wikipedia-component'>
			<h1 className='garamond-font center'>Wikipedia Search</h1>
			<input
				type='text'
				name='wiki-search'
				value={searchTerm}
				ref={searchRef}
				placeholder='Search Wikipedia...'
				style={{ width: '100%', marginBottom: '1rem' }}
			/>
			<button onClick={handleSearch}>Search</button>
			{Title && <h2>{Title}</h2>}
			{error && <p>{error}</p>}
			{!content && !error && <p>Loading...</p>}
			{content && <p>{content}</p>}
			{siteURL && (
				<>
					<br />
					{!error && (
						<a
							href={siteURL}
							target='_blank'
							rel='noopener noreferrer'>
							Read more on Wikipedia
						</a>
					)}
				</>
			)}
		</div>
	);
};

export default Wikipedia;
