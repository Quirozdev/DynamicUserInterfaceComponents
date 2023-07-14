import DropDownMenuComponent from './components/DropDownMenuComponent.js';
import { ImageSliderComponent } from './components/ImageSliderComponent.js';

const dropdownMenu = new DropDownMenuComponent('Dropdown');
dropdownMenu.addItem('test1');
dropdownMenu.addItem('test2');
dropdownMenu.addItem('test3');

document.body.appendChild(dropdownMenu.getDOMComponent());

const imageSlider = new ImageSliderComponent(
  'https://cdn.pixabay.com/photo/2023/07/05/04/45/european-shorthair-8107433_1280.jpg',
  'cat'
);

imageSlider.addSlide(
  'https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_1280.jpg',
  'cat2'
);
imageSlider.addSlide(
  'https://cdn.pixabay.com/photo/2019/11/08/11/56/kitten-4611189_1280.jpg',
  'cat3'
);

document.body.appendChild(imageSlider.render());
