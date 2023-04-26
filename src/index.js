/* eslint-disable no-undef */
import Keyboard from './Keyboard';

// заголовок
const header = document.createElement('h1');
header.textContent = 'RSS Виртуальная клавиатура';
document.body.append(header);

// инпут
const keyboardInput = document.createElement('textarea');
keyboardInput.classList.add('keyboard-input');
document.body.append(keyboardInput);

// подпись
const text = document.createElement('p');
text.classList.add('text');
text.textContent = 'Клавиатура создана в операционной системе Windows. Для переключения языка комбинация: левыe ctrl + alt';
document.body.append(text);

const keyboard = new Keyboard();
window.addEventListener('DOMContentLoaded', () => {
  keyboard.init();
});
