import {
  keysEn, keysRu, shiftedKeys, shiftedKeysReversed,
} from './utils/keyLayout';

export default class KeyElements {
  constructor(keyboardInput) {
    this.keyLayout = [];
    this.lang = 'en';
    this.keyboardInput = keyboardInput;
    this.value = '';
    this.capsLock = false;
    this.virtualKey = null;
    this.isCapsPressed = false;
    this.isShiftPressed = false;
  }

  findAmongKeys(code) {
    const keyArr = document.querySelectorAll('.keyboard__key');
    this.virtualKey = Array.from(keyArr).find((k) => {
      const atribute = k.getAttribute('data-code');
      return code === atribute;
    });
  }

  addDefaultKeys(code) {
    this.findAmongKeys(code);

    if (this.virtualKey) {
      const cursorPos = this.keyboardInput.selectionStart;
      if (cursorPos === this.value.length) {
        this.value += this.capsLock ? this.virtualKey.textContent.toUpperCase() : this.virtualKey.textContent.toLowerCase();
        this._updateInput();
        this.keyboardInput.setSelectionRange(cursorPos + 1, cursorPos + 1);
        this.keyboardInput.focus();
      } else {
        if (this.capsLock) {
          this.value = this.value.substring(0, cursorPos)
            + this.virtualKey.textContent.toUpperCase() + this.value.substring(cursorPos);
        } else {
          this.value = this.value.substring(0, cursorPos)
            + this.virtualKey.textContent.toLowerCase() + this.value.substring(cursorPos);
        }
        this._updateInput();
        this.keyboardInput.setSelectionRange(cursorPos + 1, cursorPos + 1);
        this.keyboardInput.focus();
      }
    }
  }

  handleEnter(code) {
    this.findAmongKeys(code);
    if (this.virtualKey) {
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
    }
  }

  handleTab(code) {
    this.findAmongKeys(code);
    if (this.virtualKey) {
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
    }
  }

  handleDel(code) {
    this.findAmongKeys(code);
    if (this.virtualKey) {
      const cursorPos = this.keyboardInput.selectionStart;
      if (cursorPos === this.value.length) return;
      this.value = this.value.slice(0, cursorPos) + this.value.slice(cursorPos + 1);
      this._updateInput();
      this.keyboardInput.focus();
      this.keyboardInput.setSelectionRange(cursorPos, cursorPos);
    }
  }

  handleSpace(code) {
    this.findAmongKeys(code);
    if (this.virtualKey) {
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
    }
  }

  handleBackspace(code) {
    this.findAmongKeys(code);
    if (this.virtualKey) {
      const cursorPos = this.keyboardInput.selectionStart;
      if (cursorPos === 0) return;
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
    }
  }

  handleCapsLock(code) {
    this.findAmongKeys(code);
    if (this.virtualKey) {
      if (!this.isCapsPressed) {
        if (this.capsLock) {
          this.virtualKey.classList.add('keyboard__key--active');
        }
        this._toggleCapsLock();
        this.virtualKey.classList.toggle('keyboard__key--active');
        this.isCapsPressed = true;
      }
    }
  }

  releaseCapslock(code) {
    this.findAmongKeys(code);
    if (this.virtualKey) {
      this.isCapsPressed = false;
    }
  }

  handleShift(code) {
    this.findAmongKeys(code);
    if (this.virtualKey) {
      if (!this.isShiftPressed) {
        this._toggleCapsLock();
        this.isShiftPressed = true;
        const keys = document.querySelectorAll('.keyboard__key');
        keys.forEach((key) => {
          const keyContent = key.textContent;
          if (this.lang === 'en' && shiftedKeys.en.hasOwnProperty(keyContent)) {
            key.textContent = shiftedKeys.en[keyContent];
          } else if (this.lang === 'ru' && shiftedKeys.ru.hasOwnProperty(keyContent)) {
            key.textContent = shiftedKeys.ru[keyContent];
          }
        });
      }
    }
  }

  releaseShift(code) {
    this.findAmongKeys(code);
    if (this.virtualKey) {
      this._toggleCapsLock();
      this.isShiftPressed = false;
      const keys = document.querySelectorAll('.keyboard__key');
      keys.forEach((key) => {
        const keyContent = key.textContent;
        if (this.lang === 'en' && shiftedKeysReversed.en.hasOwnProperty(keyContent)) {
          key.textContent = shiftedKeysReversed.en[keyContent];
        } else if (this.lang === 'ru' && shiftedKeysReversed.ru.hasOwnProperty(keyContent)) {
          key.textContent = shiftedKeysReversed.ru[keyContent];
        }
      });
    }
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
    console.log(this.keyboardInput.value);
  }

  makeKeys() {
    const fragment = document.createDocumentFragment();
    if (this.lang === 'en') {
      this.keyLayout = keysEn;
    } else {
      this.keyLayout = keysRu;
    }
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
            if (cursorPos === 0) return;
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
              if (this.capsLock) {
                this.value += keyElement.textContent.toUpperCase();
              } else {
                this.value += keyElement.textContent.toLowerCase();
              }

              this._updateInput();
              this.keyboardInput.setSelectionRange(cursorPos + 1, cursorPos + 1);
              this.keyboardInput.focus();
            } else {
              if (this.capsLock) {
                this.value = this.value.substring(0, cursorPos)
                  + keyElement.textContent.toUpperCase() + this.value.substring(cursorPos);
              } else {
                this.value = this.value.substring(0, cursorPos)
                  + keyElement.textContent.toUpperCase() + this.value.substring(cursorPos);
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
