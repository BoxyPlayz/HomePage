import { useEffect, useState } from 'preact/hooks';

type SetValue<T> = T | ((prev: T) => T);

export function useLocalStorage<T = string>(
	key: string,
	initialValue: T
): [T, (value: SetValue<T>) => void] {
	const [storedValue, setStoredValue] = useState<T>(() => {
		if (typeof window === 'undefined') return initialValue;

		try {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch {
			return initialValue;
		}
	});

	const setValue = (value: SetValue<T>) => {
		setStoredValue((prev) => {
			const nextValue = value instanceof Function ? value(prev) : value;

			if (typeof window !== 'undefined') {
				window.localStorage.setItem(key, JSON.stringify(nextValue));
			}

			return nextValue;
		});
	};

	useEffect(() => {
		if (typeof window == 'undefined') return;
		const onStorage = (e: StorageEvent) => {
			if (e.key !== key) return;

			try {
				setStoredValue(e.newValue ? JSON.parse(e.newValue) : initialValue);
			} catch {
				setStoredValue(initialValue);
			}
		};

		window.addEventListener('storage', onStorage);
		return () => window.removeEventListener('storage', onStorage);
	}, [key]);

	return [storedValue, setValue];
}
