import { useRef, useState } from 'preact/hooks';
import './styles.css';

interface CatApiResponse {
	url: string;
	id: string;
	width: number;
	height: number;
}

const Cats = () => {
	const catsContainer = useRef<HTMLDivElement>(null);
	const [usedState, setUsedState] = useState('Get Many Cats');

	function getCats(): void {
		fetch('https://api.thecatapi.com/v1/images/search?limit=10')
			.then((response) => response.json())
			.then((data: CatApiResponse[]) => {
				data.forEach((cat) => {
					const img = document.createElement('img');
					img.src = cat.url;
					img.alt = 'CAT';
					img.style.maxWidth = '200px';
					img.style.margin = '0.5rem';
					if (catsContainer.current) {
						catsContainer.current.appendChild(img);
					}
				});
				setUsedState('Get More Cats');
			})
			.catch((error) => {
				console.error(error);
			});
	}

	return (
		<div class='joke-component'>
			<div ref={catsContainer} />
			<button
				onClick={getCats}
				style={{
					color: 'lightgreen',
					backgroundColor: 'purple',
					borderColor: 'blue',
					borderWidth: '4px',
					fontWeight: 'bold',
				}}>
				{usedState}
			</button>
		</div>
	);
};

export default Cats;
