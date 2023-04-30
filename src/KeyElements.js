import { keysEn, keysRu } from './utils/keyLayout';

export default class KeyElements {
  constructor(input) {
    this.keyLayout = [];
    this.input = input;
    this.virtualKey = null;
  }

  findAmongKeys(code) {
    const keyArr = document.querySelectorAll('.keyboard__key');
    this.virtualKey = Array.from(keyArr).find((key) => {
      const atribute = key.getAttribute('data-code');
      return code === atribute;
    });
  }

  pressKey(code) {
    this.findAmongKeys(code);
    if (!this.virtualKey) return;
    this.virtualKey.classList.add('keyboard__key_act');
  }

  releaseKey(code) {
    this.findAmongKeys(code);
    if (!this.virtualKey) return;
    this.virtualKey.classList.remove('keyboard__key_act');
  }

  addDefaultKeys(code) {
    this.pressKey(code);
    if (this.virtualKey) {
      this.input.handleAddDefaultKeys(this.virtualKey);
    }
  }

  handleEnterKey(code) {
    this.pressKey(code);
    if (this.virtualKey) {
      this.input.handleEnter();
    }
  }

  handleTabKey(code) {
    this.pressKey(code);
    if (this.virtualKey) {
      this.input.handleTab();
    }
  }

  handleDelKey(code) {
    this.pressKey(code);
    if (this.virtualKey) {
      this.input.handleDel();
    }
  }

  handleSpaceKey(code) {
    this.pressKey(code);
    if (this.virtualKey) {
      this.input.handleSpace();
    }
  }

  handleBackspaceKey(code) {
    this.pressKey(code);
    if (this.virtualKey) {
      this.input.handleBackspace();
    }
  }

  handleCapsLockKey(code, repeat) {
    if (repeat) return;
    this.pressKey(code);
    if (this.virtualKey) {
      this.input.toggleCapsLock();
      this.virtualKey.classList.toggle('keyboard__key--active');
    }
  }

  handleRightShiftKey(code) {
    this.pressKey(code);
    if (this.virtualKey) {
      this.input.handleRightShiftKeyDown();
    }
  }

  handleLeftShiftKey(code) {
    this.pressKey(code);
    if (this.virtualKey) {
      this.input.handleLeftShiftKeyDown();
    }
  }

  releaseShiftKey(code) {
    this.input.handleShiftKeyUp(code);
  }

  toggleLanguage() {
    const storedLang = localStorage.getItem('lang');
    if (storedLang === 'en') {
      localStorage.setItem('lang', 'ru');
      this.keyLayout = keysRu;
    } else if (storedLang === 'ru') {
      localStorage.setItem('lang', 'en');
      this.keyLayout = keysEn;
    }
  }

  makeKeys() {
    const fragment = document.createDocumentFragment();
    if (!localStorage.getItem('lang') || localStorage.getItem('lang') === 'en') {
      this.keyLayout = keysEn;
      localStorage.setItem('lang', 'en');
    } else {
      this.keyLayout = keysRu;
    }
    this.keyLayout.forEach((key) => {
      const keyElement = document.createElement('button');

      keyElement.setAttribute('type', 'button');
      keyElement.setAttribute('data-code', `${key.code}`);
      keyElement.classList.add('keyboard__key');

      switch (key.key) {
        case 'enter':
          keyElement.classList.add('keyboard__key_wide');
          keyElement.textContent = 'Enter';
          keyElement.addEventListener('click', () => {
            this.input.handleEnter();
          });
          break;

        case 'tab':
          keyElement.classList.add('keyboard__key_normal');
          keyElement.textContent = 'Tab';
          keyElement.addEventListener('click', () => {
            this.input.handleTab();
          });
          break;

        case 'del':
          keyElement.textContent = 'Del';
          keyElement.classList.add('keyboard__key_normal');
          keyElement.addEventListener('click', () => {
            this.input.handleDel();
          });
          break;

        case 'space':
          keyElement.classList.add('keyboard__key_super-wide');
          keyElement.addEventListener('click', () => {
            this.input.handleSpace();
          });
          break;

        case 'backspace':
          keyElement.classList.add('keyboard__key_wide');
          keyElement.textContent = 'Backspace';
          keyElement.addEventListener('click', () => {
            this.input.handleBackspace();
          });
          break;

        case 'caps':
          keyElement.classList.add('keyboard__key_wide', 'keyboard__key--activatable');
          keyElement.textContent = 'CapsLock';
          if (this.input.checkIfCaps()) {
            keyElement.classList.add('keyboard__key--active');
          }

          keyElement.addEventListener('click', () => {
            this.input.toggleCapsLock();
            keyElement.classList.toggle('keyboard__key--active');
          });
          break;

        case 'shiftRight':
        case 'shiftLeft':
          keyElement.classList.add('keyboard__key_wide');
          keyElement.textContent = 'Shift';
          keyElement.addEventListener('mousedown', () => {
            this.input.handleShiftMouseDown();
          });
          keyElement.addEventListener('mouseup', () => {
            if (key.key === 'shiftRight') {
              this.input.handleShiftMouseUpRight();
            } else {
              this.input.handleShiftMouseUpLeft();
            }
            keyElement.classList.remove('keyboard__key_act');
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
          keyElement.textContent = this.input.checkIfCaps()
            ? key.key.toUpperCase() : key.key.toLowerCase();
          keyElement.addEventListener('click', () => {
            this.input.handleAddDefaultKeys(keyElement);
          });
          break;
      }

      fragment.appendChild(keyElement);
    });

    return fragment;
  }
}
