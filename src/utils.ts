import { join } from "node:path";

export const addBase = (path: string) => {
    let base_url = '/';
    if (import.meta.env.BASE_URL.length > 0) {
        base_url = import.meta.env.BASE_URL;
    }
    try {
        const url = new URL(base_url);
        return join(url.pathname, path);
    } catch {
        return join(base_url, path);
    }
}