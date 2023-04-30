import { shiftedKeys, shiftedKeysReversed } from './utils/keyLayout';

export default class Input {
  constructor(keyboardInput) {
    this.keyboardInput = keyboardInput;
    this.value = '';
    this.capsLock = false;
    this.isLeftShiftPressed = false;
    this.isRightShiftPressed = false;
    this.isVirtualShiftPressed = false;
  }

  checkIfCaps() {
    return this.capsLock;
  }

  updateInput() {
    this.keyboardInput.value = this.value;
  }

  handleEnter() {
    const cursorPos = this.keyboardInput.selectionStart;
    if (cursorPos === this.value.length) {
      this.value += '\n';
      this.updateInput();
      this.keyboardInput.setSelectionRange(cursorPos + 1, cursorPos + 1);
      this.keyboardInput.focus();
    } else {
      this.value = `${this.value.substring(0, cursorPos)}\n${this.value.substring(cursorPos)}`;
      this.updateInput();
      this.keyboardInput.setSelectionRange(cursorPos + 1, cursorPos + 1);
      this.keyboardInput.focus();
    }
  }

  handleDel() {
    const start = this.keyboardInput.selectionStart;
    const end = this.keyboardInput.selectionEnd;
    if (start !== end) {
      this.value = this.value.slice(0, start) + this.value.slice(end);
      this.updateInput();
      this.keyboardInput.focus();
      this.keyboardInput.setSelectionRange(start, start);
    } else if (start !== this.value.length) {
      this.value = this.value.slice(0, start) + this.value.slice(start + 1);
      this.updateInput();
      this.keyboardInput.focus();
      this.keyboardInput.setSelectionRange(start, start);
    }
  }

  handleTab() {
    const cursorPos = this.keyboardInput.selectionStart;
    if (cursorPos === this.value.length) {
      this.value += '\t';
      this.updateInput();
      this.keyboardInput.setSelectionRange(cursorPos + 1, cursorPos + 1);
      this.keyboardInput.focus();
    } else {
      this.value = `${this.value.substring(0, cursorPos)}\t${this.value.substring(cursorPos)}`;
      this.updateInput();
      this.keyboardInput.setSelectionRange(cursorPos + 1, cursorPos + 1);
      this.keyboardInput.focus();
    }
  }

  handleSpace() {
    const cursorPos = this.keyboardInput.selectionStart;
    if (cursorPos === this.value.length) {
      this.value += ' ';
      this.updateInput();
      this.keyboardInput.setSelectionRange(cursorPos + 1, cursorPos + 1);
      this.keyboardInput.focus();
    } else {
      this.value = `${this.value.substring(0, cursorPos)} ${this.value.substring(cursorPos)}`;
      this.updateInput();
      this.keyboardInput.setSelectionRange(cursorPos + 1, cursorPos + 1);
      this.keyboardInput.focus();
    }
  }

  handleAddDefaultKeys(key) {
    const cursorPos = this.keyboardInput.selectionStart;
    if (cursorPos === this.value.length) {
      this.value += key.textContent;
      this.updateInput();
      this.keyboardInput.setSelectionRange(cursorPos + 1, cursorPos + 1);
      this.keyboardInput.focus();
    } else {
      this.value = this.value.substring(0, cursorPos)
        + key.textContent + this.value.substring(cursorPos);
      this.updateInput();
      this.keyboardInput.setSelectionRange(cursorPos + 1, cursorPos + 1);
      this.keyboardInput.focus();
    }
  }

  handleBackspace() {
    const cursorStart = this.keyboardInput.selectionStart;
    const cursorEnd = this.keyboardInput.selectionEnd;
    if (cursorStart === 0 && cursorEnd === 0) return;

    if (cursorStart !== cursorEnd) {
      this.value = this.value.substring(0, cursorStart) + this.value.substring(cursorEnd);
      this.updateInput();
      this.keyboardInput.setSelectionRange(cursorStart, cursorStart);
    } else {
      this.value = this.value.slice(0, cursorStart - 1) + this.value.slice(cursorStart);
      this.updateInput();
      this.keyboardInput.setSelectionRange(cursorStart - 1, cursorStart - 1);
    }
    this.keyboardInput.focus();
  }

