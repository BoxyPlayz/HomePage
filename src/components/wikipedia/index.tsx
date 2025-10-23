import wiki from "wikipedia";
import { useEffect, useState } from "preact/hooks";
import './styles.css';

const Wikipedia = ({ title }: { title: string }) => {
    const [content, setContent] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>(title);
    const [Title, setTitle] = useState<string | null>(title);
    const [siteURL, setSiteURL] = useState<string>(title);

    const handleInput = (e: InputEvent) => {
        const value = (e.currentTarget as HTMLInputElement).value;
        setSearchTerm(value);
    };

    useEffect(() => {
        (async () => {
            try {
                const page = await wiki.page(searchTerm);
                const result = await page.summary();
                setContent(result.extract);
                setTitle(page.title);
                setSiteURL(page.fullurl);
                setError(null);
            } catch (err) {
                setError("Failed to load summary.");
                setContent(null);
                setTitle(null);
            }
        })();
    }, [searchTerm]);

    return (
        <div class="wikipedia-component">
            <h1 className="garamond-font center">Wikipedia Search</h1>
            <input
                type="text"
                name="wiki-search"
                value={searchTerm}
                onInput={handleInput}
                placeholder="Search Wikipedia..."
                style={{ width: "100%", marginBottom: "1rem" }}
            />
            {Title && <h2>{Title}</h2>}
            {error && <p>{error}</p>}
            {!content && !error && <p>Loading...</p>}
            {content && <p>{content}</p>}
            {siteURL && (
                <>
                    <br />
                    {!error && <a href={siteURL} target="_blank" rel="noopener noreferrer">
                        Read more on Wikipedia
                    </a>}
                </>
            )}
        </div>
    );
}

export default Wikipedia;