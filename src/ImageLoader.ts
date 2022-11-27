export function createImage(source: string): Promise<HTMLImageElement> {
    let image: HTMLImageElement = new Image();
    image.src = source;
    return new Promise((res, _rej) => {
        image.onload = () => {
            res(image);
        };
    });
}
