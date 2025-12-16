import { render } from 'preact';
import { ErrorBoundary, LocationProvider, Route, Router, lazy } from 'preact-iso';
import { addBase, get_base_url } from '@/utils.ts';
import './style.css';

import Header from './components/Header/index.tsx';

const Home = lazy(() => import('./pages/Home/index.tsx'));
const Settings = lazy(() => import('./pages/Settings/index.tsx'));
const Searchy = lazy(() => import('./pages/Searchy/index.tsx'));
const NotFound = lazy(() => import('./pages/_404.tsx'));

export function App() {
	return (
		<LocationProvider>
			<ErrorBoundary>
				<Header />
				<Router>
					<Route
						path={get_base_url()}
						component={Home}
					/>
					<Route
						path={addBase('searchy')}
						component={Searchy}
					/>
					<Route
						path={addBase('settings')}
						component={Settings}
					/>
					<Route
						default
						component={NotFound}
					/>
				</Router>
			</ErrorBoundary>
		</LocationProvider>
	);
}

render(<App />, document.body);
