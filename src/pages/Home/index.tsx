import { useLocalStorage } from '@reactuses/core';
import { ComponentChildren } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { JSX } from 'preact/jsx-runtime';
import wiki from 'wikipedia';
import Cats from '@/components/cats/index.tsx';
import Dictionary from '@/components/dictionary/index.tsx';
import Joke from '@/components/jokes/index.tsx';
import Lrclib from '@/components/lrclib/index.tsx';
import Wikipedia from '@/components/wikipedia';
import './style.css';

export default function Home() {
	const [nyeh, nyehHehHeh] = useState<string>('Anon');
	const [activeTab, setActiveTab] = useState<JSX.Element>(<></>);
	const [wikipediaAvailable, setWikipediaAvailable] = useState(true);
	const [selectedEngine] = useLocalStorage('searchURI', 'https://www.google.com/search?q=');

	function TabbedContent(props: { children: ComponentChildren; component: JSX.Element }) {
		return (
			<button onClick={() => setActiveTab(() => props.component)}>
				{props.children}
			</button>
		);
	}

	const submit = (e: Event) => {
		e.preventDefault();
		const form = e.currentTarget as HTMLFormElement;
		const data = new FormData(form);
		const query = (data.get('searchBarInput') || '').toString();
		const searchURI = selectedEngine;
		const newWin = window.open(searchURI + encodeURIComponent(query), '_blank');
		if (newWin) newWin.focus();
	};

	useEffect(() => {
		wiki.summary('batman').catch(() => {
			console.error('Unable to ping wikipedia.');
			setWikipediaAvailable(false);
		});
	});

	useEffect(() => {
		fetch('https://ipinfo.io/json')
			.then((response) => response.json())
			.then((data) => {
				nyehHehHeh(data.ip);
			})
			.catch((error) => {
				console.error('Error fetching IP address:', error);
			});
	});

	return (
		<div className='home'>
			<main>
				<h1>Welcome Back, {nyeh}!</h1>
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
			</main>
			<section id='tabs'>
				<TabbedContent component={<Dictionary word='hello' />}>
					Dictionary
				</TabbedContent>
				{wikipediaAvailable && (
					<TabbedContent component={<Wikipedia title='batman' />}>
						Wikipedia
					</TabbedContent>
				)}
				<TabbedContent component={<Lrclib song='Spongebob Theme' />}>
					Lrclib
				</TabbedContent>
				<TabbedContent component={<Joke />}>Joke</TabbedContent>
				<TabbedContent component={<Cats />}>CATS</TabbedContent>
				<div id='tabbedContent'>{activeTab}</div>
			</section>
		</div>
	);
}
