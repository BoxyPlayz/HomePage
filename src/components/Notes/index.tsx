import { useEffect, useState } from 'preact/hooks';
import { useLocalStorage } from '@/hooks/useLocalStorage';

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
			<textarea
				value={text}
				onInput={handleInput}
				style={{ width: '100vw', height: '50vh' }}
			/>
			{autoSave ? null : (
				<>
					<br />
					<button onClick={() => setSavedText(text)}>Save</button>
				</>
			)}
		</div>
	);
}
