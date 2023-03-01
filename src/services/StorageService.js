const STORAGE_NAME = '@data';

class StorageService {
    data = {};

    constructor() {
        this.init();
    }

    init() {
        const data = localStorage.getItem(STORAGE_NAME);

        if (data) {
            this.data = JSON.parse(data);
        }
    }

    getItem(key, defaultValue = null) {
        return this.data[key] || defaultValue;
    }

    setItem(key, value) {
        const data = { ...this.data };
        data[key] = value;
        this.save(data);
    }

    removeItem(key) {
        const data = { ...this.data };
        delete data[key];
        this.save(data);
    }

    save(data) {
        this.data = data;
        localStorage.setItem(STORAGE_NAME, JSON.stringify(data));
    }

    clear() {
        this.save({});
    }
}

export default new StorageService();