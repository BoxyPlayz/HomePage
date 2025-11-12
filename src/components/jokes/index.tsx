import { useState } from 'preact/hooks';
import './styles.css';

const Joke = () => {
	const [content, setContent] = useState<string | null>(null);

	function getJoke(): void {
		setContent('Loading...');
		fetch(
			'https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Pun,Spooky,Christmas?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&safe-mode&format=txt'
		)
			.then((response) => response.text())
			.then((data) => {
				setContent(data);
			})
			.catch((error) => {
				console.error(error);
				setContent('Failed to load joke.');
			});
	}

	return (
		<div class='joke-component'>
			<button
				onClick={getJoke}
				style={{
					color: 'blue',
					backgroundColor: 'yellow',
					borderColor: 'red',
					borderWidth: '4px',
					fontWeight: 'bold',
				}}>
				Get Joke
			</button>
			<p>{content}</p>
		</div>
	);
};

export default Joke;
