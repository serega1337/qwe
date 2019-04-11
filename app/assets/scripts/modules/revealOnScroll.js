import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';
class RevealOnScroll {
    constructor(els, offset) {
        this.itemsToReveal = els;
        this.offsetPersent = offset;
        this.hideInitially();
        this.createWaypoints();

    }
    hideInitially() {
        this.itemsToReveal.addClass('reveal-item');
    }
    createWaypoints() {
        var that = this;
        this.itemsToReveal.each(function() {
            let currentItem = this;
            new Waypoint({
                element: currentItem,
                handler: () => $(currentItem).addClass('reveal-item--is-visible'),
                offset: that.offsetPersent
            })
        })
    }
}
export default RevealOnScroll;