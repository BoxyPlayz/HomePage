import SplashText from '../../components/SplashText';
import Wikipedia from '../../components/wikiComp';
import './style.css';

export default function Home() {
	return (
		<div className="home">
				<SplashText />
			<main>
				Main Stuff
			</main>
			<Wikipedia title="Batman" />
		</div>
	);
}