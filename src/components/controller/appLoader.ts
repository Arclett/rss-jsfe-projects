import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi-redirect-production.up.railway.app/', {
            apiKey: 'becec9dd7075419b876a31bd5be06129', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
