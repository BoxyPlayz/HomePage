import { useNetwork } from '@reactuses/core';
import { useLocation } from 'preact-iso/router';
import { useContext } from 'preact/hooks';
import emptyImg from '@/assets/empty.png';
import searchyImg from '@/assets/searchy.png';
import SplashText from '@/components/SplashText/index.tsx';
import { SearchyContext } from '@/contexts/searchyContext';
import { addBase, get_base_url } from '@/utils.ts';

export default function Header() {
	const network = useNetwork();
	const ctx = useContext(SearchyContext);
	let searchy: boolean;
	if (ctx) {
		searchy = ctx.searchy;
	} else {
		searchy = true;
	}

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
				{searchy ?
					<a href={addBase('searchy')}>
						<img
							src={
								url == addBase('searchy') ? emptyImg
								:	searchyImg
							}
							alt='Searchy the Search Thingy'
							className='searchy'
							style={{ width: '2rem', height: '2rem' }}
						/>
					</a>
				:	null}
				{network.online ? null : 'No Internet'}
				<SplashText />
			</nav>
		</header>
	);
}
