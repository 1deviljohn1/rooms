export const fadeOut = (element: HTMLElement, speed: number) => {
    let counter = 0
    const acceleration = 2

    const timer = setInterval(() => {
        counter = counter + acceleration
        element.style.opacity = String((100 - counter) / 100)
        if (counter === 100) {
            clearInterval(timer)
        }
    }, speed / 100)
}
