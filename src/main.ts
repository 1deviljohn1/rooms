import './assets/scss/app.scss'
import { Canvas } from './classes/Canvas'
import { Сharacter } from './classes/Сharacter'

const canvas = new Canvas('canvas')

const сharacter = new Сharacter({ x: 100, y: 100 }, 80, 80, canvas)

сharacter.draw()

const animate = () => {
    window.requestAnimationFrame(animate)
    сharacter.update()
}

animate()
