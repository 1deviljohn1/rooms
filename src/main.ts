import './assets/scss/app.scss'
import { Canvas } from './classes/Canvas'
import { Platform } from './classes/Platform'
import { Сharacter } from './classes/Сharacter'
import { keys } from './types'

const canvas = new Canvas('canvas')
const platform = new Platform({ x: 200, y: 700 }, 300, 50, canvas)
const сharacter = new Сharacter({ x: 100, y: 100 }, 50, 50, canvas)

const animate = () => {
    window.requestAnimationFrame(animate)
    сharacter.update()
    platform.draw()

    if (
        сharacter.coords.y <= platform.coords.y + platform.height &&
        сharacter.coords.x <= platform.coords.x + platform.width &&
        сharacter.coords.x >= platform.coords.x
    ) {
        сharacter.speed.y = 0
    }
}

window.addEventListener('keydown', (event) => {
    switch (event.code) {
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
    switch (event.code) {
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
