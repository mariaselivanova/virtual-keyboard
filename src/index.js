/* eslint-disable no-undef */
import Keyboard from './Keyboard';
import KeyElements from './KeyElements';

// заголовок
const header = document.createElement('h1');
header.textContent = 'RSS Virtual Keyboard';
document.body.append(header);

// инпут
const keyboardInput = document.createElement('textarea');
keyboardInput.classList.add('keyboard-input');
document.body.append(keyboardInput);

window.addEventListener('DOMContentLoaded', () => {
  const keyElements = new KeyElements(keyboardInput);
  const keyboard = new Keyboard(keyElements.makeKeys(), keyboardInput);
  keyboard.init();
});
