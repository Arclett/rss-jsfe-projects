type Endpoint = {
    endpoint: string;
    options?: object;
};

interface IUrl {
    [index: string]: string;
}

type UrlOptions = keyof IUrl;

class Loader {
    baseLink: string;

    options: { apiKey: string };

    constructor(baseLink: string, options: { apiKey: string }) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options = {} }: Endpoint,
        callback = (): void => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: object, endpoint: string) {
        const urlOptions: IUrl = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        const urlOptArr: Array<UrlOptions> = Object.keys(urlOptions);

        urlOptArr.forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });
        console.log(url.slice(0, -1));
        return url.slice(0, -1);
    }

    load(method: string, endpoint: string, callback: (data: object) => void, options = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data: object) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
