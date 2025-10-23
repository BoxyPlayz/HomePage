import { useLocation } from 'preact-iso';
import {join} from 'path';
import SplashText from '@/components/SplashText';

const addBase = (path: string) => {
	return join(import.meta.env.BASE_URL || '/', path);
}

export function Header() {
	const { url } = useLocation();

	return (
		<header>
			<nav>
				<a href={addBase("")} class={url == addBase("") && 'active'}>
					Home
				</a>
				<a href={addBase("settings")} class={url == addBase("settings") && 'active'}>
					Konfig
				</a>
				<SplashText />
			</nav>
		</header>
	);
}
