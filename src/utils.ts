export const get_base_url = () => {
    let base_url = (import.meta.env.BASE_URL || '/') as string;

    if (!base_url) base_url = '/';

    try {
        const parsed = new URL(base_url);
        base_url = parsed.pathname || '/';
    } catch {
        // not an absolute URL, keep as-is
    }

    if (!base_url.startsWith('/')) base_url = '/' + base_url;

    base_url = base_url.replace(/\/+/g, '/');
    if (!base_url.endsWith('/')) base_url = base_url + '/';

    return base_url;
}

export const addBase = (path: string) => {
    const base = get_base_url();
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return base + cleanPath;
}
