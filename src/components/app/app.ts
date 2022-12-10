import AppController from '../controller/controller';
import { AppView } from '../view/appView';

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
                this.controller.getNews(e, (data: { articles: object[] }) => this.view.drawNews(data))
            );
        this.controller.getSources((data: object[]) => this.view.drawSources(data));
    }
}

export default App;
