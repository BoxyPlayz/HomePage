import { useEffect, useState } from 'preact/hooks';
import './styles.css';
import { get_base_url } from '@/utils';

/*export const splashes = [
	"I'm Spider-Man",
	'NYEH HEH HEH!',
	'do you wanna have a bad time?',
	"I'm in your walls.",
	'DRIVING IN MY CAR',
	'I am the Globglogabgalab the Shwabble Dabble Dabble',
	'Buy Crypto!',
	'They don’t know that we know they know we know.',
	'uh, hey papyrus? i burnt the water.',
	"I'm special!",
	'"creator of Beijing corn Co. Inc. est. 9975 BC."',
	'Recently he said that she said that we said that he said something',
	'Psychic Friend Fredbear',
	"That's what she said",
	'You live alone, but the toilet seat is warm',
	'splish splosh',
	'Pish Posh',
	'The fitnessgram pacer test',
	'Geneva Convention.',
	'bless you',
	'6 7',
	'21',
	'French Bread Pizza',
	'Daniel give me coffee',
	"I'm very artstic!",
	'9+10=purple',
];*/

const LOADING_SPLASHES = ['Loading Splashes...'];

export default function SplashText() {
	const [splashes, setSplashes] = useState<string[]>(LOADING_SPLASHES);
	const [splash, setSplash] = useState<string>(
		() => LOADING_SPLASHES[Math.floor(Math.random() * LOADING_SPLASHES.length)]
	);
	useEffect(() => {
		let cancelled = false;
		fetch(`${get_base_url()}splashes.txt`)
			.then((res) => res.text())
			.then((data) => {
				if (cancelled) return;
				const loaded = data
					.split('\n')
					.map((l) => l.trim())
					.filter((l) => l.length > 0);
				if (loaded.length > 0) {
					setSplashes(loaded);
					setSplash(loaded[Math.floor(Math.random() * loaded.length)]);
				}
			})
			.catch((err) => console.error('Error loading splashes:', err));
		return () => {
			cancelled = true;
		};
	}, []);

	useEffect(() => {
		const id = setInterval(() => {
			setSplash(splashes[Math.floor(Math.random() * splashes.length)]);
		}, 10000);
		return () => clearInterval(id);
	});

	// @ts-expect-error The window object is being extended without interface
	window.forceSplashUpdate = (x = -1) => {
		if (x < 0 || x > splashes.length - 1) {
			setSplash(splashes[Math.floor(Math.random() * splashes.length)]);
			return;
		}
		setSplash(splashes[x]);
	};

	return <h4 className='splash'>{splash}</h4>;
}
