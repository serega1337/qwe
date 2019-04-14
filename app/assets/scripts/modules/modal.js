import $ from 'jquery';

class Modal {
    constructor() {
        this.openModalButton = $('.open-modal');
        this.modal = $('.modal');
        this.colseModalButton = $('.modal__close');
        this.events();
    }
    events() {
        //clcik open button
        this.openModalButton.click(this.openModal.bind(this));
        //click close buttn
        this.colseModalButton.click(this.closeModal.bind(this));
        //push any key tto
        $(document).keyup(this.keyPressHandler.bind());
    }
    keyPressHandler(e) {
        if (e.keyCode === 27){
        	this.closeModal();
        }
    }
    openModal() {
        this.modal.addClass('modal--is-visible');
        return false;
    }
    closeModal() {
        this.modal.removeClass('modal--is-visible');
    }
}

export default Modal;