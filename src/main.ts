import './assets/app.scss'
import { Player } from './classes/Player'

const canvas = document.getElementById('canvas') as HTMLCanvasElement
const c = canvas.getContext('2d') as CanvasRenderingContext2D

canvas.width = 64 * 16
canvas.height = 64 * 9

const player = new Player(canvas)

const animate = () => {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)

    player.draw()
    player.update()
}

animate()
