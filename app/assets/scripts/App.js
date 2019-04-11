import MobileMenu228 from './modules/MobileMenu';
import RevealOnScroll from './modules/revealOnScroll'
import $ from 'jquery';
let mobileMenu = new MobileMenu228();
new RevealOnScroll($('.feature-item'), '85%');
new RevealOnScroll($('.testimonial'), '69%');