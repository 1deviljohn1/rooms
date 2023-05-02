import './assets/styles/app.scss'
import { Keys } from './types'
import { Player } from './classes/Player'
import { EventListeners } from './classes/EventListeners'
import { Sprite } from './classes/Sprite'
import { Collisions } from './classes/Collisions'

const canvas = document.getElementById('canvas') as HTMLCanvasElement
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

canvas.width = 64 * 16
canvas.height = 64 * 9

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
const backgroundLevel1 = new Sprite('./img/backgroundLevel1.png')

eventsListeners.listenKeyDown(player, keys)
eventsListeners.listenKeyUp(keys)

const animate = () => {
    window.requestAnimationFrame(animate)

    backgroundLevel1.draw(ctx, { x: 0, y: 0 })
    collisionsBlocks.forEach((block) => {
        block.draw(ctx)
    })

    player.velocity.x = 0

    if (keys.a.pressed) {
        player.velocity.x = -5
    }

    if (keys.d.pressed) {
        player.velocity.x = 5
    }

    player.draw(ctx, { x: player.position.x, y: player.position.y })
    player.update()
}

animate()
