import { type ComponentChildren, createContext } from 'preact';
import { useSessionStorage } from '@/hooks/useSessionStorage';

export const IdiotContext = createContext<{
	idiot: boolean;
	setIdiot: (v: boolean) => void;
} | null>(null);

export default function IdiotProvider({ children }: { children: ComponentChildren }) {
	const [idiot, setIdiot] = useSessionStorage('idiocy', false);

	return (
		<IdiotContext.Provider value={{ idiot, setIdiot }}>
			{children}
		</IdiotContext.Provider>
	);
}
