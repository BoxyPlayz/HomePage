import { useContext, useEffect, useMemo, useRef, useState } from 'preact/hooks';
import searchyImg from '@/assets/searchy.png';
import { IdiotContext } from '@/contexts/idiotContext';
import { SearchyContext } from '@/contexts/searchyContext';
import SearchyData from './searchy.json';
import './styles.css';

interface Searchy {
	searches: SearchySearch[];
}

interface SearchySearch {
	name: string;
	url: string;
	info?: string;
}

export default function Searchy() {
	const [search, setSearch] = useState<string>('');
	const [sortedResults, setSortedResults] = useState<SearchySearch[]>([]);
	const dialogRef = useRef<HTMLDialogElement>(null);
	const [dialogTitle, setDialogTitle] = useState<string>(null);
	const [dialogInfo, setDialogInfo] = useState<string>(null);
	const ctx = useContext(SearchyContext);
	if (!ctx) throw new Error('SearchyContext missing');
	const idiotCtx = useContext(IdiotContext);
	if (!idiotCtx) throw new Error('SearchyContext missing');

	const { searchy, setSearchy } = ctx;
	const idiot = idiotCtx;

	useEffect(() => {
		const fetchSearches = async () => {
			try {
				const data: Searchy = SearchyData;
				setSortedResults(
					data.searches.sort((a, b) =>
						a.name.localeCompare(b.name, undefined, {
							sensitivity: 'base',
						})
					)
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
			<dialog ref={dialogRef}>
				<h1>{dialogTitle}</h1>
				<p>{dialogInfo}</p>
				<button
					onClick={() => {
						dialogRef.current.close();
					}}>
					Close
				</button>
			</dialog>
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
				<li key='swearing'>
					<button
						onClick={() => {
							alert(
								"Wow. You're a certified idiot. I'll add that to the top to help you remember."
							);
							idiot.setIdiot(true);
						}}>
						FREE CHATGPT UNBLOCKED 100%
					</button>
				</li>
				{filteredResults.map((result) => (
					<li key={result.url}>
						<a
							target='_blank'
							rel='noopener noreferrer'
							href={result.url}>
							{result.name}
						</a>
						{result.info ?
							<button
								onClick={() => {
									setDialogTitle(result.name);
									setDialogInfo(result.info);
									dialogRef.current.showModal();
								}}>
								Quick Info
							</button>
						:	null}
					</li>
				))}
			</ul>
		</div>
	);
}
