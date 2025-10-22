import { render } from 'preact';
import { LocationProvider, Router, Route, lazy } from 'preact-iso';
import './style.css';
import { Header } from './components/Header';

const Home = lazy(() => import('./pages/Home/index'));
const Settings = lazy(() => import('./pages/Settings/index'));
const NotFound = lazy(() => import('./pages/_404'));

export function App() {
	return (
		<LocationProvider>
			<Header />
			<Router>
				<Route path="/" component={Home} />
				<Route path="/settings" component={Settings} />
				<Route default component={NotFound} />
			</Router>
		</LocationProvider>
	);
}

render(<App />, document.getElementById('app'));
