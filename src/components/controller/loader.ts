import { Endpoint, IUrl, UrlOptions, Status } from '../types/types';

class Loader {
    private baseLink: string;

    private options: { apiKey: string };

    constructor(baseLink: string, options: { apiKey: string }) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp<T>(
        { endpoint, options = {} }: Endpoint,
        callback: (data: T) => void = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === Status.NO_FOUND || res.status === Status.UNAUTHORIZED)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: object, endpoint: string) {
        const urlOptions: IUrl = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        const urlOptArr: Array<UrlOptions> = Object.keys(urlOptions);

        urlOptArr.forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });
        console.log(url.slice(0, -1));
        return url.slice(0, -1);
    }

    private load<T>(method: string, endpoint: string, callback: (data: T) => void, options = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data: T) => {
                callback(data);
            })
            .catch((err) => console.error(err));
    }
}

export default Loader;
