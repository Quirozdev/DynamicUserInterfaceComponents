import DropDownMenuComponent from './components/DropDownMenuComponent';

const dropdownMenu = new DropDownMenuComponent('Hola');
dropdownMenu.addItem('test1');
dropdownMenu.addItem('test2');
dropdownMenu.addItem('test3');

document.body.appendChild(dropdownMenu.getDOMComponent());
