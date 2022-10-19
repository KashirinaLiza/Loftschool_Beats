class Modal {
    constructor(selector, classMod){
        this.popup = document.querySelector(selector);
        this._classMod = classMod;
    }

    // слушатель закрытия попапа по кнопке esc
    _handleEscUp = (evt) => {
        if(evt.key ==='Escape'){
            this.close()
        }
    }

    open() {
        this.popup.classList.add(this._classMod)
        document.addEventListener('keyup', this._handleEscUp)
    }

    close(){ 
        this.popup.classList.remove(this._classMod)
        document.removeEventListener('keyup', this._handleEscUp)
    }

    setEventListener() {
        //вешаем обрабочтик закрытия попапа по крестику, по оверлею, и если на элементе есть атрибут data-close="true"
        this.popup.addEventListener('click', (evt) => {
            if(evt.target.classList.contains('popup-js') ||  !!evt.target.closest('.fullscreenmenu--icon--close') || evt.target.dataset.close === 'true') {
                this.close()
            }
        })

        //вешаем обрабочтик открытия попапа если на элементе есть атрибут data-open="id открываемого попапа"
        document.addEventListener('click', (e) => {
            const targetButtonEvent = e.target.closest('[data-open]'); //если кликнули по кнопке открытия у которой есть атриюут data-open записываем в переменную эту кнопку
            if(targetButtonEvent) {
                const currentIdPopup = targetButtonEvent.dataset.open; //забираем значение id из атрибута кнопки по которой нажали
                if(this.popup.id === currentIdPopup){ // проверям соотвествует ли id текущего попапа значению атрибут data-open
                    this.open();
                }
            }
        })
    }

}

const menu = new Modal('#fullmenu', 'fullscreenmenu--opened')
menu.setEventListener()
