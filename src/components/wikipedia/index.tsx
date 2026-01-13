import { useEffect, useRef, useState } from 'preact/hooks';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import './styles.css';
import type { Summary } from './wiki';

type wikiArticles = Record<
	string,
	{ summary: string; title: string; siteURI: string; time: number }
>;

const WIKI_TTL = 1000 * 60 * 60;

const Wikipedia = ({ title }: { title: string }) => {
	const [content, setContent] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [searchTerm, setSearchTerm] = useState<string>(title);
	const [Title, setTitle] = useState<string | null>(title);
	const [siteURL, setSiteURL] = useState<string>(title);
	const searchRef = useRef<HTMLInputElement>(null);
	const [articles, setArticles] = useLocalStorage<wikiArticles>('wiki', {});

	const handleSearch = () => {
		const value = searchRef.current?.value;
		if (!value) return;
		setSearchTerm(value);
	};

	useEffect(() => {
		(async () => {
			const key = searchTerm.toLowerCase();
			const cached = articles[key];
			const now = Date.now();
			if (cached && now - cached.time < WIKI_TTL) {
				setContent(cached.summary);
				setTitle(cached.title);
				setSiteURL(cached.siteURI);
				setError(null);
				return;
			}
			try {
				const page: Summary = await (
					await fetch(
						`https://en.wikipedia.org/api/rest_v1/page/summary/${key}`
					)
				).json();

				const article = {
					summary: page.extract,
					title: page.title,
					siteURI: page.content_urls.desktop.page,
					time: now,
				};

				setContent(article.summary);
				setTitle(article.title);
				setSiteURL(article.siteURI);
				setError(null);
				setArticles({ ...articles, [key]: article });
			} catch (err) {
				console.error(err);
				setError('Failed to load summary.');
				setContent(null);
				setTitle(null);
			}
		})();
	}, [searchTerm, articles, setArticles]);

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
