import $ from 'jquery';
import MobileMenu228 from './modules/MobileMenu';
import RevealOnScroll from './modules/revealOnScroll';
import StickyHeader from './modules/StickyHeader';
import Modal from './modules/Modal';

let mobileMenu = new MobileMenu228();
new RevealOnScroll($('.feature-item'), '85%');
new RevealOnScroll($('.testimonial'), '69%');
let stickyHeader = new StickyHeader();
let modal = new Modal();
