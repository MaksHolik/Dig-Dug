import { createImage } from "./ImageLoader";
import levels from "./levels.json" assert { type: "json" };

class Map {
  mapName: string;
  small: CanvasRenderingContext2D;
  background: any;
  freeBottom: any;
  freeTop: any;
  freeRight: any;
  freeLeft: any;
  topBottom: any;
  leftRight: any;
  rightBottom: any;
  leftBottom: any;
  rightTop: any;
  leftTop: any;
  blank: any;
  onlyLeft: any;
  onlyRight: any;
  onlyTop: any;
  onlyBottom: any;
  onEarth: any;
  onEarth2: any;
  theRock1: any;
  constructor(small: CanvasRenderingContext2D) {
    this.mapName = levels.levels.map1.source;
    this.small = small;
  }
  init = async () => {
    // od rightBottom pokazuje z której strony ma wolne
    this.background = await createImage(`./${this.mapName}.png`);
    this.freeBottom = await createImage("./freeBottom.png");
    this.freeTop = await createImage("./freeTop.png");
    this.freeRight = await createImage("./freeRight.png");
    this.freeLeft = await createImage("./freeLeft.png");
    this.topBottom = await createImage("./topBottom.png");
    this.leftRight = await createImage("./leftRight.png");
    this.rightBottom = await createImage("./rightBottom.png");
    this.leftBottom = await createImage("./leftBottom.png");
    this.rightTop = await createImage("./rightTop.png");
    this.leftTop = await createImage("./leftTop.png");
    this.blank = await createImage("./blank.png");
    this.onlyRight = await createImage("./onlyRight.png");
    this.onlyLeft = await createImage("./onlyLeft.png");
    this.onlyTop = await createImage("./onlyTop.png");
    this.onlyBottom = await createImage("./onlyBottom.png");
    this.onEarth = await createImage("./onEarth.png");
    this.onEarth2 = await createImage("./onEarth2.png");
    this.theRock1 = await createImage("./theRock1.png");
  };

