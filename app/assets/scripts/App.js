import '../styles/styles.css'
import 'lazysizes'
import MobileMenu from './modules/MobileMenu'
import RevealOnScroll from './modules/RevealOnScroll'
import StickyHeader from './modules/StickyHeader'

new StickyHeader()
new RevealOnScroll(document.querySelectorAll(".feature-item"), 75)
new RevealOnScroll(document.querySelectorAll(".testimonial"), 60)
let modal
new MobileMenu()

document.querySelectorAll(".open-modal").forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault()
    if (typeof modal == "undefined") {
      import(/*webpackChunkName:"MODAL"*/'./modules/Modal').then(x => {
        modal = new x.default()
        setTimeout(()=>modal.openTheModal(),100)
      }).catch(() => console.log('there was a problem for some reason'))
    } else {
      modal.openTheModal()
    }
  })
})
if (module.hot) {
  module.hot.accept()
}

