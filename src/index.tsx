import { render } from 'preact';
import {
	LocationProvider,
	Router,
	Route,
	lazy,
	ErrorBoundary,
} from 'preact-iso';
import './style.css';
import { Header } from '@/components/Header/index.tsx';
import { addBase, get_base_url } from '@/utils.ts';

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
