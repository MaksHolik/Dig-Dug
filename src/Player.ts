import { dimensions, position } from "./interfaces";
import Characters from "./Characters";
import UI from "./UI";
import Enemy from "./Enemy";

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
        this.newKeys = {
            pressed: false,
        };
        this.lastKeys = {
            x: "",
            y: "",
        };
        this.movePlayer();
    }
    attack = async (
        eneMap: number[][],
        ui: UI,
        enemies: Enemy[],
        map: number[][]
    ) => {
        const posX = this.position.x + this.dimensions.height / 2;
        const posY = this.position.y + this.dimensions.width / 2;

        if (this.lastKey == "z") {
            let data = this.ctx?.getImageData(
                0,
                0,
                this.canvas.width,
                this.canvas.height
            ).data;
            let currentX = 0;
            let currentY = 0;
            if (this.direction == "ArrowLeft") {
                for (let i = 1; i <= 3; i++) {
                    const enePosX = Math.floor(
                        (this.position.x - 3 * this.dimensions.width) / 48
                    );
                    const enePosY = Math.floor(this.position.y / 48);
                    const myPosX = Math.floor(this.position.x / 48);
                    const myPosY = Math.floor(this.position.y / 48);

                    enemies.forEach((e) => {
                        const { x, y } = e.getPos();
                        if (
                            enePosX <= x &&
                            enePosY == y &&
                            x < myPosX &&
                            !(map[myPosY][myPosX - 1] === 1)
                        ) {
                            eneMap[enePosY][enePosX + i] = 0;
                            enemies.splice(enemies.indexOf(e), 1);
                            ui.points += 250;
                        }
                    });
                    currentX = posX - this.dimensions.width * i;
                    currentY = posY;
                    let pixelTab = this.getPixelColor(
                        currentX,
                        currentY,
                        data!
                    );

                    if (
                        pixelTab[0] === 0 &&
                        pixelTab[1] === 0 &&
                        pixelTab[2] === 0
                    ) {
                        this.ctx!.drawImage(
                            this.arrowRestLeft,
                            currentX,
                            currentY,
                            this.dimensions.width,
                            this.dimensions.height / 3
                        );
                    } else {
                        break;
                    }
                }
                this.ctx!.drawImage(
                    this.arrowBeginningLeft,
                    currentX,
                    currentY - 14,
                    this.dimensions.width,
                    this.dimensions.height
                );
            } else if (this.direction == "ArrowRight") {
                for (let i = 1; i <= 3; i++) {
                    const enePosX = Math.floor(
                        (this.position.x + 3 * this.dimensions.width) / 48
                    );
                    const enePosY = Math.floor(this.position.y / 48);
                    const myPosX = Math.floor(this.position.x / 48);
                    const myPosY = Math.floor(this.position.y / 48);
                    enemies.forEach((e) => {
                        const { x, y } = e.getPos();
                        if (
                            enePosX > x &&
                            enePosY == y &&
                            x > myPosX &&
                            map[myPosY][myPosX + 1] !== 1
                        ) {
                            eneMap[enePosY][enePosX + i] = 0;
                            enemies.splice(enemies.indexOf(e), 1);
                            ui.points += 250;
                        }
                    });
                    currentX = posX + this.dimensions.width * i;
                    currentY = posY;
                    let pixelTab = this.getPixelColor(
                        currentX,
                        currentY,
                        data!
                    );
                    if (
                        pixelTab[0] === 0 &&
                        pixelTab[1] === 0 &&
                        pixelTab[2] === 0
                    ) {
                        this.ctx!.drawImage(
                            this.arrowRestRight,
                            currentX - this.dimensions.width,
                            currentY - 14,
                            this.dimensions.width,
                            this.dimensions.height
                        );
                    } else {
                        break;
                    }
                }
                this.ctx!.drawImage(
                    this.arrowBeginningRight,
                    currentX - this.dimensions.width,
                    currentY - 14,
                    this.dimensions.width,
                    this.dimensions.height
                );
            } else if (this.direction == "ArrowUp") {
                for (let i = 1; i < 3; i++) {
                    const enePosX = Math.floor(this.position.x / 48);
                    const enePosY = Math.floor(
                        (this.position.y - 3 * this.dimensions.width) / 48
                    );
                    const myPosY = Math.floor(this.position.y / 48);
                    const myPosX = Math.floor(this.position.x / 48);
                    enemies.forEach((e) => {
                        const { x, y } = e.getPos();
                        if (
                            enePosX == x &&
                            enePosY < y &&
                            y < myPosY &&
                            !(map[myPosY - 1][myPosX] === 1)
                        ) {
                            eneMap[enePosY + i][enePosX] = 0;
                            enemies.splice(enemies.indexOf(e), 1);
                            ui.points += 250;
                        }
                    });
                    currentX = posX;
                    currentY = posY - this.dimensions.height * i;
                    let pixelTab = this.getPixelColor(
                        currentX,
                        currentY,
                        data!
                    );
                    if (
                        pixelTab[0] === 0 &&
                        pixelTab[1] === 0 &&
                        pixelTab[2] === 0
                    ) {
                        this.ctx!.drawImage(
                            this.arrowRestUp,
                            currentX - 14,
                            currentY,
                            this.dimensions.width,
                            this.dimensions.height
                        );
                    } else {
                        break;
                    }
                }
                this.ctx!.drawImage(
                    this.arrowBeginningUp,
                    currentX - 14,
                    currentY - this.dimensions.height,
                    this.dimensions.width,
                    this.dimensions.height
                );
            } else if (this.direction == "ArrowDown") {
                for (let i = 1; i <= 3; i++) {
                    const enePosX = Math.floor(this.position.x / 48);
                    const enePosY = Math.floor(
                        (this.position.y + 3 * this.dimensions.width) / 48
                    );
                    const myPosY = Math.floor(this.position.y / 48);
                    const myPosX = Math.floor(this.position.x / 48);
                    enemies.forEach((e) => {
                        const { x, y } = e.getPos();
                        if (
                            enePosX == x &&
                            enePosY >= y &&
                            y > myPosY &&
                            !(map[myPosY + 1][myPosX] === 1)
                        ) {
                            eneMap[enePosY + i][enePosX] = 0;
                            enemies.splice(enemies.indexOf(e), 1);
                            ui.points += 250;
                        }
                    });
                    currentX = posX;
                    currentY = posY + this.dimensions.height * i;
                    let pixelTab = this.getPixelColor(
                        currentX,
                        currentY,
                        data!
                    );
                    if (
                        pixelTab[0] === 0 &&
                        pixelTab[1] === 0 &&
                        pixelTab[2] === 0
                    ) {
                        this.ctx!.drawImage(
                            this.arrowRestDown,
                            currentX - this.dimensions.height / 4,
                            currentY - this.dimensions.height,
                            this.dimensions.width,
                            this.dimensions.height
                        );
                    } else {
                        break;
                    }
                }
                this.ctx!.drawImage(
                    this.arrowBeginningDown,
                    currentX - this.dimensions.width / 3,
                    currentY - this.dimensions.height,
                    this.dimensions.width,
                    this.dimensions.height
                );
            }
            // tu śmieciu
        }
    };

    getPixelColor = (x: number, y: number, data: Uint8ClampedArray) => {
        const red = y * (this.canvas.width * 4) + x * 4;
        return [data[red], data[red + 1], data[red + 2], data[red + 3]];
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
                    if (this.lastKey != "z") this.direction = this.lastKey;
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

    update(
        eneMap: number[][],
        ui: UI,
        enemies: Enemy[],
        map: number[][]
    ): void {
        let key = this.lastKey;
        let eneX = Math.floor(this.position.x / 48);
        let eneY = Math.floor(this.position.y / 48);
        let eneX2 = Math.ceil(this.position.x / 48);
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
            if (eneMap[eneY + 1] && eneMap[eneY + 1][eneX] == 3) {
                if (this.velocity.y > 0) this.velocity.y = 0;
            }
            if (eneMap[eneY][eneX + 1] == 3) {
                if (this.velocity.x > 0) this.velocity.x = 0;
            }
            if (eneMap[eneY][eneX2 - 1] == 3) {
                if (this.velocity.x < 0) this.velocity.x = 0;
            }
            this.position.y += this.velocity.y;
            this.position.x += this.velocity.x;
        }
        this.drawBoy(this.change, this.direction);
        this.attack(eneMap, ui, enemies, map);
    }
}
export default Player;
