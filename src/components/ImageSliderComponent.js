import './ImageSliderComponent.css';

export class Slide {
  constructor(id, imgUrl, alt = 'Image') {
    this.id = id;
    this.imgUrl = imgUrl;
    this.alt = alt;
    this.DOMComponent = this.generateDOMComponent();
  }

  generateDOMComponent() {
    const slide = document.createElement('div');
    slide.classList.add('slide');
    slide.setAttribute('data-slide-id', this.id);

    const image = document.createElement('img');
    image.src = this.imgUrl;
    image.alt = this.alt;

    slide.appendChild(image);

    return slide;
  }
}

export class ImageSliderComponent {
  constructor(imgUrl, alt) {
    this.imageSlider = document.createElement('div');
    this.imageSlider.classList.add('image-slider');

    this.slides = [];
    this.currentSlide = new Slide(0, imgUrl, alt);
    this.slides.push(this.currentSlide);
  }

  addSlide(imageUrl, alt) {
    const slide = new Slide(this.slides.length, imageUrl, alt);
    this.slides.push(slide);
  }

  setCurrentSlide(slide) {
    this.currentSlide = slide;
    this.currentSlide.DOMComponent.classList.add('current-slide');
  }

  getPreviousSlideId() {
    let previousSlideId = this.currentSlide.id - 1;
    if (previousSlideId < 0) {
      previousSlideId = this.slides.length - 1;
    }
    return previousSlideId;
  }

  getNextSlideId() {
    let nextSlideId = this.currentSlide.id + 1;
    if (nextSlideId >= this.slides.length) {
      nextSlideId = 0;
    }
    return nextSlideId;
  }

  updateSelectedSlide(selectedSlideId) {
    this.currentSlide.DOMComponent.classList.remove('current-slide');

    const selectedSlide = this.slides[selectedSlideId];

    this.setCurrentSlide(selectedSlide);

    const slidesContainer = this.imageSlider.querySelector('.slides-container');

    // with this, the slides container can 'slide' itself, as each image/slide
    // occupy 100% of the slides container and the others are hidden with the overflow,
    // the sliding effect gets simulated by moving the slides container horizontally
    slidesContainer.style.transform = `translateX(${-100 * selectedSlideId}%)`;

    this.updateNavigationBtn();
  }

  updateNavigationBtn() {
    const currentSelectedNavigationBtn = this.imageSlider.querySelector(
      '.navigation-btn.selected-navigation-btn'
    );
    currentSelectedNavigationBtn.classList.remove('selected-navigation-btn');

    this.imageSlider
      .querySelector(`.navigation-btn[data-slide-id="${this.currentSlide.id}"]`)
      .classList.add('selected-navigation-btn');
  }

  generatePreviousSlideBtn() {
    const previousSlideBtn = document.createElement('button');
    previousSlideBtn.classList.add('previous-slide-btn');
    previousSlideBtn.appendChild(
      this.createSvg(
        'M2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12M18,11H10L13.5,7.5L12.08,6.08L6.16,12L12.08,17.92L13.5,16.5L10,13H18V11Z'
      )
    );

    previousSlideBtn.addEventListener('click', () => {
      this.updateSelectedSlide(this.getPreviousSlideId());
    });

    return previousSlideBtn;
  }

  generateNextSlideBtn() {
    const nextSlideBtn = document.createElement('button');
    nextSlideBtn.classList.add('next-slide-btn');
    nextSlideBtn.appendChild(
      this.createSvg(
        'M2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12M17,12L12,7V10H8V14H12V17L17,12Z'
      )
    );

    nextSlideBtn.addEventListener('click', () => {
      this.updateSelectedSlide(this.getNextSlideId());
    });

    return nextSlideBtn;
  }

  createSvg(svgDirection) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const iconPath = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    );

    svg.setAttribute('viewBox', '0 0 24 24');

    iconPath.setAttribute('d', svgDirection);

    svg.appendChild(iconPath);

    return svg;
  }

  generateNavigationBtns() {
    const navigationBtnsContainer = document.createElement('div');
    navigationBtnsContainer.classList.add('navigation-btns-container');
    this.slides.forEach((slide) => {
      const navigationBtn = document.createElement('button');
      navigationBtn.classList.add('navigation-btn');
      if (slide === this.currentSlide) {
        navigationBtn.classList.add('selected-navigation-btn');
      }
      navigationBtn.setAttribute('data-slide-id', slide.id);
      navigationBtn.addEventListener('click', (e) => {
        const slideIdToNavigate = Number(
          e.currentTarget.getAttribute('data-slide-id')
        );
        this.updateSelectedSlide(slideIdToNavigate);
      });

      navigationBtnsContainer.appendChild(navigationBtn);
    });

    return navigationBtnsContainer;
  }

  render() {
    const slidesAndArrowBtnsContainer = document.createElement('div');
    slidesAndArrowBtnsContainer.classList.add(
      'slides-and-arrow-btns-container'
    );

    const slidesContainer = document.createElement('div');
    slidesContainer.classList.add('slides-container');

    this.slides.forEach((slide) => {
      slidesContainer.appendChild(slide.DOMComponent);
    });

    this.setCurrentSlide(this.slides[0]);

    const previousSlideArrowBtn = this.generatePreviousSlideBtn();

    const nextSlideArrowBtn = this.generateNextSlideBtn();

    const navigationBtnsContainer = this.generateNavigationBtns();

    slidesAndArrowBtnsContainer.appendChild(slidesContainer);
    slidesAndArrowBtnsContainer.appendChild(previousSlideArrowBtn);
    slidesAndArrowBtnsContainer.appendChild(nextSlideArrowBtn);

    this.imageSlider.appendChild(slidesAndArrowBtnsContainer);
    this.imageSlider.appendChild(navigationBtnsContainer);

    return this.imageSlider;
  }
}
