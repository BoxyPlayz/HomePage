import { useLocation } from 'preact-iso';
import emptyImg from '@/assets/empty.png';
import searchyImg from '@/assets/searchy.png';
import SplashText from '@/components/SplashText/index.tsx';
import { addBase, get_base_url } from '@/utils.ts';

export function Header() {
	const { url } = useLocation();

	return (
		<header>
			<nav>
				<a
					href={get_base_url()}
					className={url == get_base_url() && 'active'}>
					Home
				</a>
				<a
					href={addBase('settings')}
					className={url == addBase('settings') && 'active'}>
					Konfig
				</a>
				<a href={addBase('searchy')}>
					<img
						src={
							url == addBase('searchy') ? emptyImg : (
								searchyImg
							)
						}
						alt='Searchy the Search Thingy'
						className='searchy'
						style={{ width: '2rem', height: '2rem' }}
					/>
				</a>
				<SplashText />
			</nav>
		</header>
	);
}
