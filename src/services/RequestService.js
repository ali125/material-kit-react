import axios from "axios";
import AuthService from "./AuthService";

const getHeader = (header) =>({
    Authorization: AuthService.getToken(),
    ...(header || {})
});

class RequestService {
    baseUrl = 'https://jsonplaceholder.typicode.com/';

    /**
     * @param {string} url
     * @param {{
     *      header,
     *      params,
     *      data
     * }} config
     */
    request(method, config = {}) {
        const url = `${this.baseUrl}${config.url}`;
        return axios({
            method,
            headers: getHeader(config.header),
            ...config,
            url,
        });
    }

    /**
     * @param {string} url
     * @param {{
     *     header,
     *      params,
     *      data
     * }} config
     */
    async get(url, config = {}) {
        try {
            const response = await this.request('GET', { url, ...config });
            return new Promise((resolve) => {
                resolve({ data: response.data, status: response.status });
            });
        } catch(e) {
            throw new Error(e);
        }
    }

    /**
     * @param {string} url
     * @param {{
     *      header,
     *      params,
     *      data
     * }} config
     */
    async post(url, config = {}) {
        try {
            const response = await this.request('POST', { url, ...config });
            return new Promise((resolve) => {
                resolve({ data: response.data, status: response.status });
            });
        } catch(e) {
            throw new Error(e);
        }
    }


    /**
     * @param {string} url
     * @param {{
     *      header,
     *      params,
     *      data
     * }} config
     */
    async update(url, config = {}) {
        try {
            const response = await this.request('PATCH', { url, ...config });
            return new Promise((resolve) => {
                resolve({ data: response.data, status: response.status });
            });
        } catch(e) {
            throw new Error(e);
        }
    }

    /**
     * @param {string} url
     * @param {{
     *      header,
     *      params,
     *      data
     * }} config
     */
    async delete(url, config = {}) {
        try {
            const response = await this.request('DELETE', { url, ...config });
            return new Promise((resolve) => {
                resolve({ data: response.data, status: response.status });
            });
        } catch(e) {
            throw new Error(e);
        }
    }
}

export default new RequestService();