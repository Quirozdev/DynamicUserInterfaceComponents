import './DropDownMenuComponent.css';

class DropDownMenuComponent {
  static TRIANGLE_DOWN_SVG_PATH = 'M1 3H23L12 22';
  static TRIANGLE_UP_SVG_PATH = 'M1,21H23L12,2';

  constructor(dropDownMenuBtnText) {
    this.dropDownMenuContainer = document.createElement('div');
    this.dropDownMenuContainer.classList.add('dropdown-menu-container');

    this.dropDownMenuBtn = document.createElement('button');
    this.dropDownMenuBtn.classList.add('dropdown-menu-btn');
    this.dropDownMenuBtn.addEventListener('click', () => {
      const isDropDownMenuBtnDisplayed =
        this.dropDownMenuBtn.classList.toggle('collapsed');
      const newPathDirection = isDropDownMenuBtnDisplayed
        ? this.constructor.TRIANGLE_UP_SVG_PATH
        : this.constructor.TRIANGLE_DOWN_SVG_PATH;
      this.changeTriangleIcon(newPathDirection);
      this.toggleDropDownMenuItemsVisibility();
    });

    this.btnTextContainer = document.createElement('span');
    this.btnTextContainer.textContent = dropDownMenuBtnText;

    this.triangleSvg = this.createTriangleSvg(
      this.constructor.TRIANGLE_DOWN_SVG_PATH
    );

    this.dropDownMenuItemsContainer = document.createElement('div');
    this.dropDownMenuItemsContainer.classList.add(
      'dropdown-menu-items-container'
    );

    this.dropDownMenuBtn.appendChild(this.btnTextContainer);
    this.dropDownMenuBtn.appendChild(this.triangleSvg);

    this.dropDownMenuContainer.appendChild(this.dropDownMenuBtn);
    this.dropDownMenuContainer.appendChild(this.dropDownMenuItemsContainer);
  }

  getDOMComponent() {
    return this.dropDownMenuContainer;
  }

  toggleDropDownMenuItemsVisibility() {
    this.dropDownMenuItemsContainer.classList.toggle('visible');
  }

  createTriangleSvg(iconPathDirection) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');

    const iconPath = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    );
    iconPath.classList.add('icon-path');
    iconPath.setAttribute('d', iconPathDirection);

    svg.appendChild(iconPath);

    return svg;
  }

  changeTriangleIcon(newPathDirection) {
    const iconPath = this.dropDownMenuBtn.querySelector('.icon-path');
    iconPath.setAttribute('d', newPathDirection);
  }

  addItem(itemName) {
    const itemBtn = document.createElement('button');
    itemBtn.textContent = itemName;
    itemBtn.classList.add('item');
    this.dropDownMenuItemsContainer.appendChild(itemBtn);
  }
}

export default DropDownMenuComponent;
