import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { IData, Item } from '../types/types';

class App {
    controller: AppController;

    view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
        (document.querySelector('.sources-choise') as HTMLElement).addEventListener('click', this.showSources);
    }

    start(): void {
        const elem = document.querySelector('.sources') as HTMLElement;
        if (elem)
            elem.addEventListener('click', (e) => {
                this.controller.getNews(e, (data: { articles: IData[] }) => this.view.drawNews(data));
                if (
                    (e.target as HTMLElement).classList.contains('source__item') ||
                    (e.target as HTMLElement).classList.contains('source__item-name')
                ) {
                    const currentSrc = document.querySelector('.current-source') as HTMLElement;
                    currentSrc.textContent = (e.target as HTMLElement).textContent;
                    currentSrc.classList.remove('hidden');
                    elem.classList.add('hidden');
                }
            });
        this.controller.getSources((data: { sources: Item[] }) => this.view.drawSources(data));
    }

    showSources(e: Event): void {
        const sources = document.querySelector('.sources') as HTMLElement;
        if (sources.classList.contains('hidden')) {
            sources.classList.remove('hidden');
            if (e.target) {
                (e.target as HTMLElement).textContent = 'Hide News Sources';
            }
        } else {
            sources.classList.add('hidden');
            if (e.target) {
                (e.target as HTMLElement).textContent = 'Show News Sources';
            }
        }
    }
}

export default App;
