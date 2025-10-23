import { useEffect, useState } from "preact/hooks";

export default function Settings() {
    const defaultEngine = () => localStorage.getItem('searchURI') || 'https://www.google.com/search?q=';
    const [selectedEngine, setSelectedEngine] = useState<string>(defaultEngine);

    useEffect(() => {
        localStorage.setItem('searchURI', selectedEngine);
    }, [selectedEngine]);

    return (
        <div>
            <h2>Konfig</h2>
            <select value={selectedEngine} onChange={e =>
                setSelectedEngine((e.target as HTMLSelectElement).value)}>
                <option value="https://www.google.com/search?q=">Google</option>
                <option value="https://www.bing.com/search?q=">Bing</option>
                <option value="https://search.yahoo.com/search?p=">Yahoo</option>
            </select>
        </div>
    );
}