  draw = async (map: number[][]) => {
    // tło, mwobx, mwoby, propx, propy, posnacanx, posnacany, rozmnacanx, rozmnacany
    for (let i = 0; i < map[0].length; i++) {
      for (let j = 0; j < map.length; j++) {
        const cellSize = 16;
        const scale = 3;
        this.small.drawImage(
          this.background,
          cellSize * i,
          cellSize * j,
          cellSize,
          cellSize,
          cellSize * scale * i, // to x
          cellSize * scale * j, // to y
          cellSize * scale,
          cellSize * scale
        );
        if (map[j][i] == 3) {
          this.small!.drawImage(
            this.theRock1,
            cellSize * scale * i, // to x
            cellSize * scale * j,
            cellSize * scale,
            cellSize * scale
          );
        }
        if (!map[j][i]) {
          if (
            map[j][i] == 0 &&
            map[j][i - 1] == 0 &&
            map[j][i + 1] == 0 &&
            (!map[j + 1] || map[j + 1][i] == 0) &&
            (!map[j - 1] || map[j - 1][i] == 0)
          ) {
            this.small!.drawImage(
              this.blank,
              cellSize * scale * i, // to x
              cellSize * scale * j,
              cellSize * scale,
              cellSize * scale
            );
          }
          if (
            map[j][i] == 0 &&
            ((!map[j][i - 1] || map[j][i - 1]) == 1 ||
              (!map[j][i - 1] || map[j][i - 1]) == 3) &&
            (!map[j][i + 1] || map[j][i + 1] == 0) &&
            (!map[j + 1] || map[j + 1][i] == 0) &&
            (!map[j - 1] || map[j - 1][i] == 0)
          ) {
            this.small!.drawImage(
              this.onlyLeft,
              cellSize * scale * i, // to x
              cellSize * scale * j,
              cellSize * scale,
              cellSize * scale
            );
          } else if (
            map[j][i] == 0 &&
            (!map[j][i - 1] || map[j][i - 1] == 0) &&
            ((!map[j][i + 1] || map[j][i + 1]) == 1 ||
              (!map[j][i + 1] || map[j][i + 1]) == 3) &&
            (!map[j + 1] || map[j + 1][i] == 0) &&
            (!map[j - 1] || map[j - 1][i] == 0)
          ) {
            this.small!.drawImage(
              this.onlyRight,
              cellSize * scale * i, // to x
              cellSize * scale * j,
              cellSize * scale,
              cellSize * scale
            );
          } else if (
            map[j][i] == 0 &&
            (!map[j][i - 1] || map[j][i - 1] == 0) &&
            (!map[j][i + 1] || map[j][i + 1] == 0) &&
            (!map[j + 1] || map[j + 1][i] == 0) &&
            ((!map[j - 1] || map[j - 1][i]) == 1 ||
              (!map[j - 1] || map[j - 1][i]) == 3)
          ) {
            this.small!.drawImage(
              this.onlyTop,
              cellSize * scale * i, // to x
              cellSize * scale * j,
              cellSize * scale,
              cellSize * scale
            );
          } else if (
            map[j][i] == 0 &&
            (!map[j][i - 1] || map[j][i - 1] == 0) &&
            (!map[j][i + 1] || map[j][i + 1] == 0) &&
            ((!map[j + 1] || map[j + 1][i]) == 1 ||
              (!map[j + 1] || map[j + 1][i]) == 3) &&
            (!map[j - 1] || map[j - 1][i] == 0)
          ) {
            this.small!.drawImage(
              this.onlyBottom,
              cellSize * scale * i, // to x
              cellSize * scale * j,
              cellSize * scale,
              cellSize * scale
            );
          }
          if (
            (map[j][i] == 0 &&
              map[j][i - 1] == 0 &&
              map[j][i + 1] == 0 &&
              ((!map[j + 1] || map[j + 1][i]) == 1 ||
                (!map[j + 1] || map[j + 1][i]) == 3) &&
              (!map[j - 1] || map[j - 1][i]) == 1) ||
            (!map[j - 1] || map[j - 1][i]) == 3
          ) {
            this.small!.drawImage(
              this.leftRight,
              cellSize * scale * i, // to x
              cellSize * scale * j,
              cellSize * scale,
              cellSize * scale
            );
          } else if (
            map[j][i] == 0 &&
            (!map[j + 1] || map[j + 1][i] == 0) &&
            (!map[j - 1] || map[j - 1][i] == 0) &&
            ((!map[j][i - 1] || map[j][i - 1]) == 1 ||
              (!map[j][i - 1] || map[j][i - 1]) == 3) &&
            ((!map[j][i + 1] || map[j][i + 1]) == 1 ||
              (!map[j][i + 1] || map[j][i + 1]) == 3)
          ) {
            this.small!.drawImage(
              this.topBottom,
              cellSize * scale * i, // to x
              cellSize * scale * j,
              cellSize * scale,
              cellSize * scale
            );
          }
          // (!map[j+1]||map[j+1][i]==0)
          else if (
            map[j][i] == 0 &&
            (!map[j + 1] || map[j + 1][i] == 0) &&
            (!map[j - 1] || map[j - 1][i] == 1) &&
            ((!map[j][i - 1] || map[j][i - 1]) == 1 ||
              (!map[j][i - 1] || map[j][i - 1]) == 3) &&
            (!map[j][i + 1] || map[j][i + 1] == 0)
          ) {
            this.small!.drawImage(
              this.rightBottom,
              cellSize * scale * i, // to x
              cellSize * scale * j,
              cellSize * scale,
              cellSize * scale
            );
          } else if (
            map[j][i] == 0 &&
            (!map[j + 1] || map[j + 1][i] == 0) &&
            ((!map[j - 1] || map[j - 1][i]) == 1 ||
              (!map[j - 1] || map[j - 1][i]) == 3) &&
            (!map[j][i + 1] || map[j][i - 1] == 0) &&
            ((!map[j][i + 1] || map[j][i + 1]) == 1 ||
              (!map[j][i + 1] || map[j][i + 1]) == 3)
          ) {
            this.small!.drawImage(
              this.leftBottom,
              cellSize * scale * i, // to x
              cellSize * scale * j,
              cellSize * scale,
              cellSize * scale
            );
          }
          if (
            map[j][i] == 0 &&
            ((!map[j + 1] || map[j + 1][i]) == 1 ||
              (!map[j + 1] || map[j + 1][i]) == 3) &&
            (!map[j - 1] || map[j - 1][i] == 0) &&
            (!map[j][i + 1] || map[j][i - 1] == 0) &&
            ((!map[j][i + 1] || map[j][i + 1]) == 1 ||
              (!map[j][i + 1] || map[j][i + 1]) == 3)
          ) {
            this.small!.drawImage(
              this.rightTop,
              cellSize * scale * i, // to x
              cellSize * scale * j,
              cellSize * scale,
              cellSize * scale
            );
          }
          if (
            map[j][i] == 0 &&
            (!map[j][i - 1] || map[j][i - 1] == 0) &&
            ((!map[j][i + 1] || map[j][i + 1]) == 1 ||
              (!map[j][i + 1] || map[j][i + 1]) == 3) &&
            ((!map[j + 1] || map[j + 1][i]) == 1 ||
              (!map[j + 1] || map[j + 1][i]) == 3) &&
            (!map[j - 1] || map[j - 1][i] == 0)
          ) {
            this.small!.drawImage(
              this.leftTop,
              cellSize * scale * i, // to x
              cellSize * scale * j,
              cellSize * scale,
              cellSize * scale
            );
          }
          if (
            map[j][i] == 0 &&
            (map[j][i - 1] == 1 || map[j][i - 1] == 3) &&
            (map[j][i + 1] == 1 || map[j][i + 1] == 3) &&
            map[j - 1][i] == 1
          ) {
            this.small!.drawImage(
              this.freeBottom,
              cellSize * scale * i, // to x
              cellSize * scale * j,
              cellSize * scale,
              cellSize * scale
            );
          } else if (
            map[j][i] == 0 &&
            (!map[j + 1] || map[j + 1][i] == 1) &&
            (!map[j - 1] || map[j - 1][i] == 0) &&
            (!map[j][i + 1] || map[j][i - 1] == 1) &&
            (!map[j][i + 1] || map[j][i] + 1 == 1)
          ) {
            this.small!.drawImage(
              this.freeTop,
              cellSize * scale * i, // to x
              cellSize * scale * j,
              cellSize * scale,
              cellSize * scale
            );
          } else if (
            map[j - 1] &&
            map[j + 1] &&
            map[j][i] == 0 &&
            map[j][i - 1] == 1 &&
            map[j][i + 1] == 0 &&
            map[j + 1][i] == 1 &&
            map[j - 1][i] == 1
          ) {
            this.small!.drawImage(
              this.freeRight,
              cellSize * scale * i, // to x
              cellSize * scale * j,
              cellSize * scale,
              cellSize * scale
            );
          } else if (
            map[j][i] == 0 &&
            (!map[j + 1] || map[j + 1][i] == 1) &&
            (!map[j - 1] || map[j - 1][i] == 1) &&
            (!map[j][i + 1] || map[j][i - 1] == 0) &&
            (!map[j][i + 1] || map[j][i] + 1 == 1)
          ) {
            this.small!.drawImage(
              this.freeLeft,
              cellSize * scale * i, // to x
              cellSize * scale * j,
              cellSize * scale,
              cellSize * scale
            );
          } else if (
            map[j][i] == 0 &&
            (!map[j][i - 1] || map[j][i - 1] == 0) &&
            (!map[j][i + 1] || map[j][i + 1] == 0) &&
            (!map[j + 1] || map[j + 1][i] == 1) &&
            map[j - 1][i] == 2
          ) {
            this.small!.drawImage(
              this.onEarth,
              cellSize * scale * i, // to x
              cellSize * scale * j,
              cellSize * scale,
              cellSize * scale
            );
          } else if (
            map[j][i] == 0 &&
            (!map[j][i - 1] || map[j][i - 1] == 0) &&
            (!map[j][i + 1] || map[j][i + 1] == 0) &&
            (!map[j + 1] || map[j + 1][i] == 0) &&
            map[j - 1][i] == 2
          ) {
            this.small!.drawImage(
              this.onEarth2,
              cellSize * scale * i, // to x
              cellSize * scale * j,
              cellSize * scale,
              cellSize * scale
            );
          }
        }
      }
    }
  };
}
export default Map;
