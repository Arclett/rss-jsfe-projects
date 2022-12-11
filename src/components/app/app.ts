import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { IData, Item } from '../types/types';

class App {
    controller: AppController;

    view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        const elem = document.querySelector('.sources');
        if (elem)
            elem.addEventListener('click', (e) =>
                this.controller.getNews(e, (data: { articles: IData[] }) => this.view.drawNews(data))
            );
        this.controller.getSources((data: { sources: Item[] }) => this.view.drawSources(data));
    }
}

export default App;
