import {
  keysEn, keysRu, shiftedKeys, shiftedKeysReversed,
} from './utils/keyLayout';

export default class KeyElements {
  constructor(keyboardInput) {
    this.keyLayout = [];
    this.lang = '';
    this.keyboardInput = keyboardInput;
    this.value = '';
    this.capsLock = false;
    this.virtualKey = null;
    this.isShiftPressed = false;
    this.isVirtualShiftPressed = false;
  }

  findAmongKeys(code) {
    const keyArr = document.querySelectorAll('.keyboard__key');
    this.virtualKey = Array.from(keyArr).find((k) => {
      const atribute = k.getAttribute('data-code');
      return code === atribute;
    });
    if (!this.virtualKey) return;
    this.virtualKey.classList.add('keyboard__key_act');
  }

  releaseKey(code) {
    const keyArr = document.querySelectorAll('.keyboard__key');
    this.virtualKey = Array.from(keyArr).find((k) => {
      const atribute = k.getAttribute('data-code');
      return code === atribute;
    });
    if (!this.virtualKey) return;
    this.virtualKey.classList.remove('keyboard__key_act');
  }

  addDefaultKeys(code) {
    this.findAmongKeys(code);

    if (this.virtualKey) {
      const cursorPos = this.keyboardInput.selectionStart;
      if (cursorPos === this.value.length) {
        this.value += this.virtualKey.textContent;
        this._updateInput();
        this.keyboardInput.setSelectionRange(cursorPos + 1, cursorPos + 1);
        this.keyboardInput.focus();
      } else {
        this.value = this.value.substring(0, cursorPos)
          + this.virtualKey.textContent + this.value.substring(cursorPos);
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
      const start = this.keyboardInput.selectionStart;
      const end = this.keyboardInput.selectionEnd;
      if (start !== end) {
        this.value = this.value.slice(0, start) + this.value.slice(end);
        this._updateInput();
        this.keyboardInput.focus();
        this.keyboardInput.setSelectionRange(start, start);
      } else if (start !== this.value.length) {
        this.value = this.value.slice(0, start) + this.value.slice(start + 1);
        this._updateInput();
        this.keyboardInput.focus();
        this.keyboardInput.setSelectionRange(start, start);
      }
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
      const cursorStart = this.keyboardInput.selectionStart;
      const cursorEnd = this.keyboardInput.selectionEnd;
      if (cursorStart === 0 && cursorEnd === 0) return;

      if (cursorStart !== cursorEnd) {
        this.value = this.value.substring(0, cursorStart) + this.value.substring(cursorEnd);
        this._updateInput();
        this.keyboardInput.setSelectionRange(cursorStart, cursorStart);
      } else {
        this.value = this.value.slice(0, cursorStart - 1) + this.value.slice(cursorStart);
        this._updateInput();
        this.keyboardInput.setSelectionRange(cursorStart - 1, cursorStart - 1);
      }
      this.keyboardInput.focus();
    }
  }

  handleCapsLock(code, repeat) {
    if (repeat) return;
    this.findAmongKeys(code);
    if (this.virtualKey) {
      this._toggleCapsLock();
      this.virtualKey.classList.toggle('keyboard__key--active');
    }
  }

  handleShift(code) {
    if (!this.isShiftPressed) {
      this.findAmongKeys(code);
      if (this.virtualKey) {
        this.isShiftPressed = true;
        const keys = document.querySelectorAll('.keyboard__key');
        keys.forEach((key) => {
          if (this.capsLock) {
            key.textContent = key.textContent.toLowerCase()
          } else {
            if (key.textContent.length === 1) {
              key.textContent = key.textContent.toUpperCase()
            }
          }
          const keyContent = key.textContent;
          if (this.lang === 'en' && Object.prototype.hasOwnProperty.call(shiftedKeys.en, keyContent)) {
            key.textContent = shiftedKeys.en[keyContent]
          } else if (this.lang === 'ru' && Object.prototype.hasOwnProperty.call(shiftedKeys.ru, keyContent)) {
            key.textContent = shiftedKeys.ru[keyContent]
          }
        });
      }
    }
  }

  releaseShift(code) {
    if (this.isShiftPressed && !this.isVirtualShiftPressed) {
      this.findAmongKeys(code);
      if (this.virtualKey) {
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
        if (this.capsLock) {
          keys.forEach((item) => {
            if (item.textContent.length === 1) {
              item.textContent = item.textContent.toUpperCase();
            }
          });
        } else {
          keys.forEach((item) => {
            if (item.textContent.length === 1) {
              item.textContent = item.textContent.toLowerCase();
            }
          });
        }
      }
    }
  }

  _pressShiftDown() {
    if (!this.isShiftPressed) {
      this.isShiftPressed = true;
      const keys = document.querySelectorAll('.keyboard__key');
      keys.forEach((key) => {
        const keyContent = key.textContent;
        if (this.lang === 'en' && Object.prototype.hasOwnProperty.call(shiftedKeys.en, keyContent)) {
          key.textContent = shiftedKeys.en[keyContent];
        } else if (this.lang === 'ru' && Object.prototype.hasOwnProperty.call(shiftedKeys.ru, keyContent)) {
          key.textContent = shiftedKeys.ru[keyContent];
        }
      });
      if (this.capsLock) {
        keys.forEach((item) => {
          if (item.textContent.length === 1) {
            item.textContent = item.textContent.toLowerCase();
          }
        });
      } else {
        keys.forEach((item) => {
          if (item.textContent.length === 1) {
            item.textContent = item.textContent.toUpperCase();
          }
        });
      }
    }
  }

  _pressShiftUp() {
    if (this.isShiftPressed) {
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
      if (this.capsLock) {
        keys.forEach((item) => {
          if (item.textContent.length === 1) {
            item.textContent = item.textContent.toUpperCase();
          }
        });
      } else {
        keys.forEach((item) => {
          if (item.textContent.length === 1) {
            item.textContent = item.textContent.toLowerCase();
          }
        });
      }
    }
  }

  _toggleCapsLock() {
    const keyArr = document.querySelectorAll('.keyboard__key');
    this.capsLock = !this.capsLock;
    keyArr.forEach((item) => {
      if (item.textContent.length === 1) {
        if (this.capsLock) {
          if (this.isShiftPressed) {
            item.textContent = item.textContent.toLowerCase();
          } else {
            item.textContent = item.textContent.toUpperCase();
          }
        } else if (this.isShiftPressed) {
          item.textContent = item.textContent.toUpperCase();
        } else {
          item.textContent = item.textContent.toLowerCase();
        }
      }
    });
  }

  toggleLanguage() {
    const storedLang = localStorage.getItem('lang');
    if (storedLang === 'en') {
      this.lang = 'ru';
      localStorage.setItem('lang', 'ru');
    } else if (storedLang === 'ru') {
      this.lang = 'en';
      localStorage.setItem('lang', 'en');
    }
    this.keyLayout = this.lang === 'en' ? keysEn : keysRu;
  }

  _updateInput() {
    this.keyboardInput.value = this.value;
    console.log(this.keyboardInput.value);
  }

  makeKeys() {
    const fragment = document.createDocumentFragment();
    if (!localStorage.getItem('lang') || localStorage.getItem('lang') === 'en') {
      this.keyLayout = keysEn;
      localStorage.setItem('lang', 'en');
      this.lang = 'en';
    } else {
      this.lang = 'ru';
      this.keyLayout = keysRu;
      localStorage.setItem('lang', 'ru');
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
            const cursorStart = this.keyboardInput.selectionStart;
            const cursorEnd = this.keyboardInput.selectionEnd;
            if (cursorStart === this.value.length) return;
            if (cursorStart === cursorEnd) {
              this.value = this.value.slice(0, cursorStart) + this.value.slice(cursorStart + 1);
            } else {
              this.value = this.value.substring(0, cursorStart) + this.value.substring(cursorEnd);
            }
            this._updateInput();
            this.keyboardInput.focus();
            this.keyboardInput.setSelectionRange(cursorStart, cursorStart);
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
            const selectionEnd = this.keyboardInput.selectionEnd;
            if (cursorPos === 0 && selectionEnd === 0) return;
            if (selectionEnd > cursorPos) {
              this.value = this.value.substring(0, cursorPos) + this.value.substring(selectionEnd);
              this._updateInput();
              this.keyboardInput.setSelectionRange(cursorPos, cursorPos);
              this.keyboardInput.focus();
            } else if (cursorPos === this.value.length) {
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

          keyElement.addEventListener('mousedown', () => {
            this._toggleCapsLock();
            keyElement.classList.toggle('keyboard__key--active');
          });
          break;

        case 'shiftLeft':
        case 'shiftRight':
          keyElement.classList.add('keyboard__key_wide');
          keyElement.textContent = 'Shift';
          keyElement.addEventListener('mousedown', () => {
            this._pressShiftDown();
            this.isVirtualShiftPressed = true;
          });
          keyElement.addEventListener('mouseup', () => {
            this._pressShiftUp();
            this.isVirtualShiftPressed = false;
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

        default:
          keyElement.textContent = this.capsLock ? key.key.toUpperCase() : key.key.toLowerCase();
          keyElement.addEventListener('click', () => {
            const cursorPos = this.keyboardInput.selectionStart;
            if (cursorPos === this.value.length) {
              this.value += keyElement.textContent;
              this._updateInput();
              this.keyboardInput.setSelectionRange(cursorPos + 1, cursorPos + 1);
              this.keyboardInput.focus();
            } else {
              this.value = this.value.substring(0, cursorPos)
                + keyElement.textContent + this.value.substring(cursorPos);
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
