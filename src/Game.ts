import Player from "./Player.js";
import Map from "./Map.js";
import UI from "./UI.js";
import levels from "./levels.json" assert { type: "json" };
import Rock from "./Rock.js";
import Enemy from "./Enemy.js";
import { rectCollision } from "./collision.js";

class Game {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    small: CanvasRenderingContext2D;
    hp: CanvasRenderingContext2D;
    hpCounter: number = 2;
    map: number[][] = [];
    rocks: Rock[] = [];
    round: string = "";
    player: any;
    enemy1: any;
    enemy2: any;
    enemy3: any;
    enemy4: any;
    background: any;
    points: number = 0;
    ui: UI;
    roundNumber: string = "";
    mapLoad: Map;
    level: string;
    static canvas: HTMLCanvasElement;
    static ctx: CanvasRenderingContext2D | null;

    constructor() {
        this.map = levels.levels.map1.map;
        this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
        const ctx = this.canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) throw new Error("missing ctx");
        this.ctx = ctx;

        const small = this.canvas.getContext("2d");
        if (!small) throw new Error("missing smallCtx");
        this.small = small;

        const hp = this.canvas.getContext("2d");
        if (!hp) throw new Error("missing hpCtx");
        this.hp = hp;

        this.ctx!.imageSmoothingEnabled = false;
        this.small!.imageSmoothingEnabled = false;
        this.hp!.imageSmoothingEnabled = false;

        this.ui = new UI(this.ctx, this.points, this.hp, this.hpCounter);
        this.level = levels.levels.map1.source;
        this.mapLoad = new Map(this.small, this.level);

        this.player = new Player(
            { width: 46, height: 46 },
            { x: 288, y: 432 },
            this.canvas,
            this.ctx,
            "./boy.png",
            this.hpCounter
        );
        this.enemy1 = new Enemy(
            { width: 46, height: 46 },
            { x: 470, y: 192 },
            this.canvas,
            this.ctx,
            "./enemy1.png"
        );
        this.enemy2 = new Enemy(
            { width: 44, height: 44 },
            { x: 50, y: 294 },
            this.canvas,
            this.ctx,
            "./enemy1.png"
        );
        this.enemy3 = new Enemy(
            { width: 44, height: 44 },
            { x: 146, y: 580 },
            this.canvas,
            this.ctx,
            "./enemy1.png"
        );
        this.enemy4 = new Enemy(
            { width: 46, height: 46 },
            { x: 434, y: 628 },
            this.canvas,
            this.ctx,
            "./enemy1.png"
        );
        for (let i = 0; i < this.map[0].length; i++) {
            for (let j = 0; j < this.map.length; j++) {
                if (this.map[j][i] === 3) {
                    this.rocks.push(
                        new Rock(
                            { width: 48, height: 48 },
                            { x: i * 48, y: j * 48 },
                            this.canvas,
                            this.ctx,
                            "./theRock1.png"
                        )
                    );
                }
            }
        }
        console.log(this.map);

        if (this.player) console.log("istnieje");
        this.newGame("map1");
    }
    loadFont = async () => {
        let font = new FontFace("Atari", "url(./AtariClassic.ttf)");
        const f = await font.load();
        (document.fonts as any).add(f);
        console.log("font loaded");
    };
    newGame = async (map: string) => {
        await this.loadFont();

        await this.player.init();
        await this.enemy1.init();
        await this.enemy2.init();
        await this.enemy3.init();
        await this.enemy4.init();
        await this.mapLoad.init();
        await Promise.all(this.rocks.map((e) => e.init()));
        await this.ui.init();
        this.ui.hpCounter = 2;
        this.roundNumber = levels.levels.map1.source.slice(-1);
        this.round! = map[map!.length - 1];
        this.ctx!.fillStyle = "black";
        this.ctx!.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.render();
    };

    searchForCollision = () => {
        this.checkIfGameOver();
        //  { x: 288, y: 432 },
        if (rectCollision(this.player, this.enemy1)) {
            this.player.position.x = 288;
            this.player.position.y = 432;
            this.enemy1.hp--;
            this.ui.hpCounter--;
            this.ui.points += 100;
            console.log("enemy one hit");

            //UIController.getInstance().updateHp(this.player.hp);
        }
        if (rectCollision(this.player, this.enemy2)) {
            this.player.position.x = 288;
            this.player.position.y = 432;
            this.enemy2.hp--;
            this.ui.hpCounter--;
            this.ui.points += 100;
            //UIController.getInstance().updateHp(this.player.hp);
        }
        if (rectCollision(this.player, this.enemy3)) {
            this.player.position.x = 288;
            this.player.position.y = 432;
            this.enemy3.hp--;
            this.ui.hpCounter--;
            this.ui.points += 100;
            //UIController.getInstance().updateHp(this.player.hp);
        }
        if (rectCollision(this.player, this.enemy4)) {
            this.player.position.x = 288;
            this.player.position.y = 432;
            this.enemy4.hp--;
            this.ui.hpCounter--;
            this.ui.points += 100;
            //UIController.getInstance().updateHp(this.player.hp);
        }
        for (let i = 0; i < this.rocks.length; i++) {
            const element = this.rocks[i];
            if (rectCollision(this.player, element)) {
                this.player.position.x = 288;
                this.player.position.y = 432;
                this.ui.hpCounter--;
                break;
                //UIController.getInstance().updateHp(this.player.hp);
            }
        }
    };
    checkIfGameOver() {
        if (this.ui.hpCounter == 0) {
            return this.newGame(this.level);
        }
    }
    render = () => {
        this.ctx!.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.mapLoad.draw(this.map);
        this.ui.draw(this.roundNumber);
        this.enemy1.update();
        this.enemy2.update();
        this.enemy3.update();
        this.enemy4.update();
        this.player.update();
        this.rocks.forEach((e) => e.update(this.map));
        this.searchForCollision();

        this.map[Math.floor(this.player.position.y / 48)][
            Math.floor(this.player.position.x / 48)
        ] = 0;
        this.map[Math.floor((this.player.position.y + 47) / 48)][
            Math.floor((this.player.position.x + 47) / 48)
        ] = 0;
        requestAnimationFrame(() => this.render());
    };
}
new Game();
export default Game;
