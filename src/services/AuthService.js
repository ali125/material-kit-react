import StorageService from "./StorageService";

const STORAGE_NAME = 'token';

class AuthService {
    token = null;

    constructor() {
        this.init();
    }

    init() {
        const data = StorageService.getItem(STORAGE_NAME);

        this.token = data || null;
    }

    getToken() {
        return this.token;
    }

    async login(email, password, remember = false) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email === 'abc@mail.com' && password === '123456') {
                    this.token = `${email}|${password}`;
        
                    if (remember) {
                        StorageService.setItem(STORAGE_NAME, this.token);
                    }
        
                    resolve(this.token);
                } else {
                    reject(new Error('Username / Password is incorrect!'));
                }
            }, 1000);
        });
    }

    logout() {
        StorageService.removeItem(STORAGE_NAME);
        this.token = null;
    }
}

export default new AuthService();