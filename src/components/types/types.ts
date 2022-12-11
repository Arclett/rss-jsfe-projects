//types

export type Item = {
    readonly id: string;
    readonly name: string;
};

export type Endpoint = {
    readonly endpoint: string;
    readonly options?: object;
};

export type UrlOptions = keyof IUrl;

//enum

export enum Status {
    NO_FOUND = 404,
    UNAUTHORIZED = 401,
}

//interfaces

export interface IData {
    readonly urlToImage: string;
    readonly author: string;
    readonly publishedAt: string;
    readonly source: {
        readonly name: string;
    };
    readonly title: string;
    readonly description: string;
    readonly url: string;
}

export interface IUrl {
    [index: string]: string;
}
