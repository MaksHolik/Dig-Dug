import { dimensions, position } from "./interfaces";
import Characters from "./Characters";

class Rock extends Characters {
    canvas: HTMLCanvasElement;
    url: string;
    direction!: string;
    interval!: number;
    counter: number;
    flag: boolean;
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
        this.counter = 0;
        this.flag = false;
    }
    attack = async () => {};

    update(map: number[][]): void {
        const x = this.position.x / 48;
        const y = this.position.y / 48;
        if (this.position.x < 0 || this.position.y < 0) return;
        if (!this.counter && (!map[y + 1] || map[y + 1][x] == 0)) {
            map[y + 1][x] = 3;
            map[y][x] = 0;
            this.flag = true;
            this.position.y += 48;
            this.counter = 5;
            this.interval = setInterval(() => {
                this.counter--;
                if (this.counter == 0) clearInterval(this.interval);
            }, 70);
        } else if (
            !this.counter &&
            this.flag &&
            (!map[y + 1] ||
                map[y + 1][x] == 1 ||
                !map[y + 1] ||
                map[y + 1][x] == 3)
        ) {
            console.log("niszcze");
            this.position.x = -1;
            this.position.y = -1;
        }

        this.drawRocks();
    }
}
export default Rock;
