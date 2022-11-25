export class Canvas {
    el: HTMLCanvasElement
    ctx: CanvasRenderingContext2D

    constructor(selector: string) {
        this.el = document.querySelector(selector) as HTMLCanvasElement
        this.ctx = this.el.getContext('2d') as CanvasRenderingContext2D
        this.el.width = window.innerWidth
        this.el.height = window.innerHeight
    }
}
