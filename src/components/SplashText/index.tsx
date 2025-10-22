import { useState } from "preact/hooks";

export const splashes = [
    "I'm Spider-Man",
    "NYEH HEH HEH!",
    "Do you wanna have a bad time?",
    "I'm in your walls.",
    "DRIVING IN MY CAR",
    "I am the Globglogabgalab the Shwabble Dabble",
    "Buy Crypto!"
]

export default function SplashText() {
    const [splash, setSplash] = useState<string>("");
    const getSplash = () => {
        return setSplash(splashes[Math.floor(Math.random() * splashes.length)]);
    }
    const getSplashes = () => {
        setTimeout(() => {
            getSplash();
            getSplashes();
        }, 10000);
    }
    getSplashes();
    return (
        <div>
            <h4>{splash}</h4>
        </div>
    );
}
