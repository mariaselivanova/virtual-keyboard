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

    const keyArr = document.querySelectorAll('.keyboard__key');
    // подсветка клавиш при нажатии на обычную клавиатуру.
    document.addEventListener('keydown', (event) => {
      const { code } = event;
      const virtualKey = Array.from(keyArr).find((k) => {
        const atribute = k.getAttribute('data-code');
        return code === atribute;
      });

      if (virtualKey) {
        virtualKey.classList.add('keyboard__key_act');
      }
    });

    document.addEventListener('keyup', (event) => {
      const { code } = event;
      const virtualKey = Array.from(keyArr).find((k) => {
        const atribute = k.getAttribute('data-code');
        return code === atribute;
      });

      if (virtualKey) {
        virtualKey.classList.remove('keyboard__key_act');
      }
    });
  }

  updateLanguage(newKeys) {
    const container = document.querySelector('.keyboard');
    container.remove();
    this.keys = newKeys;
    this.init();
  }
}
