import { useLocalStorage } from '@reactuses/core';
import { useEffect, useState } from 'preact/hooks';

export default function Notes() {
	const [savedText, setSavedText] = useLocalStorage('note', '');
	const [text, setText] = useState(savedText);
	const [autoSave] = useLocalStorage('autosave', false);

	useEffect(() => {
		setText(savedText);
	}, [savedText]);

    const handleInput = (e: Event) => {
		const value = (e.currentTarget as HTMLTextAreaElement).value;
		setText(value);
		if (autoSave) setSavedText(value);
	};

	return (
		<div>
			{autoSave ? null : <button onClick={() => setSavedText(text)}>Save</button>}
			<textarea
				value={text}
				onInput={handleInput}
			/>
		</div>
	);
}
