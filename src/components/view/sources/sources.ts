import './sources.css';
export type Item = {
    id: string;
    name: any;
};

class Sources {
    draw(data: Item[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');
        if (sourceItemTemp instanceof Element) {
            data.forEach((item): void => {
                const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement | null;
                if (sourceClone !== null) {
                    const sourceItem = sourceClone.querySelector('.source__item-name');
                    if (sourceItem) sourceItem.textContent = item.name;
                    sourceClone.querySelector('.source__item')?.setAttribute('data-source-id', item.id);

                    fragment.append(sourceClone);
                }
            });
            const sources = document.querySelector('.sources');
            if (sources) sources.append(fragment);
        }
    }
}

export default Sources;
