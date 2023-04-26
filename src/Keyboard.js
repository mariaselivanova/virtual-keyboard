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

    // подпись
    const text = document.createElement('p');
    text.classList.add('text');
    text.textContent = 'Клавиатура создана в операционной системе Windows. Для переключения языка комбинация: левыe ctrl + alt';
    document.body.append(text);
  }
}
