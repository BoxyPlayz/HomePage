import { render } from 'preact';
import { LocationProvider, Router, Route, lazy, ErrorBoundary } from 'preact-iso';
import './style.css';
import { Header } from '@/components/Header';
import { join } from 'path';

const Home = lazy(() => import('./pages/Home/index'));
const Settings = lazy(() => import('./pages/Settings/index'));
const NotFound = lazy(() => import('./pages/_404'));

export function App() {
	return (
		<LocationProvider scope={import.meta.env.BASE_URL || '/'}>
			<ErrorBoundary>
				<Header />
				<Router>
					<Route path={import.meta.env.BASE_URL || '/'} component={Home} />
					<Route path={join(import.meta.env.BASE_URL || '/', "settings")} component={Settings} />
					<Route default component={NotFound} />
				</Router>
			</ErrorBoundary>
		</LocationProvider>
	);
}

render(<App />, document.body);
