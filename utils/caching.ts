class Cache {
    private cache: Map<string, any>;

    constructor() {
        this.cache = new Map();
    }

    set(key: string, data: any, expiry: number) {
        const expires = new Date().getTime() + expiry * 1000;
        this.cache.set(key, { data, expires });
    }

    get(key: string) {
        const item = this.cache.get(key);
        if (!item) return null;
        if (new Date().getTime() > item.expires) {
            this.cache.delete(key);
            return null;
        }
        return item.data;
    }
}

export const cache = new Cache();