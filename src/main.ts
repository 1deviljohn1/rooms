import './assets/scss/app.scss'
import { Canvas } from './classes/Canvas'
import { Сharacter } from './classes/Сharacter'
import { keys } from './types'

const canvas = new Canvas('canvas')

const сharacter = new Сharacter({ x: 100, y: 100 }, 50, 50, canvas)

сharacter.draw()

const animate = () => {
    window.requestAnimationFrame(animate)
    сharacter.update()
}

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case keys.KeyUp:
        case keys.ArrowUp:
        case keys.SpaceUp:
            сharacter.jump()
            break

        case keys.KeyLeft:
        case keys.ArrowLeft:
            сharacter.moveLeft()
            break

        case keys.KeyRight:
        case keys.ArrowRight:
            сharacter.moveRight()
            break

        default:
            break
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case keys.KeyLeft:
        case keys.ArrowLeft:
        case keys.KeyRight:
        case keys.ArrowRight:
            сharacter.stopMove()
            break

        default:
            break
    }
})

animate()
