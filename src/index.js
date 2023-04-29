import Keyboard from './Keyboard';
import KeyElements from './KeyElements';
import './styles/index.css';

// заголовок
const header = document.createElement('h1');
header.textContent = 'RSS Virtual Keyboard';
document.body.append(header);

// подпись
const text = document.createElement('p');
text.classList.add('text');
text.textContent = 'Клавиатура создана в операционной системе Windows. Для переключения языка комбинация: ctrl + alt';
document.body.append(text);

// инпут
const keyboardInput = document.createElement('textarea');
keyboardInput.classList.add('keyboard-input');
document.body.append(keyboardInput);
keyboardInput.addEventListener('keypress', (event) => {
  event.preventDefault();
});

const keyElements = new KeyElements(keyboardInput);
const keyboard = new Keyboard(keyElements.makeKeys(), keyboardInput);
window.addEventListener('DOMContentLoaded', () => {
  keyboard.init();
});

// Обработчик keydown
document.addEventListener('keydown', (evt) => {
  evt.preventDefault();
  const { ctrlKey, altKey, code } = evt;
  if (ctrlKey && altKey) {
    setTimeout(() => {
      keyElements.toggleLanguage();
      keyboard.updateLanguage(keyElements.makeKeys());
    }, 200);
  }

  switch (code) {
    case 'Enter':
      keyElements.handleEnter(code);
      break;
    case 'Tab':
      keyElements.handleTab(code);
      break;
    case 'Delete':
      keyElements.handleDel(code);
      break;
    case 'Space':
      keyElements.handleSpace(code);
      break;
    case 'Backspace':
      keyElements.handleBackspace(code);
      break;
    case 'CapsLock':
      keyElements.handleCapsLock(code, evt.repeat);
      break;
    case 'ShiftLeft':
    case 'ShiftRight':
      keyElements.handleShift(code);
      break;
    case 'ControlLeft':
    case 'ControlRight':
      keyElements.findAmongKeys(code);
      break;
    case 'AltLeft':
    case 'AltRight':
      keyElements.findAmongKeys(code);
      break;
    case 'MetaLeft':
      keyElements.findAmongKeys(code);
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
    keyElements.releaseShift(code);
  }
  keyElements.releaseKey(code);
});
