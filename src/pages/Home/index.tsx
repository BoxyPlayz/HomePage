import { signal } from '@preact/signals';
import { type ComponentChildren, Fragment, type TargetedEvent } from 'preact';
import { type Dispatch, type StateUpdater, useEffect, useRef, useState } from 'preact/hooks';
import { type JSX } from 'preact/jsx-runtime';
import Notes from '@/components/Notes';
import Cats from '@/components/cats/index.tsx';
import Dictionary from '@/components/dictionary/index.tsx';
import Joke from '@/components/jokes/index.tsx';
import Lrclib from '@/components/lrclib/index.tsx';
import Wikipedia from '@/components/wikipedia';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import modular from './modular.module.css';
import './style.css';

const IP_TTL = 1000 * 60 * 60 * 12;

interface IPInfo {
	ip: string;
	city?: string;
	region?: string;
	country?: string;
	loc?: string;
	org?: string;
	postal?: string;
	timezone?: string;
	readme?: string;
}

const isValidUrl = (s: string) => {
	try {
		new URL(s);
		return true;
	} catch {
		return false;
	}
};

function TabbedContent(props: {
	setActiveTab: Dispatch<StateUpdater<JSX.Element>>;
	children: ComponentChildren;
	component: JSX.Element;
}) {
	return (
		<button onClick={() => props.setActiveTab(() => props.component)}>
			{props.children}
		</button>
	);
}

export default function Home() {
	const [nyeh, NyehFunc] = useLocalStorage('ip', { ip: 'Anon', time: 0 });
	const [activeTab, setActiveTab] = useState<JSX.Element>(<></>);
	const [wikipediaAvailable, setWikipediaAvailable] = useState(true);
	const [selectedEngine] = useLocalStorage('searchURI', 'https://www.google.com/search?q=');
	const [shortcuts, setShortcuts] = useLocalStorage<{ name: string; url: string }[]>(
		'shortcuts',
		[
			{ name: 'Google', url: 'https://www.google.com/' },
			{ name: 'YouTube', url: 'https://www.youtube.com/' },
		]
	);
	const shortcutNameRef = useRef<HTMLInputElement>(null);
	const shortcutUrlRef = useRef<HTMLInputElement>(null);
	const error = signal('');

	const submit = (e: TargetedEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget as HTMLFormElement;
		const data = new FormData(form);
		const query = (data.get('searchBarInput') || '').toString();
		const searchURI = selectedEngine;
		const newWin = window.open(searchURI + encodeURIComponent(query), '_blank');
		if (newWin) newWin.focus();
	};

	useEffect(() => {
		fetch('https://en.wikipedia.org/api/rest_v1/page/').catch(() => {
			console.error('Unable to ping wikipedia.');
			setWikipediaAvailable(false);
		});
	}, []);

	useEffect(() => {
		if (Date.now() - nyeh.time > IP_TTL) {
			fetch('https://ipinfo.io/json')
				.then((response) => response.json())
				.then((data: IPInfo) => {
					NyehFunc({ ip: data.ip, time: Date.now() });
				})
				.catch((error) => {
					console.error('Error fetching IP address:', error);
				});
		}
	}, [nyeh.time, NyehFunc]);

	return (
		<div className='home'>
			<main>
				<h1>Welcome Back, {nyeh.ip}!</h1>
				<form
					id='searchBar'
					onSubmit={submit}>
					<label htmlFor='searchBarInput'>Search</label>
					<input
						type='text'
						name='searchBarInput'
						id='searchBarInput'
					/>
					<button type='submit'>Go</button>
				</form>
				{shortcuts.map((val, idx) => (
					<Fragment key={`${val.name}_shortcut_${val.url}`}>
						<a
							href={val.url}
							target='_blank'
							rel='noopener noreferrer'>
							{val.name}
						</a>
						<button
							type='button'
							onClick={() => {
								setShortcuts(
									shortcuts.filter(
										(_, i) => i !== idx
									)
								);
							}}
							style={{ marginRight: '16px' }}>
							x
						</button>
					</Fragment>
				))}
				{shortcuts.length > 0 ?
					<br />
				:	null}

				<input
					type='text'
					name='shortcut_name'
					placeholder='Google'
					ref={shortcutNameRef}
				/>
				<input
					type='text'
					name='shortcut_url'
					placeholder='https://www.google.com/'
					ref={shortcutUrlRef}
				/>
				<button
					onClick={() => {
						if (
							!(
								shortcutNameRef.current &&
								shortcutUrlRef.current
							)
						) {
							return (error.value = 'Refs not set');
						}
						if (!isValidUrl(shortcutUrlRef.current.value)) {
							return (error.value = 'Invalid URL');
						}
						if (shortcutNameRef.current.value.length < 1) {
							return (error.value =
								'Shortcut Name Too short');
						}
						error.value = '';
						const newShortcut: { name: string; url: string } = {
							name: shortcutNameRef.current.value,
							url: shortcutUrlRef.current.value,
						};
						shortcutNameRef.current.value = '';
						shortcutUrlRef.current.value = '';
						setShortcuts([...shortcuts, newShortcut]);
					}}
					type='button'>
					New Shortcut
				</button>
				<p className={modular.error}>{error}</p>
			</main>
			<section id='tabs'>
				<TabbedContent
					setActiveTab={setActiveTab}
					component={<Dictionary word='hello' />}>
					Dictionary
				</TabbedContent>
				{wikipediaAvailable && (
					<TabbedContent
						setActiveTab={setActiveTab}
						component={<Wikipedia title='batman' />}>
						Wikipedia
					</TabbedContent>
				)}
				<TabbedContent
					setActiveTab={setActiveTab}
					component={<Lrclib song='Spongebob Theme' />}>
					Lrclib
				</TabbedContent>
				<TabbedContent
					setActiveTab={setActiveTab}
					component={<Joke />}>
					Joke
				</TabbedContent>
				<TabbedContent
					setActiveTab={setActiveTab}
					component={<Cats />}>
					CATS
				</TabbedContent>
				<TabbedContent
					setActiveTab={setActiveTab}
					component={<Notes />}>
					Notes
				</TabbedContent>
				<div id='tabbedContent'>{activeTab}</div>
			</section>
		</div>
	);
}
