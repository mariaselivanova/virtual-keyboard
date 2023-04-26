import './styles/index.css';

export default class Keyboard {
  constructor(keysFragment) {
    this.container = null;
    this.keys = keysFragment;
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
