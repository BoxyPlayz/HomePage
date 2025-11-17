import { useEffect, useState } from 'preact/hooks';
import './styles.css';
import { get_base_url } from '@/utils.ts';

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
