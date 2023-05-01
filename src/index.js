import Keyboard from './Keyboard';
import Input from './Input';
import KeyElements from './KeyElements';
import './styles/index.css';

// заголовок
const header = document.createElement('h1');
header.textContent = 'RSS Virtual Keyboard';
document.body.append(header);

// подпись
const text = document.createElement('p');
text.classList.add('text');
text.textContent = 'Клавиатура создана в операционной системе Windows. Для переключения языка: левые ctrl + alt';
document.body.append(text);

// инпут
const keyboardInput = document.createElement('textarea');
keyboardInput.classList.add('keyboard-input');
document.body.append(keyboardInput);
keyboardInput.addEventListener('keypress', (event) => {
  event.preventDefault();
});

const input = new Input(keyboardInput);
const keyElements = new KeyElements(input);
const keyboard = new Keyboard(keyElements.makeKeys());
window.addEventListener('DOMContentLoaded', () => {
  keyboard.init();
});

// Обработчик keydown
document.addEventListener('keydown', (evt) => {
  evt.preventDefault();
  const {
    ctrlKey, altKey, code, repeat,
  } = evt;

  if (ctrlKey && altKey) {
    if (repeat) return;
    setTimeout(() => {
      keyElements.toggleLanguage();
      const newLangKeys = keyElements.makeKeys();
      keyboard.updateLanguage(newLangKeys);
      if (input.checkIfShift()) {
        input.handleShiftDown();
        input.checkWhichShift();
      }
    }, 200);
  }

  switch (code) {
    case 'Enter':
      keyElements.handleEnterKey(code);
      break;
    case 'Tab':
      keyElements.handleTabKey(code);
      break;
    case 'Delete':
      keyElements.handleDelKey(code);
      break;
    case 'Space':
      keyElements.handleSpaceKey(code);
      break;
    case 'Backspace':
      keyElements.handleBackspaceKey(code);
      break;
    case 'CapsLock':
      keyElements.handleCapsLockKey(code, evt.repeat);
      break;
    case 'ShiftRight':
      keyElements.handleRightShiftKey(code);
      break;
    case 'ShiftLeft':
      keyElements.handleLeftShiftKey(code);
      break;
    case 'ControlLeft':
    case 'ControlRight':
      keyElements.pressKey(code);
      break;
    case 'AltLeft':
    case 'AltRight':
      keyElements.pressKey(code);
      break;
    case 'MetaLeft':
      keyElements.pressKey(code);
      break;
    default:
      keyElements.addDefaultKeys(code);
      break;
  }
});

// Обработчик keyup
document.addEventListener('keyup', (evt) => {
  evt.preventDefault();
  const { code } = evt;
  if (code === 'ShiftLeft' || code === 'ShiftRight') {
    keyElements.releaseShiftKey(code);
  }
  keyElements.releaseKey(code);
});
