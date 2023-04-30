import { keysEn, keysRu } from './utils/keyLayout';

export default class KeyElements {
  constructor(input) {
    this.keyLayout = [];
    this.lang = '';
    this.input = input;
    this.virtualKey = null;
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

  // Готово
  addDefaultKeys(code) {
    this.findAmongKeys(code);
    if (this.virtualKey) {
      this.input.handleAddDefaultKeys(this.virtualKey);
    }
  }

  // Готово
  handleEnterKey(code) {
    this.findAmongKeys(code);
    if (this.virtualKey) {
      this.input.handleEnter();
    }
  }

  // Готово
  handleTabKey(code) {
    this.findAmongKeys(code);
    if (this.virtualKey) {
      this.input.handleTab();
    }
  }

  // Готово
  handleDelKey(code) {
    this.findAmongKeys(code);
    if (this.virtualKey) {
      this.input.handleDel();
    }
  }

  // Готово
  handleSpaceKey(code) {
    this.findAmongKeys(code);
    if (this.virtualKey) {
      this.input.handleSpace();
    }
  }

  // Готово
  handleBackspaceKey(code) {
    this.findAmongKeys(code);
    if (this.virtualKey) {
      this.input.handleBackspace();
    }
  }

  // Готово
  handleCapsLockKey(code, repeat) {
    if (repeat) return;
    this.findAmongKeys(code);
    if (this.virtualKey) {
      this.input.toggleCapsLock();
      this.virtualKey.classList.toggle('keyboard__key--active');
    }
  }

  handleRightShiftKey(code) {
    this.findAmongKeys(code);
    if (this.virtualKey) {
      this.input.handleRightShiftKeyDown();
    }
  }

  handleLeftShiftKey(code) {
    this.findAmongKeys(code);
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
      this.lang = 'ru';
      localStorage.setItem('lang', 'ru');
    } else if (storedLang === 'ru') {
      this.lang = 'en';
      localStorage.setItem('lang', 'en');
    }
    this.keyLayout = this.lang === 'en' ? keysEn : keysRu;
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
            this.eventHandler.handleEnter();
          });
          break;

        case 'tab':
          keyElement.classList.add('keyboard__key_normal');
          keyElement.textContent = 'Tab';
          keyElement.addEventListener('click', () => {
            this.eventHandler.handleTab();
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

          keyElement.addEventListener('mousedown', () => {
            this.input.toggleCapsLock();
            keyElement.classList.toggle('keyboard__key--active');
          });
          break;

        case 'shiftRight':
          keyElement.classList.add('keyboard__key_wide');
          keyElement.textContent = 'Shift';
          keyElement.addEventListener('mousedown', () => {
            this.input.handleShiftMouseDown();
          });
          keyElement.addEventListener('mouseup', () => {
            this.input.handleShiftMouseUpRight();
            keyElement.classList.remove('keyboard__key_act');
          });
          break;
        case 'shiftLeft':
          keyElement.classList.add('keyboard__key_wide');
          keyElement.textContent = 'Shift';
          keyElement.addEventListener('mousedown', () => {
            this.input.handleShiftMouseDown();
          });
          keyElement.addEventListener('mouseup', () => {
            this.input.handleShiftMouseUpLeft();
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

      if (insertLineBreak) {
        fragment.appendChild(document.createElement('br'));
      }
    });

    return fragment;
  }
}
