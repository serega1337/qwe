import MobileMenu228 from './modules/MobileMenu';
import RevealOnScroll from './modules/revealOnScroll'
import StickyHeader from './modules/StickyHeader'
import $ from 'jquery';
let mobileMenu = new MobileMenu228();
new RevealOnScroll($('.feature-item'), '85%');
new RevealOnScroll($('.testimonial'), '69%');
let stickyHeader = new StickyHeader;