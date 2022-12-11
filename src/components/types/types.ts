//types

export type Item = {
    id: string;
    name: string;
};

export type Endpoint = {
    endpoint: string;
    options?: object;
};

export type UrlOptions = keyof IUrl;

//enum

export enum Status {
    NO_FOUND = 404,
    UNAUTHORIZED = 401,
}

//interfaces

export interface IData {
    urlToImage: string;
    author: string;
    publishedAt: string;
    source: {
        name: string;
    };
    title: string;
    description: string;
    url: string;
}

export interface IUrl {
    [index: string]: string;
}
