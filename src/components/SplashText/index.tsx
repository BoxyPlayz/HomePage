import { useEffect, useState } from "preact/hooks";
import './styles.css';

export const splashes = [
    "I'm Spider-Man",
    "NYEH HEH HEH!",
    "do you wanna have a bad time?",
    "I'm in your walls.",
    "DRIVING IN MY CAR",
    "I am the Globglogabgalab the Shwabble Dabble Dabble",
    "Buy Crypto!",
    "They don’t know that we know they know we know.",
    "uh, hey papyrus? i burnt the water.",
    "I'm special!",
    '"creator of Beijing corn Co. Inc. est. 9975 BC."',
    "Recently he said that she said that we said that he said something",
    "Psychic Friend Fredbear",
    "That's what she said",
    "You live alone, but the toilet seat is warm",
    'splish splosh',
    "Pish Posh",
    "The fitnessgram pacer test",
    "Geneva Convention.",
    "bless you"
];

export default function SplashText() {
    const [splash, setSplash] = useState<string>(() => splashes[Math.floor(Math.random() * splashes.length)]);

    useEffect(() => {
        const id = setInterval(() => {
            setSplash(splashes[Math.floor(Math.random() * splashes.length)]);
        }, 10000);
        return () => clearInterval(id);
    }, []);

    return (
        <h4 className="splash">{splash}</h4>
    );
}
