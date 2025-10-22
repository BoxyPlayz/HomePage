import { useLocation } from 'preact-iso';

export function Header() {
	const { url } = useLocation();

	return (
		<header>
			<nav>
				<a href="/HomePage" class={url == '/HomePage' && 'active'}>
					Home
				</a>
				<a href="/HomePage/settings" class={url == '/HomePage/settings' && 'active'}>
					Settings
				</a>
			</nav>
		</header>
	);
}
