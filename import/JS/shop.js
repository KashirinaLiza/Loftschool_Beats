class Slider {
  constructor(selector, settings = {}){
    this.slider = document.querySelector(selector);
    this.current = 1;
    this.slideCount = this.slider.children.length;
    this.settings = settings;
  }
  next() {
    if(this.current < this.slideCount) {
    this.current++;
    } else {
      this.current = 1;
    }
    this.slider.style.transform = `translateX(-${(this.current - 1)*100}%)`;

  }
  prev() {
    if(this.current > 1) {
    this.current--;
    } else {
      this.current = this.slideCount;
    }
    this.slider.style.transform = `translateX(-${(this.current - 1)*100}%)`;

  }

  

  setEventListener(){
    const buttonSlideLeft =document.querySelector('.direction-left');
    const buttonSlideRight =document.querySelector('.direction-right');
    buttonSlideLeft.addEventListener('click', () => {
      this.prev()
    })
    buttonSlideRight.addEventListener('click', () => {
      this.next()
    })
  }

  init() {
    if(!!this.settings.transition) {
      this.slider.style.transition = `${this.settings.transition}ms`
    }
    this.setEventListener();
  }
}

const slider = new Slider('#slider', {
  transition: 1000,
});

slider.init();
