import { useLocation } from 'preact-iso';
import SplashText from '@/components/SplashText';
import { addBase } from '@/utils';

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
