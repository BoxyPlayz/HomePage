import { useEffect, useRef, useState } from "preact/hooks";
import './styles.css';
import { Client } from "lrclib-api";

const Lrclib = ({ song }: { song: string }) => {
    const [content, setContent] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>(song);
    const [Title, setTitle] = useState<string | null>(song);
    const contentRef = useRef<HTMLParagraphElement>(null);

    const client = new Client();

    const handleInput = (e: InputEvent) => {
        const value = (e.currentTarget as HTMLInputElement).value;
        setSearchTerm(value);
    };

    useEffect(() => {
        (async () => {
            try {
                client.searchLyrics({
                    query: searchTerm
                }).then(lyrics => {
                    if (!lyrics || lyrics.length === 0) {
                        setError("No lyrics found.");
                        setContent(null);
                        return;
                    }
                    let lyric = lyrics[0].plainLyrics
                    if (new RegExp(/(?:\r\n|\r|\n)/g).test(lyric) == true) lyric = lyric.replace(/(?:\r\n|\r|\n)/g, '<br>');
                    if (lyrics[0].instrumental == true) {
                        lyric = "[Instrumental]";
                    }
                    setContent(lyric);
                    setTitle(lyrics[0].trackName);
                    setError(null);
                    if (contentRef.current) {
                        contentRef.current.innerHTML = lyric;
                    }
                });
            } catch (err) {
                setError("Failed to load lyrics.");
                setContent(null);
                setTitle(null);
            }
        })();
    }, [searchTerm]);

    return (
        <div class="lrclib-component">
            <h1 className="center">Lrclib Search</h1>
            <input
                type="text"
                name="lrc-search"
                value={searchTerm}
                onInput={handleInput}
                placeholder="Search Lrclib..."
                style={{ width: "100%", marginBottom: "1rem" }}
            />
            {Title && <h2>{Title}</h2>}
            {error && <p>{error}</p>}
            {!content && !error && <p>Loading...</p>}
            <p ref={contentRef}></p>
        </div>
    );
}

export default Lrclib;