import { useContext, useEffect, useMemo, useState } from 'preact/hooks';
import searchyImg from '@/assets/searchy.png';
import { SearchyContext } from '@/contexts/searchyContext';
import SearchyData from './searchy.json';
import './styles.css';

interface Searchy {
	searches: Record<string, string>;
}

interface SearchyResult {
	name: string;
	url: string;
}

export default function Searchy() {
	const [search, setSearch] = useState<string>('');
	const [sortedResults, setSortedResults] = useState<SearchyResult[]>([]);
	const ctx = useContext(SearchyContext);
	if (!ctx) throw new Error('SearchyContext missing');

	const { searchy, setSearchy } = ctx;

	useEffect(() => {
		const fetchSearches = async () => {
			try {
				const data: Searchy = SearchyData;
				setSortedResults(
					Object.entries(data.searches)
						.sort(([a], [b]) =>
							a.localeCompare(b, undefined, {
								sensitivity: 'base',
							})
						)
						.map(([name, url]) => ({ name, url }))
				);
			} catch (err) {
				console.error(err);
			}
		};
		fetchSearches();
	}, []);

	const filteredResults = useMemo(() => {
		const query = search.trim().toLowerCase();
		if (query === '') return sortedResults;

		return sortedResults.filter(({ name }) => name.toLowerCase().includes(query));
	}, [search, sortedResults]);

	const handleSearchChange = (e: InputEvent) => {
		const searchX = (e.target as HTMLInputElement).value;
		if (searchX != null) {
			setSearch(searchX);
		}
	};

	if (!searchy) {
		return (
			<>
				<h1>Uh oh!</h1>
				<h2>Searchy is disabled</h2>
				<button onClick={() => setSearchy(true)}>Enable Searchy</button>
			</>
		);
	}

	return (
		<div>
			<h1>Searchy </h1>
			<img
				width={40}
				src={searchyImg}
				alt='Searchy'
			/>
			<input
				type='text'
				value={search}
				onInput={handleSearchChange}
				placeholder='France'
				style={{
					backgroundColor: 'white',
					color: 'black',
					verticalAlign: 'middle',
					display: 'inline-block',
					height: '3vh',
				}}
			/>
			<ul>
				{filteredResults.map((result) => (
					<li key={result.url}>
						<a
							target='_blank'
							rel='noopener noreferrer'
							href={result.url}>
							{result.name}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}
