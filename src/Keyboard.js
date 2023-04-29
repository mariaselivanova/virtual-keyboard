export default class Keyboard {
  constructor(keysFragment) {
    this.container = null;
    this.keys = keysFragment;
    this.isLeftShiftPressed = false;
    this.isRightShiftPressed = false;
    this.shiftKeys = {
      ShiftLeft: false,
      ShiftRight: false,
    };
  }

  init() {
    this.container = document.createElement('div');
    this.container.classList.add('keyboard');
    this.container.append(this.keys);
    document.body.append(this.container);
  }

  updateLanguage(newKeys) {
    const container = document.querySelector('.keyboard');
    container.remove();
    this.keys = newKeys;
    this.init();
  }
}
