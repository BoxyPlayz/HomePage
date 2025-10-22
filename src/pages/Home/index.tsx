import Wikipedia from '../../components/wikiComp';
import './style.css';

export default function Home() {
	return (
		<div className="home">
			<main>
				Im spider man
			</main>
			<Wikipedia title="Batman" />
		</div>
	);
}