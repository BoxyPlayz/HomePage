import { useLocation } from 'preact-iso';
import SplashText from '@/components/SplashText';
import { addBase, get_base_url } from '@/utils';

export function Header() {
	const { url } = useLocation();

	return (
		<header>
			<nav>
					<img src="/searchy.png" alt="Searchy the Search Thingy" />
				<a
					href={get_base_url()}
					class={url == get_base_url() && 'active'}>
					Home
				</a>
				<a
					href={addBase('settings')}
					class={url == addBase('settings') && 'active'}>
					Konfig
				</a>
				<SplashText />
			</nav>
		</header>
	);
}
