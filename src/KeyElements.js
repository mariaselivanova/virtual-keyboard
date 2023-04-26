import { keysEn, keysRu } from './utils/keyLayout';

export default class KeyElements {
  constructor(keyboardInput) {
    this.keyLayout = [];
    this.lang = 'en';
    this.keyboardInput = keyboardInput;
    this.value = '';
    this.capsLock = false;
  }

  _toggleCapsLock() {
    const keyArr = document.querySelectorAll('.keyboard__key');
    this.capsLock = !this.capsLock;
    keyArr.forEach((item) => {
      if (item.textContent.length === 1) {
        if (this.capsLock) {
          item.textContent = item.textContent.toUpperCase();
        } else {
          item.textContent = item.textContent.toLowerCase();
        }
      }
    });
  }

  toggleLanguage() {
    this.lang = this.lang === 'en' ? 'ru' : 'en';
    this.keyLayout = this.lang === 'en' ? keysRu : keysEn;
  }

  _updateInput() {
    this.keyboardInput.value = this.value;
  }

  makeKeys() {
    const fragment = document.createDocumentFragment();
    this.keyLayout = this.lang === 'en' ? keysEn : keysRu;
    this.keyLayout.forEach((key) => {
      const keyElement = document.createElement('button');
      const insertLineBreak = ['backspace', 'del', 'enter', 'shiftRight', 'ctrlRight'].indexOf(key.item) !== -1;

      keyElement.setAttribute('type', 'button');
      keyElement.setAttribute('data-code', `${key.code}`);
      keyElement.classList.add('keyboard__key');

      switch (key.key) {
        case 'enter':
          keyElement.classList.add('keyboard__key_wide');
          keyElement.textContent = 'Enter';
          keyElement.addEventListener('click', () => {
            const cursorPos = this.keyboardInput.selectionStart;
            if (cursorPos === this.value.length) {
              this.value += '\n';
              this._updateInput();
              this.keyboardInput.setSelectionRange(cursorPos + 1, cursorPos + 1);
              this.keyboardInput.focus();
            } else {
              this.value = `${this.value.substring(0, cursorPos)}\n${this.value.substring(cursorPos)}`;
              this._updateInput();
              this.keyboardInput.setSelectionRange(cursorPos + 1, cursorPos + 1);
              this.keyboardInput.focus();
            }
          });
          break;

        case 'tab':
          keyElement.classList.add('keyboard__key_medium');
          keyElement.textContent = 'Tab';
          keyElement.addEventListener('click', () => {
            const cursorPos = this.keyboardInput.selectionStart;
            if (cursorPos === this.value.length) {
              this.value += '\t';
              this._updateInput();
              this.keyboardInput.setSelectionRange(cursorPos + 1, cursorPos + 1);
              this.keyboardInput.focus();
            } else {
              this.value = `${this.value.substring(0, cursorPos)}\t${this.value.substring(cursorPos)}`;
              this._updateInput();
              this.keyboardInput.setSelectionRange(cursorPos + 1, cursorPos + 1);
              this.keyboardInput.focus();
            }
          });
          break;

        case 'del':
          keyElement.textContent = 'Del';
          keyElement.classList.add('keyboard__key_medium');
          keyElement.addEventListener('click', () => {
            const cursorPos = this.keyboardInput.selectionStart;
            if (cursorPos === this.value.length) return;
            this.value = this.value.slice(0, cursorPos) + this.value.slice(cursorPos + 1);
            this._updateInput();
            this.keyboardInput.focus();
            this.keyboardInput.setSelectionRange(cursorPos, cursorPos);
          });
          break;

        case 'space':
          keyElement.classList.add('keyboard__key_super-wide');
          keyElement.addEventListener('click', () => {
            const cursorPos = this.keyboardInput.selectionStart;
            if (cursorPos === this.value.length) {
              this.value += ' ';
              this._updateInput();
              this.keyboardInput.setSelectionRange(cursorPos + 1, cursorPos + 1);
              this.keyboardInput.focus();
            } else {
              this.value = `${this.value.substring(0, cursorPos)} ${this.value.substring(cursorPos)}`;
              this._updateInput();
              this.keyboardInput.setSelectionRange(cursorPos + 1, cursorPos + 1);
              this.keyboardInput.focus();
            }
          });
          break;

        case 'backspace':
          keyElement.classList.add('keyboard__key_wide');
          keyElement.textContent = 'Backspace';
          keyElement.addEventListener('click', () => {
            const cursorPos = this.keyboardInput.selectionStart;
            if (cursorPos === this.value.length) {
              this.value = this.value.slice(0, this.value.length - 1);
              this._updateInput();
              this.keyboardInput.setSelectionRange(cursorPos - 1, cursorPos - 1);
              this.keyboardInput.focus();
            } else {
              this.value = this.value.substring(0, cursorPos - 1) + this.value.substring(cursorPos);
              this._updateInput();
              this.keyboardInput.setSelectionRange(cursorPos - 1, cursorPos - 1);
              this.keyboardInput.focus();
            }
          });
          break;

        case 'caps':
          keyElement.classList.add('keyboard__key_wide', 'keyboard__key--activatable');
          keyElement.textContent = 'CapsLock';
          if (this.capsLock) {
            keyElement.classList.add('keyboard__key--active');
          }

          keyElement.addEventListener('click', () => {
            this._toggleCapsLock();
            keyElement.classList.toggle('keyboard__key--active');
          });
          break;

        case 'shiftLeft':
        case 'shiftRight':
          keyElement.classList.add('keyboard__key_wide');
          keyElement.textContent = 'Shift';

          keyElement.addEventListener('mousedown', () => {
            this._toggleCapsLock();
          });
          keyElement.addEventListener('mouseup', () => {
            this._toggleCapsLock();
          });
          break;

        case 'ctrlLeft':
        case 'ctrlRight':
          keyElement.textContent = 'Ctrl';
          break;

        case 'altLeft':
        case 'altRight':
          keyElement.textContent = 'Alt';
          break;

        case 'win':
          keyElement.textContent = 'Win';
          break;

        case 'up':
          keyElement.textContent = '▲';
          keyElement.addEventListener('click', () => {
            const cursorPos = this.keyboardInput.selectionStart;
            if (cursorPos === this.value.length) {
              this.value += '▲';
              this._updateInput();
              this.keyboardInput.setSelectionRange(cursorPos + 1, cursorPos + 1);
              this.keyboardInput.focus();
            } else {
              this.value = `${this.value.substring(0, cursorPos)
              }▲${this.value.substring(cursorPos)}`;
              this._updateInput();
              this.keyboardInput.setSelectionRange(cursorPos + 1, cursorPos + 1);
              this.keyboardInput.focus();
            }
          });
          break;
        case 'down':
          keyElement.textContent = '▼';
          keyElement.addEventListener('click', () => {
            const cursorPos = this.keyboardInput.selectionStart;
            if (cursorPos === this.value.length) {
              this.value += '▼';
              this._updateInput();
              this.keyboardInput.setSelectionRange(cursorPos + 1, cursorPos + 1);
              this.keyboardInput.focus();
            } else {
              this.value = `${this.value.substring(0, cursorPos)
              }▼${this.value.substring(cursorPos)}`;
              this._updateInput();
              this.keyboardInput.setSelectionRange(cursorPos + 1, cursorPos + 1);
              this.keyboardInput.focus();
            }
          });
          break;
        case 'left':
          keyElement.textContent = '◄';
          keyElement.addEventListener('click', () => {
            const cursorPos = this.keyboardInput.selectionStart;
            if (cursorPos === this.value.length) {
              this.value += '◄';
              this._updateInput();
              this.keyboardInput.setSelectionRange(cursorPos + 1, cursorPos + 1);
              this.keyboardInput.focus();
            } else {
              this.value = `${this.value.substring(0, cursorPos)
              }◄${this.value.substring(cursorPos)}`;
              this._updateInput();
              this.keyboardInput.setSelectionRange(cursorPos + 1, cursorPos + 1);
              this.keyboardInput.focus();
            }
          });
          break;
        case 'right':
          keyElement.textContent = '►';
          keyElement.addEventListener('click', () => {
            const cursorPos = this.keyboardInput.selectionStart;
            if (cursorPos === this.value.length) {
              this.value += '►';
              this._updateInput();
              this.keyboardInput.setSelectionRange(cursorPos + 1, cursorPos + 1);
              this.keyboardInput.focus();
            } else {
              this.value = `${this.value.substring(0, cursorPos)
              }►${this.value.substring(cursorPos)}`;
              this._updateInput();
              this.keyboardInput.setSelectionRange(cursorPos + 1, cursorPos + 1);
              this.keyboardInput.focus();
            }
          });
          break;

        default:
          keyElement.textContent = this.capsLock ? key.key.toUpperCase() : key.key.toLowerCase();
          keyElement.addEventListener('click', () => {
            const cursorPos = this.keyboardInput.selectionStart;
            if (cursorPos === this.value.length) {
              this.value += this.capsLock ? key.key.toUpperCase() : key.key.toLowerCase();
              this._updateInput();
              this.keyboardInput.setSelectionRange(cursorPos + 1, cursorPos + 1);
              this.keyboardInput.focus();
            } else {
              if (this.capsLock) {
                this.value = this.value.substring(0, cursorPos)
                  + key.key.toUpperCase() + this.value.substring(cursorPos);
              } else {
                this.value = this.value.substring(0, cursorPos)
                  + key.key.toLowerCase() + this.value.substring(cursorPos);
              }
              this._updateInput();
              this.keyboardInput.setSelectionRange(cursorPos + 1, cursorPos + 1);
              this.keyboardInput.focus();
            }
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
}
