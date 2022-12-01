import Player from "./Player.js";
import Map from "./Map.js";
import UI from "./UI.js";
import levels from "./levels.json" assert { type: "json" };

class Game {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    small: CanvasRenderingContext2D;
    hp: CanvasRenderingContext2D;
    hpCounter: number = 2;
    map: number[][] = [];
    round: string = "";
    player: any;
    background: any;
    points: number = 0;
    ui: UI;
    roundNumber: string = "";
    mapLoad: Map;

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
        this.mapLoad = new Map(this.small);

        this.player = new Player(
            { width: 46, height: 46 },
            { x: 288, y: 432 },
            this.canvas,
            this.ctx,
            "./boy.png"
        );
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
        await this.ui.init();
        this.roundNumber = levels.levels.map1.source.slice(-1);
        this.round! = map[map!.length - 1];
        this.ctx!.fillStyle = "black";
        this.ctx!.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.render();
    };

    render = () => {
        this.ctx!.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.mapLoad.draw(this.map);
        this.ui.draw(this.roundNumber);
        this.player.update();
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
