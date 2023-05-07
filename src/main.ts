import './assets/styles/app.scss'
import type { Keys } from './types'
import type { CollisionBlock } from './classes/CollisionBlock'
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
let step: 0 | 1 | 2 = 0

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

const eventsListeners = new EventListeners()
let player: Player
const collisions = new Collisions()
let collisionsBlocks: CollisionBlock[]
let door: Sprite
const background = new Image()

const steps = [
    {
        init: () => {
            player.position = { x: 200, y: 200 }
            door.position = { x: 760, y: 274 }
        },
    },
    {
        init: () => {
            player.position = { x: 80, y: 70 }
            door.position = { x: 772, y: 335 }
        },
    },
    {
        init: () => {
            player.position = { x: 800, y: 150 }
            player.lastDirection = 'left'
            door.position = { x: 177, y: 335 }
        },
    },
]

async function animate() {
    window.requestAnimationFrame(animate)

    ctx.drawImage(background, 0, 0)
    door.draw(ctx)
    player.animate(keys, ctx)

    if (player.completeEnteringDoor && !stopFading) {
        stopFading = true
        step++

        if (step > 2) {
            step = 0
        }

        await fadeOut(canvas, 600)
        initStep(step)
    }
}

function initStep(step: number) {
    canvas.style.opacity = '1'
    player = new Player()
    door = new Sprite({
        src: './img/doorOpen.png',
        framesNumber: 5,
        framesReducer: 10,
        loop: false,
        autoplay: false,
    })
    background.src = `./img/backgroundLevel${step + 1}.png`
    collisionsBlocks = collisions.collisionsBlocksArray(step)
    player.collisionsBlocks = collisionsBlocks
    stopFading = false

    eventsListeners.listenKeyDown(player, door, keys)
    eventsListeners.listenKeyUp(keys)

    steps[step].init()
}

initStep(step)
animate()
