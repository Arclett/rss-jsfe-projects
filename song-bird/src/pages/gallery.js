import "../styles/main.scss";
import { BirdCard } from "../scripts/_BirdCard";
import { PlayerGal } from "../scripts/_PlayerGal";
import { Gallery } from "../scripts/_GalleryCl";

export const birdGal = new BirdCard();
const gal = new Gallery();
export const galPlayer = new PlayerGal(document.querySelector(".bird-card"));
