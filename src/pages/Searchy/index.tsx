import { get_base_url } from '@/utils.ts';
import { useEffect, useState } from 'preact/hooks';
import searchyImg from '@/assets/searchy.png';
import './styles.css';

interface searchy {
	searches: Record<string, string>;
}

interface searchyResult {
	name: string;
	url: string;
}

export default function Searchy() {
	const [search, setSearch] = useState<string>('');
	const [searchyData, setSearchyData] = useState<searchy | null>(null);
	const [results, setResults] = useState<searchyResult[]>([]);

	useEffect(() => {
		const fetchSearches = async () => {
			try {
				const res = await fetch(`${get_base_url()}searchy.json`);
				const data = (await res.json()) as searchy;
				setSearchyData(data);
				setResults(
					Object.entries(data.searches).map(([name, url]) => ({ name, url }))
				);
			} catch (err) {
				console.error('Failed to load searchy.json', err);
			}
		};
		fetchSearches();
	}, []);

	const handleSearchChange = (e: InputEvent) => {
		const query = (e.target as HTMLInputElement).value;
		setSearch(query);

		if (!searchyData) return;

		const trimmedQuery = query.trim().toLowerCase();
		if (trimmedQuery.length === 0) {
			setResults(
				Object.entries(searchyData.searches).map(([name, url]) => ({
					name,
					url,
				}))
			);
			return;
		}

		const newResults = Object.entries(searchyData.searches)
			.filter(([name]) => name.toLowerCase().includes(trimmedQuery))
			.map(([name, url]) => ({ name, url }));

		setResults(newResults);
	};

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
				}}
			/>
			<ul>
				{results.map((result) => (
					<li key={result.url}>
						<a href={result.url}>{result.name}</a>
					</li>
				))}
			</ul>
		</div>
	);
}
