import $ from 'jquery';
import smoothScroll from 'jquery-smooth-scroll';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';
class StickyHeader {
    constructor() {
        this.siteHeader = $('.site-header');
        this.headerTriggerElement = $('.large-hero__subtitle');
        this.createHeaderWaypoint();
        this.pageSections = $('.page-section');
        this.headerLinks = $('.primary-nav a');
        this.createPageSectionWaypoints();
        this.addSmoothScrolling();
    }
    addSmoothScrolling(){
    	this.headerLinks.smoothScroll();
    }
    createHeaderWaypoint() {
        let that = this
        new Waypoint({
            element: this.headerTriggerElement[0],
            handler: function(direction) {
                if (direction == 'down') {
                    that.siteHeader.addClass('site-header--dark')
                } else {
                    that.siteHeader.removeClass('site-header--dark')
                }
            }
        })
    }
    createPageSectionWaypoints() {
        let that = this;
        this.pageSections.each(function() {
            let currentPageSection = this;
            new Waypoint({
                element: currentPageSection,
                handler: function(direction) {
                    if (direction == 'down') {
                        let matchingHeaderLink = currentPageSection.getAttribute('data-matching-link');
                        that.headerLinks.removeClass('is-current-link')
                        $(matchingHeaderLink).addClass('is-current-link');
                    }
                },
                offset: '18%'
            });
            new Waypoint({
                element: currentPageSection,
                handler: function(direction) {
                    if (direction == 'up') {
                        let matchingHeaderLink = currentPageSection.getAttribute('data-matching-link');
                        that.headerLinks.removeClass('is-current-link')
                        $(matchingHeaderLink).addClass('is-current-link');
                    }
                },
                offset: '-40%'
            })
        })

    }
}

export default StickyHeader