  toggleCapsLock() {
    const keyArr = document.querySelectorAll('.keyboard__key');
    this.capsLock = !this.capsLock;
    keyArr.forEach((item) => {
      const key = item;
      if (key.textContent.length === 1) {
        if (this.capsLock) {
          if (this.isLeftShiftPressed || this.isRightShiftPressed || this.isVirtualShiftPressed) {
            key.textContent = key.textContent.toLowerCase();
          } else {
            key.textContent = key.textContent.toUpperCase();
          }
        } else if (this.isLeftShiftPressed
          || this.isRightShiftPressed || this.isVirtualShiftPressed) {
          key.textContent = key.textContent.toUpperCase();
        } else {
          key.textContent = key.textContent.toLowerCase();
        }
      }
    });
  }

  handleShiftDown() {
    const keys = document.querySelectorAll('.keyboard__key');
    keys.forEach((item) => {
      const key = item;
      if (this.capsLock && key.textContent.length === 1) {
        key.textContent = key.textContent.toLowerCase();
      } else if (key.textContent.length === 1) {
        key.textContent = key.textContent.toUpperCase();
      }
      if (localStorage.getItem('lang') === 'en' && Object.prototype.hasOwnProperty.call(shiftedKeys.en, key.textContent)) {
        key.textContent = shiftedKeys.en[key.textContent];
      } else if (localStorage.getItem('lang') === 'ru' && Object.prototype.hasOwnProperty.call(shiftedKeys.ru, key.textContent)) {
        key.textContent = shiftedKeys.ru[key.textContent];
      }
    });
  }

  handleShiftUp() {
    const keys = document.querySelectorAll('.keyboard__key');
    keys.forEach((item) => {
      const key = item;
      if (this.capsLock && key.textContent.length === 1) {
        key.textContent = key.textContent.toUpperCase();
      } else if (key.textContent.length === 1) {
        key.textContent = key.textContent.toLowerCase();
      }
      if (localStorage.getItem('lang') === 'en' && Object.prototype.hasOwnProperty.call(shiftedKeysReversed.en, key.textContent)) {
        key.textContent = shiftedKeysReversed.en[key.textContent];
      } else if (localStorage.getItem('lang') === 'ru' && Object.prototype.hasOwnProperty.call(shiftedKeysReversed.ru, key.textContent)) {
        key.textContent = shiftedKeysReversed.ru[key.textContent];
      }
    });
  }

  handleRightShiftKeyDown() {
    if (!this.isLeftShiftPressed && !this.isRightShiftPressed && !this.isVirtualShiftPressed) {
      this.isRightShiftPressed = true;
      this.handleShiftDown();
    }
  }

  handleLeftShiftKeyDown() {
    if (!this.isRightShiftPressed && !this.isLeftShiftPressed && !this.isVirtualShiftPressed) {
      this.isLeftShiftPressed = true;
      this.handleShiftDown();
    }
  }

  handleShiftMouseDown() {
    if (!this.isVirtualShiftPressed && !this.isLeftShiftPressed && !this.isRightShiftPressed) {
      this.handleShiftDown();
      this.isVirtualShiftPressed = true;
    }
  }

  handleShiftMouseUpLeft() {
    if (!this.isRightShiftPressed) {
      this.isLeftShiftPressed = false;
      this.isVirtualShiftPressed = false;
      this.handleShiftUp();
    }
  }

  handleShiftMouseUpRight() {
    if (!this.isLeftShiftPressed) {
      this.isRightShiftPressed = false;
      this.isVirtualShiftPressed = false;
      this.handleShiftUp();
    }
  }

  handleShiftKeyUp(code) {
    if ((this.isLeftShiftPressed && code === 'ShiftLeft' && !this.isVirtualShiftPressed)
      || (this.isRightShiftPressed && code === 'ShiftRight' && !this.isVirtualShiftPressed)) {
      if (this.isRightShiftPressed) {
        this.isRightShiftPressed = false;
      }
      if (this.isLeftShiftPressed) {
        this.isLeftShiftPressed = false;
      }
      this.handleShiftUp();
    }
  }
}
