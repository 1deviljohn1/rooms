import './assets/styles/app.scss'
import type { Keys } from './types'
import { Player } from './classes/Player'
import { EventListeners } from './classes/EventListeners'
import { Sprite } from './classes/Sprite'
import { Collisions } from './classes/Collisions'
import { fadeOut } from './utils/fadeOut'

const canvas = document.getElementById('canvas') as HTMLCanvasElement
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

canvas.width = 64 * 16
canvas.height = 64 * 9
let stopFading = false

const keys: Keys = {
    space: {
        pressed: false,
    },
    w: {
        pressed: false,
    },
    a: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
}

const collisions = new Collisions()
const collisionsBlocks = collisions.collisionsBlocksArray()

const player = new Player(collisionsBlocks)
const eventsListeners = new EventListeners()

const backgroundLevel1 = new Image()
backgroundLevel1.src = './img/backgroundLevel1.png'
const door1 = new Sprite({
    src: './img/doorOpen.png',
    position: { x: 760, y: 274 },
    framesNumber: 5,
    framesReducer: 10,
    loop: false,
    autoplay: false,
})

eventsListeners.listenKeyDown(player, door1, keys)
eventsListeners.listenKeyUp(keys)

const animate = () => {
    window.requestAnimationFrame(animate)

    ctx.drawImage(backgroundLevel1, 0, 0)
    door1.draw(ctx)
    collisionsBlocks.forEach((block) => {
        block.draw(ctx)
    })

    player.animate(keys, ctx)

    if (player.completeEnteringDoor && !stopFading) {
        fadeOut(canvas, 800)
        stopFading = true
    }
}

animate()
