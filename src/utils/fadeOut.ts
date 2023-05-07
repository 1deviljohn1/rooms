export function fadeOut(element: HTMLElement, speed: number) {
    return new Promise<void>((resolve) => {
        let counter = 0
        const acceleration = 2

        const timer = setInterval(() => {
            counter = counter + acceleration
            element.style.opacity = String((100 - counter) / 100)
            if (counter === 100) {
                clearInterval(timer)
                resolve()
            }
        }, speed / 100)
    })
}
