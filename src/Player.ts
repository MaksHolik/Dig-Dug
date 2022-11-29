import { dimensions, position } from "./interfaces";
import Characters from "./Characters";

class Player extends Characters {
    newKeys: {
        pressed: boolean;
    };
    lastKey: string;
    velocity: { x: number; y: number };
    canvas: HTMLCanvasElement;
    attacks: boolean;
    url: string;
    lastKeys: {
        x: string;
        y: string;
    };
    change: boolean = false;
    direction!: string;
    interval!: number;
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
        this.lastKey = "";
        this.velocity = { x: 0, y: 0 };
        // this.keys = {
        //   leftArrow: { pressed: false },
        //   rightArrow: { pressed: false },
        //   upArrow: { pressed: false },
        //   downArrow: { pressed: false },
        // };
        this.newKeys = {
            pressed: false,
        };
        this.lastKeys = {
            x: "",
            y: "",
        };
        this.movePlayer();
    }
    attack = async () => {
        const posX = this.position.x + this.dimensions.height / 2;
        const posY = this.position.y + this.dimensions.width / 2;
        if (this.lastKey == "z") {
            if (this.direction == "ArrowLeft") {
                this.ctx!.drawImage(
                    this.arrowBeginningLeft,
                    posX - this.dimensions.width,
                    posY ,
                    this.dimensions.width,
                    this.dimensions.height /3
                );
                // this.direction = "ArrowLeft";
            }
            else if (this.direction == "ArrowRight") {
                this.ctx!.drawImage(
                    this.arrowBeginningRight,
                    posX + this.dimensions.width / 3,
                    posY - this.dimensions.height / 3,
                    this.dimensions.width,
                    this.dimensions.height
                );
                // this.direction = "ArrowRight";
            }
            else if (this.direction== "ArrowUp") {
                this.ctx!.drawImage(
                    this.arrowBeginningUp,
                    posX - this.dimensions.width / 2,
                    posY - (this.dimensions.height + (this.dimensions.height / 3)),
                    this.dimensions.width,
                    this.dimensions.height
                );
                // this.direction = "ArrowUp";
            }
            else if (this.direction == "ArrowDown") {
                this.ctx!.drawImage(
                    this.arrowBeginningDown,
                    posX - this.dimensions.width / 3,
                    posY + (this.dimensions.height - (this.dimensions.height / 2)),
                    this.dimensions.width,
                    this.dimensions.height
                );
                // this.direction = "ArrowDown";
            }
        }
    };

    movePlayer = () => {
        window.addEventListener("keydown", (event) => {
            if (this.interval && event.key != this.lastKey) {
                clearInterval(this.interval);
                this.interval = 0;
            }
            if (!this.interval) {
                this.interval = setInterval(() => {
                    this.change = !this.change;
                    if(this.lastKey != "z")
                    this.direction = this.lastKey;
                }, 100);
            }
            if (!this.attacks) {
                switch (event.key) {
                    case "ArrowRight":
                        this.newKeys.pressed = true;
                        this.lastKey = "ArrowRight";
                        this.lastKeys.x = "ArrowRight";
                        break;
                    case "ArrowLeft":
                        this.newKeys.pressed = true;
                        this.lastKey = "ArrowLeft";
                        this.lastKeys.x = "ArrowLeft";
                        break;
                    case "ArrowUp":
                        this.newKeys.pressed = true;
                        this.lastKey = "ArrowUp";
                        this.lastKeys.y = "ArrowUp";
                        break;
                    case "ArrowDown":
                        this.newKeys.pressed = true;
                        this.lastKey = "ArrowDown";
                        this.lastKeys.y = "ArrowDown";
                        break;
                    case "z":
                        this.attacks = true;
                        this.lastKey = "z";
                        this.attack();
                        break;
                }
            }
        });

        window.addEventListener("keyup", (event) => {
            if (event.key == this.lastKey) {
                clearInterval(this.interval);
                this.change = !this.change;
            }

            switch (event.key) {
                case "ArrowRight":
                    if (event.key == this.lastKey) {
                        this.newKeys.pressed = false;
                    }
                    break;
                case "ArrowLeft":
                    if (event.key == this.lastKey) {
                        this.newKeys.pressed = false;
                    }
                    break;
                case "ArrowUp":
                    if (event.key == this.lastKey) {
                        this.newKeys.pressed = false;
                    }
                    break;
                case "ArrowDown":
                    if (event.key == this.lastKey) {
                        this.newKeys.pressed = false;
                    }
                    break;
                case "z":
                    this.attacks = false;
                    break;
            }
        });
    };

    update(): void {
        let key = this.lastKey;
        this.velocity.x = 0;
        this.velocity.y = 0;
        if (this.newKeys.pressed) {
            if (this.position.y % 48 != 0) {
                key = this.lastKeys.y;
            } else if (this.position.x % 48 != 0) {
                key = this.lastKeys.x;
            }
            if (key === "ArrowLeft" && !(this.position.x <= 0)) {
                this.velocity.x = -1;
            } else if (
                key === "ArrowRight" &&
                !(this.position.x + this.dimensions.width >= this.canvas.width)
            ) {
                this.velocity.x = 1;
            } else if (key === "ArrowUp" && !(this.position.y <= 96)) {
                this.velocity.y = -1;
            } else if (
                key === "ArrowDown" &&
                !(
                    this.position.y + this.dimensions.height + 56 >=
                    this.canvas.height
                )
            ) {
                this.velocity.y = 1;
            } else if (this.lastKey == "z") {
                this.velocity.x = 0;
                this.velocity.y = 0;
            }
            this.position.y += this.velocity.y;
            this.position.x += this.velocity.x;
        }
        this.drawBoy(this.change, this.direction);
        this.attack()
    }
}
export default Player;
