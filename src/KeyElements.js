import { keysEn, keysRu } from './utils/keyLayout';

export default class KeyElements {
  constructor(input) {
    this.keyLayout = [];
    this.input = input;
    this.virtualKey = null;
    this.pressedKeys = [];
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
    if (this.virtualKey.innerHTML === 'Shift') {
      this.virtualKey.classList.remove('keyboard__key_active');
      return;
    }
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
    this.input.handleRightShiftKeyDown(code);
  }

  handleLeftShiftKey(code) {
    this.input.handleLeftShiftKeyDown(code);
  }

  releaseShiftKey() {
    this.input.handleShiftKeyUp();
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
    const pressedKeyCodes = this.pressedKeys.map((key) => key.code);
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

      if (pressedKeyCodes.includes(key.code)) {
        keyElement.classList.add('keyboard__key_act');
      }
      keyElement.addEventListener('mousedown', () => {
        keyElement.classList.add('keyboard__key_act');
        this.pressedKeys.push(key);
      });
      keyElement.addEventListener('mouseup', () => {
        keyElement.classList.remove('keyboard__key_act');
        const index = this.pressedKeys.findIndex((pressedKey) => pressedKey.code === key.code);
        if (index > -1) {
          this.pressedKeys.splice(index, 1);
        }
      });
      keyElement.addEventListener('mouseleave', () => {
        keyElement.classList.remove('keyboard__key_act');
        const index = this.pressedKeys.findIndex((pressedKey) => pressedKey.code === key.code);
        if (index > -1) {
          this.pressedKeys.splice(index, 1);
        }
      });
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
          keyElement.classList.add('keyboard__key_wide');
          keyElement.textContent = 'Shift';
          if (this.input.checkIfVirtualShiftRight()) {
            keyElement.classList.add('keyboard__key_shift_active');
          }
          keyElement.addEventListener('click', () => {
            this.input.toggleShiftRight(keyElement);
          });
          break;
        case 'shiftLeft':
          keyElement.classList.add('keyboard__key_wide');
          keyElement.textContent = 'Shift';
          if (this.input.checkIfVirtualShiftLeft()) {
            keyElement.classList.add('keyboard__key_shift_active');
          }
          keyElement.addEventListener('click', () => {
            this.input.toggleShiftLeft(keyElement);
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
