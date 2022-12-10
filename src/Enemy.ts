import { dimensions, position } from "./interfaces";
import Characters from "./Characters";
import UI from "./UI";

class Enemy extends Characters {
    velocity: { x: number; y: number };
    canvas: HTMLCanvasElement;
    attacks: boolean;
    url: string;
    hp: number;

    constructor(
        dimensions: dimensions,
        position: position,
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D | null,
        url: string
    ) {
        super(dimensions, position, ctx, url);
        this.url = url;
        this.canvas = canvas;
        this.attacks = false;
        this.hp = 1;
        this.velocity = { x: 0, y: 0 };
        this.movePlayer();
    }
    attack = async () => {
        const posX = this.position.x + this.dimensions.height / 2;
        const posY = this.position.y + this.dimensions.width / 2;
    };

    getPixelColor = (x: number, y: number, data: Uint8ClampedArray) => {
        const red = y * (this.canvas.width * 4) + x * 4;
        return [data[red], data[red + 1], data[red + 2], data[red + 3]];
    };

    movePlayer = () => {};

    update(eneMap: number[][], ui: UI) {
        const posX = Math.floor(this.position.x / 48)
        const posY = Math.floor(this.position.y / 48)
        if (this.hp > 0) {
            this.drawEnemy();
        } else {
            ui.points += 1000;
            return true
        }
        return false
    }
}
export default Enemy;
