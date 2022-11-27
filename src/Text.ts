class Text {
    text: string
    position: { left: number; top: number }
    size: number;
    ctx: CanvasRenderingContext2D | null;
    color: string;
    constructor(data: { color: string, size: number, position: { left: number, top: number }, text: string, ctx: CanvasRenderingContext2D | null }) {
        this.size = data.size
        this.position = data.position
        this.text = data.text
        this.ctx = data.ctx
        this.color = data.color
        this.addText()

    }
    addText() {
        this.ctx!.font = `${this.size}px Atari`
        this.ctx!.fillStyle = `${this.color}`
        this.ctx?.fillText(this.text, this.position.left, this.position.top)
    }
}

export default Text