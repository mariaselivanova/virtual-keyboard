import { shiftedKeys, shiftedKeysReversed } from './utils/keyLayout';

export default class Input {
  constructor(keyboardInput) {
    this.keyboardInput = keyboardInput;
    this.value = '';
    this.capsLock = false;
    this.isLeftShiftPressed = false;
    this.isRightShiftPressed = false;
    this.isVirtualShiftPressed = false;
    this.keys = null;
  }

  checkIfCaps() {
    return this.capsLock;
  }

  checkIfShift() {
    return this.isLeftShiftPressed
      || this.isRightShiftPressed || this.isVirtualShiftPressed;
  }

  checkWhichShift() {
    if (this.isLeftShiftPressed) {
      const leftShift = document.querySelector('[data-code="ShiftLeft"]');
      leftShift.classList.add('keyboard__key_act');
    }

    if (this.isRightShiftPressed) {
      const rightShift = document.querySelector('[data-code="ShiftRight"]');
      rightShift.classList.add('keyboard__key_act');
    }
  }

  findKey(code) {
    this.keys = document.querySelectorAll('.keyboard__key');
    const k = Array.from(this.keys).find((key) => {
      const atribute = key.getAttribute('data-code');
      return code === atribute;
    });
    k.classList.add('keyboard__key_act');
  }

  updateInput() {
    this.keyboardInput.value = this.value;
  }

  handleEnter() {
    const start = this.keyboardInput.selectionStart;
    if (start === this.value.length) {
      this.value += '\n';
    } else {
      this.value = `${this.value.substring(0, start)}\n${this.value.substring(start)}`;
    }
    this.updateInput();
    this.keyboardInput.setSelectionRange(start + 1, start + 1);
    this.keyboardInput.focus();
  }

  handleDel() {
    const start = this.keyboardInput.selectionStart;
    const end = this.keyboardInput.selectionEnd;
    if (start !== end) {
      this.value = this.value.slice(0, start) + this.value.slice(end);
    } else if (start !== this.value.length) {
      this.value = this.value.slice(0, start) + this.value.slice(start + 1);
    }
    this.updateInput();
    this.keyboardInput.setSelectionRange(start, start);
    this.keyboardInput.focus();
  }

  handleTab() {
    const start = this.keyboardInput.selectionStart;
    if (start === this.value.length) {
      this.value += '\t';
    } else {
      this.value = `${this.value.substring(0, start)}\t${this.value.substring(start)}`;
    }
    this.updateInput();
    this.keyboardInput.setSelectionRange(start + 1, start + 1);
    this.keyboardInput.focus();
  }

  handleSpace() {
    const start = this.keyboardInput.selectionStart;
    if (start === this.value.length) {
      this.value += ' ';
    } else {
      this.value = `${this.value.substring(0, start)} ${this.value.substring(start)}`;
    }
    this.updateInput();
    this.keyboardInput.setSelectionRange(start + 1, start + 1);
    this.keyboardInput.focus();
  }

  handleAddDefaultKeys(key) {
    const start = this.keyboardInput.selectionStart;
    if (start === this.value.length) {
      this.value += key.textContent;
    } else {
      this.value = this.value.substring(0, start)
        + key.textContent + this.value.substring(start);
    }
    this.updateInput();
    this.keyboardInput.setSelectionRange(start + 1, start + 1);
    this.keyboardInput.focus();
  }

  handleBackspace() {
    const start = this.keyboardInput.selectionStart;
    const end = this.keyboardInput.selectionEnd;
    if (start === 0 && end === 0) return;

    if (start !== end) {
      this.value = this.value.substring(0, start) + this.value.substring(end);
      this.updateInput();
      this.keyboardInput.setSelectionRange(start, start);
    } else {
      this.value = this.value.slice(0, start - 1) + this.value.slice(start);
      this.updateInput();
      this.keyboardInput.setSelectionRange(start - 1, start - 1);
    }
    this.keyboardInput.focus();
  }

