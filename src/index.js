/* eslint-disable no-undef */
import Keyboard from './Keyboard';
import KeyElements from './KeyElements';

// заголовок
const header = document.createElement('h1');
header.textContent = 'RSS Virtual Keyboard';
document.body.append(header);

// подпись
const text = document.createElement('p');
text.classList.add('text');
text.textContent = 'Клавиатура создана в операционной системе Windows. Для переключения языка комбинация: левыe ctrl + alt';
document.body.append(text);

// инпут
const keyboardInput = document.createElement('textarea');
keyboardInput.classList.add('keyboard-input');
document.body.append(keyboardInput);

const keyElements = new KeyElements(keyboardInput);
const keyboard = new Keyboard(keyElements.makeKeys(), keyboardInput);
window.addEventListener('DOMContentLoaded', () => {
  keyboard.init();
});

// смена языка
document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.altKey) {
    keyElements.toggleLanguage();
    keyboard.updateLanguage(keyElements.makeKeys());
  }
});
