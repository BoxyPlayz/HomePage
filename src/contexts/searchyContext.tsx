import { type ComponentChildren, createContext } from 'preact';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export const SearchyContext = createContext<{
	searchy: boolean;
	setSearchy: (v: boolean) => void;
} | null>(null);

export default function SearchyProvider({ children }: { children: ComponentChildren }) {
	const [searchy, setSearchy] = useLocalStorage('searchyEnabled', false);

	return (
		<SearchyContext.Provider value={{ searchy, setSearchy }}>
			{children}
		</SearchyContext.Provider>
	);
}