  toggleCapsLock() {
    const keyArr = document.querySelectorAll('.keyboard__key');
    this.capsLock = !this.capsLock;
    const isShiftPressed = this.isLeftShiftPressed
      || this.isRightShiftPressed || this.isVirtualShiftPressed;
    keyArr.forEach((item) => {
      const key = item;
      if (key.textContent.length === 1) {
        if (this.capsLock) {
          if (isShiftPressed) {
            key.textContent = key.textContent.toLowerCase();
          } else {
            key.textContent = key.textContent.toUpperCase();
          }
        } else if (isShiftPressed) {
          key.textContent = key.textContent.toUpperCase();
        } else {
          key.textContent = key.textContent.toLowerCase();
        }
      }
    });
  }

  handleShiftDown() {
    const keys = document.querySelectorAll('.keyboard__key');
    const lang = localStorage.getItem('lang');
    keys.forEach((item) => {
      const key = item;
      if (this.capsLock && key.textContent.length === 1) {
        key.textContent = key.textContent.toLowerCase();
      } else if (key.textContent.length === 1) {
        key.textContent = key.textContent.toUpperCase();
      }
      if (lang === 'en' && Object.prototype.hasOwnProperty.call(shiftedKeys.en, key.textContent)) {
        key.textContent = shiftedKeys.en[key.textContent];
      } else if (lang === 'ru' && Object.prototype.hasOwnProperty.call(shiftedKeys.ru, key.textContent)) {
        key.textContent = shiftedKeys.ru[key.textContent];
      }
    });
  }

  handleShiftUp() {
    const keys = document.querySelectorAll('.keyboard__key');
    const lang = localStorage.getItem('lang');
    keys.forEach((item) => {
      const key = item;
      if (this.capsLock && key.textContent.length === 1) {
        key.textContent = key.textContent.toUpperCase();
      } else if (key.textContent.length === 1) {
        key.textContent = key.textContent.toLowerCase();
      }
      if (lang === 'en' && Object.prototype.hasOwnProperty.call(shiftedKeysReversed.en, key.textContent)) {
        key.textContent = shiftedKeysReversed.en[key.textContent];
      } else if (lang === 'ru' && Object.prototype.hasOwnProperty.call(shiftedKeysReversed.ru, key.textContent)) {
        key.textContent = shiftedKeysReversed.ru[key.textContent];
      }
    });
  }

  handleRightShiftKeyDown(code) {
    if (!this.isLeftShiftPressed && !this.isRightShiftPressed && !this.isVirtualShiftPressed) {
      this.isRightShiftPressed = true;
      this.handleShiftDown();
      this.findKey(code);
    }
  }

  handleLeftShiftKeyDown(code) {
    if (!this.isLeftShiftPressed && !this.isVirtualShiftPressed && !this.isRightShiftPressed) {
      this.isLeftShiftPressed = true;
      this.handleShiftDown();
      this.findKey(code);
    }
  }

  handleShiftKeyUp(code) {
    if ((this.isLeftShiftPressed && code === 'ShiftLeft' && !this.isVirtualShiftPressed)
      || (this.isRightShiftPressed && code === 'ShiftRight' && !this.isVirtualShiftPressed)) {
      if (this.isRightShiftPressed) {
        this.isRightShiftPressed = false;
      } else if (this.isLeftShiftPressed) {
        this.isLeftShiftPressed = false;
      }
      this.handleShiftUp();
    }
  }

  handleShiftMouseDown() {
    if (!this.isVirtualShiftPressed && !this.isLeftShiftPressed && !this.isRightShiftPressed) {
      this.isVirtualShiftPressed = true;
      this.handleShiftDown();
    }
  }

  handleShiftMouseUp(key) {
    if (this.isVirtualShiftPressed && !this.isLeftShiftPressed && !this.isRightShiftPressed) {
      this.isVirtualShiftPressed = false;
      this.handleShiftUp();
    } else if (!this.isVirtualShiftPressed && this.isLeftShiftPressed && key === 'shiftLeft') {
      this.isLeftShiftPressed = false;
      this.handleShiftUp();
    } else if (!this.isVirtualShiftPressed && this.isRightShiftPressed && key === 'shiftRight') {
      this.isRightShiftPressed = false;
      this.handleShiftUp();
    }
  }
}
