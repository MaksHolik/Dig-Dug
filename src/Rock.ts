import { dimensions, position } from "./interfaces";
import Characters from "./Characters";

class Rock extends Characters {
    canvas: HTMLCanvasElement;
    url: string;
    direction!: string;
    interval!: number;
    counter: number;
    counterDest: number;
    flag: boolean;
    falls: boolean;
    shouldFall: number;
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
        this.counterDest = 0;
        this.falls = false;
        this.flag = false;
        this.shouldFall = 0;
    }
    attack = async () => {};

    update(map: number[][], eneMap: number[][]): void {
        const x = this.position.x / 48;
        const y = this.position.y / 48;
        if (this.position.x < 0 || this.position.y < 0) return;
        if (this.shouldFall === 0 && map[y + 1] && map[y + 1][x] == 0) {
            this.shouldFall = 1;
            setTimeout(() => {
                this.shouldFall = 2;
            }, 1000);
        }
        if (!this.counter && this.shouldFall === 2) {
            if (
                !this.counterDest &&
                this.flag &&
                (!map[y + 1] ||
                    map[y + 1][x] == 1 ||
                    !map[y + 1] ||
                    eneMap[y + 1][x] == 3)
            ) {
                this.shouldFall = 3;
                this.falls = false;
                eneMap[y][x] = 0;
                this.counterDest = 4;
                clearInterval(this.interval);
                this.interval = setInterval(() => {
                    this.counterDest--;
                    this.drawRocks(this.counterDest);
                    if (this.counterDest == 0) {
                        clearInterval(this.interval);
                        this.position.x = -48;
                        this.position.y = -48;
                    }
                }, 250);
            } else {
                this.falls = true;
                map[y][x] = 0;
                eneMap[y][x] = 0;
                eneMap[y + 1][x] = 3;
                this.flag = true;
                this.position.y += 48;
                this.counter = 5;
                this.interval = setInterval(() => {
                    this.counter--;
                    if (this.counter == 0) clearInterval(this.interval);
                }, 50);
            }
        }

        this.drawRocks(this.counterDest);
    }
}
export default Rock;
