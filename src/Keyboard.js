import './styles/index.css';
import { keyLayoutEn, keyLayoutRu } from './utils/keyLayout';

export default class Keyboard {
  constructor() {
    this.alphabet = keyLayoutEn;
    this.container = null;
    this.keys = [];
    this.value = '';
    this.capsLock = false;
  }
}
