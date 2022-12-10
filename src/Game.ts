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
    eneMap: number[][] = [];
    rocks: Rock[] = [];
    enemies: Enemy[] = [];
    round: string = "";
    player: any;
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
        this.eneMap = levels.levels.map1.entity;
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

        for (let i = 0; i < this.eneMap[0].length; i++) {
            for (let j = 0; j < this.eneMap.length; j++) {
                if (this.eneMap[j][i] === 4) {
                    this.enemies.push(
                        new Enemy(
                            { width: 48, height: 48 },
                            { x: i * 48, y: j * 48 },
                            this.canvas,
                            this.ctx,
                            "./enemy1.png"
                        )
                    );
                }
            }
        }
        for (let i = 0; i < this.eneMap[0].length; i++) {
            for (let j = 0; j < this.eneMap.length; j++) {
                if (this.eneMap[j][i] === 3) {
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

        await this.mapLoad.init();
        await Promise.all(this.rocks.map((e) => e.init()));
        await Promise.all(this.enemies.map((e) => e.init()));
        await this.ui.init();
        this.ui.hpCounter = 2;
        this.roundNumber = levels.levels.map1.source.slice(-1);
        this.round! = map[map!.length - 1];
        this.ctx!.fillStyle = "black";
        this.ctx!.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.render();
    };
    backToStart: any = async () => {
        this.player.position.x = 288;
        this.player.position.y = 432;
        this.ui.hpCounter--;
    };
    searchForCollision = async () => {
        this.checkIfGameOver();

        for (let i = 0; i < this.rocks.length; i++) {
            const element = this.rocks[i];
            if (this.rocks.some((e) => e.falls))
                if (rectCollision(this.player, element)) {
                    this.backToStart();
                    break;
                }
        }
        for (let i = 0; i < this.enemies.length; i++) {
            const element = this.enemies[i];
            if (rectCollision(this.player, element)) {
                this.backToStart();
                break;
            }
        }
        for (let i = 0; i < this.enemies.length; i++) {
            const element = this.enemies[i];
            for (let j = 0; j < this.rocks.length; j++) {
                if (rectCollision(this.rocks[j], element)) {
                    element.hp--;
                    break;
                }
            }
        }
    };
    checkIfGameOver() {
        if (this.ui.hpCounter == 0) {
            location.reload();
            return false;
        }
        return true;
    }
    checkIfNextLevel() {
        console.log(this.enemies);
        //do naprawienia
        if (this.enemies.length == 0) {
            this.newGame("map2")
            this.eneMap = levels.levels.map2.entity;
            this.map = levels.levels.map2.map;
            this.level = levels.levels.map2.source;
            this.ui.round++;
            return true
        }
        return false
       
    }
    render = () => {
        this.ctx!.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.mapLoad.draw(this.map);
        this.ui.draw(this.roundNumber);

        this.rocks.forEach((e) => e.update(this.map, this.eneMap));
        this.enemies = this.enemies.filter(
            (e) => !e.update(this.eneMap, this.ui)
        );
        this.player.update(this.eneMap, this.ui, this.enemies);

        this.searchForCollision();

        this.map[Math.floor(this.player.position.y / 48)][
            Math.floor(this.player.position.x / 48)
        ] = 0;
        this.map[Math.floor((this.player.position.y + 47) / 48)][
            Math.floor((this.player.position.x + 47) / 48)
        ] = 0;
        if(this.checkIfNextLevel()) requestAnimationFrame(() => this.render())
        if (this.checkIfGameOver()) requestAnimationFrame(() => this.render());
    };
}
new Game();
export default Game;
