/* eslint-disable no-param-reassign */
import './styles/index.css';
import { keyLayoutEn, keyLayoutRu } from './utils/keyLayout';

export default class Keyboard {
  constructor() {
    this.alphabet = keyLayoutEn;
    this.container = null;
    this.keys = [];
    this.value = '';
    this.capsLock = false;
    this.keyboardInput = document.querySelector('.keyboard-input');
  }

  init() {
    this.container = document.createElement('div');
    this.container.classList.add('keyboard');
    this.container.append(this._makeKey());
    this.keys = this.container.querySelectorAll('.keyboard__key');
    document.body.append(this.container);
  }

  updateInput() {
    this.keyboardInput.value = this.value;
  }

  _makeKey() {
    const fragment = document.createDocumentFragment();
    this.alphabet.forEach((key) => {
      const keyElement = document.createElement('button');
      const insertLineBreak = ['backspace', 'del', 'enter', 'shiftRight', 'ctrlRight'].indexOf(key) !== -1;

      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key');

      switch (key) {
        case 'enter':
          keyElement.classList.add('keyboard__key_wide');
          keyElement.innerHTML = 'Enter';
          keyElement.addEventListener('click', () => {
            this.value += '\n';
            this.updateInput();
          });
          break;

        case 'space':
          keyElement.classList.add('keyboard__key_super-wide');
          keyElement.addEventListener('click', () => {
            this.value += ' ';
            this.updateInput();
          });
          break;

        case 'backspace':
          keyElement.classList.add('keyboard__key_wide');
          keyElement.textContent = 'Backspace';
          keyElement.addEventListener('click', () => {
            this.value = this.value.slice(0, this.value.length - 1);
            this.updateInput();
          });
          break;

        case 'caps':
          keyElement.classList.add('keyboard__key_wide');
          keyElement.textContent = 'CapsLock';

          keyElement.addEventListener('click', () => {
            this._toggleCapsLock();
          });
          break;

        default:
          keyElement.textContent = key;
          keyElement.addEventListener('click', () => {
            this.value += this.capsLock ? key.toUpperCase() : key.toLowerCase();
            this.updateInput();
          });
          break;
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement('br'));
      }
    });

    return fragment;
  }

  _toggleCapsLock() {
    this.capsLock = !this.capsLock;
    this.keys.forEach((item) => {
      if (item.textContent.length === 1) {
        if (this.capsLock) {
          item.textContent = item.textContent.toUpperCase();
        } else {
          item.textContent = item.textContent.toLowerCase();
        }
      }
    });
  }
}
