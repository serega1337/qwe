import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'

class RevealOnScroll {
    constructor(els, thresholdPercent) {
        this.itemsToReveal = els
        this.thresholdPercent = thresholdPercent
        this.browserHeight = window.innerHeight
        this.hideInitially()
        this.scrollThrottle = throttle(this.calcCaller, 200).bind(this)
        this.events()
    }

    events() {
        window.addEventListener("scroll", this.scrollThrottle)
        window.addEventListener("resize", debounce(() => {
            this.browserHeight = window.innerHeight
        }, 333))
    }

    calcCaller() {
        this.itemsToReveal.forEach(e => {
            if (!e.isRevealed) {
                this.calculateIfScrolledTo(e)
            }
        })
    }

    calculateIfScrolledTo(e) {
        if (window.scrollY + this.browserHeight > e.offsetTop) {
            let scrollPercent = (e.getBoundingClientRect().y / this.browserHeight) * 100
            if (scrollPercent < this.thresholdPercent) {
                e.classList.add("reveal-item--is-visible")
                e.isRevealed = true
                if (e.isLastItem) {
                    window.removeEventListener("scroll", this.scrollThrottle)
                }
            }

        }
    }

    hideInitially() {
        this.itemsToReveal.forEach(e => {
            e.classList.add("reveal-item")
            e.isRevealed = false
        })
        this.itemsToReveal[this.itemsToReveal.length - 1].isLastItem = true
    }
}

export default RevealOnScroll;