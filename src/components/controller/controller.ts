import AppLoader from './appLoader';
import { IData, Item } from '../types/types';

class AppController extends AppLoader {
    public getSources(callback: (data: { sources: Item[] }) => void) {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    public getNews(e: Event, callback: (data: { articles: IData[] }) => void) {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target !== null) {
                if (target.classList.contains('source__item')) {
                    const sourceId = target.getAttribute('data-source-id');
                    if (newsContainer.getAttribute('data-source') !== sourceId) {
                        if (sourceId !== null) {
                            newsContainer.setAttribute('data-source', sourceId);
                            super.getResp(
                                {
                                    endpoint: 'everything',
                                    options: {
                                        sources: sourceId,
                                    },
                                },
                                callback
                            );
                        }
                    }
                    return;
                }
                target = target.parentNode as HTMLElement;
            }
        }
    }
}

export default AppController;
