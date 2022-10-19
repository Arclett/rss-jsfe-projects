import "/styles/main.scss";
import { PlayField } from "./scripts/_playField";
class Main {
  constructor() {
    this.matrix = this.generateMatrix(4);
    const game1 = new PlayField(this.matrix);
  }

  generateMatrix(type) {
    let res = [];
    while (res.length < Math.pow(type, 2)) {
      let x = this.getRandomInt(0, Math.pow(type, 2) - 1);
      if (!res.includes(x)) res.push(x);
    }
    let result = [];
    for (let i = 0; i < type; i++) {
      result.push(res.slice(i * 4, (i + 1) * 4));
    }
    return result;
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

const main1 = new Main();

// const game1 = new PlayField();
