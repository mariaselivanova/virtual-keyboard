(()=>{"use strict";function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(t,i){for(var n=0;n<i.length;n++){var a=i[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,(void 0,o=function(t,i){if("object"!==e(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var a=n.call(t,"string");if("object"!==e(a))return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(a.key),"symbol"===e(o)?o:String(o)),a)}var o}var i=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.container=null,this.keys=t}var i,n;return i=e,(n=[{key:"init",value:function(){this.container=document.createElement("div"),this.container.classList.add("keyboard"),this.container.append(this.keys),document.body.append(this.container)}},{key:"updateLanguage",value:function(e){document.querySelector(".keyboard").remove(),this.keys=e,this.init()}}])&&t(i.prototype,n),Object.defineProperty(i,"prototype",{writable:!1}),e}(),n=[{code:"Backquote",key:"`"},{code:"Digit1",key:"1"},{code:"Digit2",key:"2"},{code:"Digit3",key:"3"},{code:"Digit4",key:"4"},{code:"Digit5",key:"5"},{code:"Digit6",key:"6"},{code:"Digit7",key:"7"},{code:"Digit8",key:"8"},{code:"Digit9",key:"9"},{code:"Digit0",key:"0"},{code:"Minus",key:"-"},{code:"Equal",key:"="},{code:"Backspace",key:"backspace"},{code:"Tab",key:"tab"},{code:"KeyQ",key:"q"},{code:"KeyW",key:"w"},{code:"KeyE",key:"e"},{code:"KeyR",key:"r"},{code:"KeyT",key:"t"},{code:"KeyY",key:"y"},{code:"KeyU",key:"u"},{code:"KeyI",key:"i"},{code:"KeyO",key:"o"},{code:"KeyP",key:"p"},{code:"BracketLeft",key:"["},{code:"BracketRight",key:"]"},{code:"Backslash",key:"\\"},{code:"Delete",key:"del"},{code:"CapsLock",key:"caps"},{code:"KeyA",key:"a"},{code:"KeyS",key:"s"},{code:"KeyD",key:"d"},{code:"KeyF",key:"f"},{code:"KeyG",key:"g"},{code:"KeyH",key:"h"},{code:"KeyJ",key:"j"},{code:"KeyK",key:"k"},{code:"KeyL",key:"l"},{code:"Semicolon",key:";"},{code:"Quote",key:"'"},{code:"Enter",key:"enter"},{code:"ShiftLeft",key:"shiftLeft"},{code:"KeyZ",key:"z"},{code:"KeyX",key:"x"},{code:"KeyC",key:"c"},{code:"KeyV",key:"v"},{code:"KeyB",key:"b"},{code:"KeyN",key:"n"},{code:"KeyM",key:"m"},{code:"Comma",key:","},{code:"Period",key:"."},{code:"Slash",key:"/"},{code:"ArrowUp",key:"▲"},{code:"ShiftRight",key:"shiftRight"},{code:"ControlLeft",key:"ctrlLeft"},{code:"MetaLeft",key:"win"},{code:"AltLeft",key:"altLeft"},{code:"Space",key:"space"},{code:"AltRight",key:"altRight"},{code:"ArrowLeft",key:"◄"},{code:"ArrowDown",key:"▼"},{code:"ArrowRight",key:"►"},{code:"ControlRight",key:"ctrlRight"}],a=[{code:"Backquote",key:"ё"},{code:"Digit1",key:"1"},{code:"Digit2",key:"2"},{code:"Digit3",key:"3"},{code:"Digit4",key:"4"},{code:"Digit5",key:"5"},{code:"Digit6",key:"6"},{code:"Digit7",key:"7"},{code:"Digit8",key:"8"},{code:"Digit9",key:"9"},{code:"Digit0",key:"0"},{code:"Minus",key:"-"},{code:"Equal",key:"="},{code:"Backspace",key:"backspace"},{code:"Tab",key:"tab"},{code:"KeyQ",key:"й"},{code:"KeyW",key:"ц"},{code:"KeyE",key:"у"},{code:"KeyR",key:"к"},{code:"KeyT",key:"е"},{code:"KeyY",key:"н"},{code:"KeyU",key:"г"},{code:"KeyI",key:"ш"},{code:"KeyO",key:"щ"},{code:"KeyP",key:"з"},{code:"BracketLeft",key:"х"},{code:"BracketRight",key:"ъ"},{code:"Backslash",key:"\\"},{code:"Delete",key:"del"},{code:"CapsLock",key:"caps"},{code:"KeyA",key:"ф"},{code:"KeyS",key:"ы"},{code:"KeyD",key:"в"},{code:"KeyF",key:"а"},{code:"KeyG",key:"п"},{code:"KeyH",key:"р"},{code:"KeyJ",key:"о"},{code:"KeyK",key:"л"},{code:"KeyL",key:"д"},{code:"Semicolon",key:"ж"},{code:"Quote",key:"э"},{code:"Enter",key:"enter"},{code:"ShiftLeft",key:"shiftLeft"},{code:"KeyZ",key:"я"},{code:"KeyX",key:"ч"},{code:"KeyC",key:"с"},{code:"KeyV",key:"м"},{code:"KeyB",key:"и"},{code:"KeyN",key:"т"},{code:"KeyM",key:"ь"},{code:"Comma",key:"б"},{code:"Period",key:"ю"},{code:"Slash",key:"."},{code:"ArrowUp",key:"▲"},{code:"ShiftRight",key:"shiftRight"},{code:"ControlLeft",key:"ctrlLeft"},{code:"MetaLeft",key:"win"},{code:"AltLeft",key:"altLeft"},{code:"Space",key:"space"},{code:"AltRight",key:"altRight"},{code:"ArrowLeft",key:"◄"},{code:"ArrowDown",key:"▼"},{code:"ArrowRight",key:"►"},{code:"ControlRight",key:"ctrlRight"}],o={en:{"`":"~",1:"!",2:"@",3:"#",4:"$",5:"%",6:"^",7:"&",8:"*",9:"(",0:")","-":"_","=":"+","[":"{","]":"}",";":":","'":'"',",":"<",".":">","/":"?","\\":"/"},ru:{1:"!",2:'"',3:"№",4:";",5:"%",6:":",7:"?",8:"*",9:"(",0:")","-":"_","=":"+",".":",","\\":"/"}},s={en:{"~":"`","!":"1","@":"2","#":"3",$:"4","%":"5","^":"6","&":"7","*":"8","(":"9",")":"0",_:"-","+":"=","{":"[","}":"]",":":";",'"':"'","<":",",">":".","?":"/","/":"\\"},ru:{"!":"1",'"':"2","№":"3",";":"4","%":"5",":":"6","?":"7","*":"8","(":"9",")":"0",_:"-","+":"=",",":".","/":"\\"}};function c(e){return c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},c(e)}function r(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,(void 0,a=function(e,t){if("object"!==c(e)||null===e)return e;var i=e[Symbol.toPrimitive];if(void 0!==i){var n=i.call(e,"string");if("object"!==c(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(n.key),"symbol"===c(a)?a:String(a)),n)}var a}var y=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.keyboardInput=t,this.value="",this.capsLock=!1,this.isLeftShiftPressed=!1,this.isRightShiftPressed=!1,this.isVirtualShiftPressed=!1,this.keys=null}var t,i;return t=e,(i=[{key:"checkIfCaps",value:function(){return this.capsLock}},{key:"checkIfShift",value:function(){return this.isLeftShiftPressed||this.isRightShiftPressed||this.isVirtualShiftPressed}},{key:"checkWhichShift",value:function(){this.isLeftShiftPressed&&document.querySelector('[data-code="ShiftLeft"]').classList.add("keyboard__key_act"),this.isRightShiftPressed&&document.querySelector('[data-code="ShiftRight"]').classList.add("keyboard__key_act")}},{key:"findKey",value:function(e){this.keys=document.querySelectorAll(".keyboard__key"),Array.from(this.keys).find((function(t){var i=t.getAttribute("data-code");return e===i})).classList.add("keyboard__key_act")}},{key:"updateInput",value:function(){this.keyboardInput.value=this.value}},{key:"handleEnter",value:function(){var e=this.keyboardInput.selectionStart;e===this.value.length?this.value+="\n":this.value="".concat(this.value.substring(0,e),"\n").concat(this.value.substring(e)),this.updateInput(),this.keyboardInput.setSelectionRange(e+1,e+1),this.keyboardInput.focus()}},{key:"handleDel",value:function(){var e=this.keyboardInput.selectionStart,t=this.keyboardInput.selectionEnd;e!==t?this.value=this.value.slice(0,e)+this.value.slice(t):e!==this.value.length&&(this.value=this.value.slice(0,e)+this.value.slice(e+1)),this.updateInput(),this.keyboardInput.setSelectionRange(e,e),this.keyboardInput.focus()}},{key:"handleTab",value:function(){var e=this.keyboardInput.selectionStart;e===this.value.length?this.value+="\t":this.value="".concat(this.value.substring(0,e),"\t").concat(this.value.substring(e)),this.updateInput(),this.keyboardInput.setSelectionRange(e+1,e+1),this.keyboardInput.focus()}},{key:"handleSpace",value:function(){var e=this.keyboardInput.selectionStart;e===this.value.length?this.value+=" ":this.value="".concat(this.value.substring(0,e)," ").concat(this.value.substring(e)),this.updateInput(),this.keyboardInput.setSelectionRange(e+1,e+1),this.keyboardInput.focus()}},{key:"handleAddDefaultKeys",value:function(e){var t=this.keyboardInput.selectionStart;t===this.value.length?this.value+=e.textContent:this.value=this.value.substring(0,t)+e.textContent+this.value.substring(t),this.updateInput(),this.keyboardInput.setSelectionRange(t+1,t+1),this.keyboardInput.focus()}},{key:"handleBackspace",value:function(){var e=this.keyboardInput.selectionStart,t=this.keyboardInput.selectionEnd;0===e&&0===t||(e!==t?(this.value=this.value.substring(0,e)+this.value.substring(t),this.updateInput(),this.keyboardInput.setSelectionRange(e,e)):(this.value=this.value.slice(0,e-1)+this.value.slice(e),this.updateInput(),this.keyboardInput.setSelectionRange(e-1,e-1)),this.keyboardInput.focus())}},{key:"toggleCapsLock",value:function(){var e=this,t=document.querySelectorAll(".keyboard__key");this.capsLock=!this.capsLock;var i=this.isLeftShiftPressed||this.isRightShiftPressed||this.isVirtualShiftPressed;t.forEach((function(t){var n=t;1===n.textContent.length&&(e.capsLock?n.textContent=i?n.textContent.toLowerCase():n.textContent.toUpperCase():n.textContent=i?n.textContent.toUpperCase():n.textContent.toLowerCase())}))}},{key:"handleShiftDown",value:function(){var e=this,t=document.querySelectorAll(".keyboard__key"),i=localStorage.getItem("lang");t.forEach((function(t){var n=t;e.capsLock&&1===n.textContent.length?n.textContent=n.textContent.toLowerCase():1===n.textContent.length&&(n.textContent=n.textContent.toUpperCase()),"en"===i&&Object.prototype.hasOwnProperty.call(o.en,n.textContent)?n.textContent=o.en[n.textContent]:"ru"===i&&Object.prototype.hasOwnProperty.call(o.ru,n.textContent)&&(n.textContent=o.ru[n.textContent])}))}},{key:"handleShiftUp",value:function(){var e=this,t=document.querySelectorAll(".keyboard__key"),i=localStorage.getItem("lang");t.forEach((function(t){var n=t;e.capsLock&&1===n.textContent.length?n.textContent=n.textContent.toUpperCase():1===n.textContent.length&&(n.textContent=n.textContent.toLowerCase()),"en"===i&&Object.prototype.hasOwnProperty.call(s.en,n.textContent)?n.textContent=s.en[n.textContent]:"ru"===i&&Object.prototype.hasOwnProperty.call(s.ru,n.textContent)&&(n.textContent=s.ru[n.textContent])}))}},{key:"handleRightShiftKeyDown",value:function(e){this.isLeftShiftPressed||this.isRightShiftPressed||this.isVirtualShiftPressed||(this.isRightShiftPressed=!0,this.handleShiftDown(),this.findKey(e))}},{key:"handleLeftShiftKeyDown",value:function(e){this.isLeftShiftPressed||this.isVirtualShiftPressed||this.isRightShiftPressed||(this.isLeftShiftPressed=!0,this.handleShiftDown(),this.findKey(e))}},{key:"handleShiftKeyUp",value:function(e){(this.isLeftShiftPressed&&"ShiftLeft"===e&&!this.isVirtualShiftPressed||this.isRightShiftPressed&&"ShiftRight"===e&&!this.isVirtualShiftPressed)&&(this.isRightShiftPressed?this.isRightShiftPressed=!1:this.isLeftShiftPressed&&(this.isLeftShiftPressed=!1),this.handleShiftUp())}},{key:"handleShiftMouseDown",value:function(){this.isVirtualShiftPressed||this.isLeftShiftPressed||this.isRightShiftPressed||(this.isVirtualShiftPressed=!0,this.handleShiftDown())}},{key:"handleShiftMouseUp",value:function(e){!this.isVirtualShiftPressed||this.isLeftShiftPressed||this.isRightShiftPressed?!this.isVirtualShiftPressed&&this.isLeftShiftPressed&&"shiftLeft"===e?(this.isLeftShiftPressed=!1,this.handleShiftUp()):!this.isVirtualShiftPressed&&this.isRightShiftPressed&&"shiftRight"===e&&(this.isRightShiftPressed=!1,this.handleShiftUp()):(this.isVirtualShiftPressed=!1,this.handleShiftUp())}}])&&r(t.prototype,i),Object.defineProperty(t,"prototype",{writable:!1}),e}();function d(e){return d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},d(e)}function l(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,(void 0,a=function(e,t){if("object"!==d(e)||null===e)return e;var i=e[Symbol.toPrimitive];if(void 0!==i){var n=i.call(e,"string");if("object"!==d(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(n.key),"symbol"===d(a)?a:String(a)),n)}var a}var u=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.keyLayout=[],this.input=t,this.virtualKey=null,this.pressedKeys=[]}var t,i;return t=e,(i=[{key:"findAmongKeys",value:function(e){var t=document.querySelectorAll(".keyboard__key");this.virtualKey=Array.from(t).find((function(t){var i=t.getAttribute("data-code");return e===i}))}},{key:"pressKey",value:function(e){this.findAmongKeys(e),this.virtualKey&&this.virtualKey.classList.add("keyboard__key_act")}},{key:"releaseKey",value:function(e){this.findAmongKeys(e),this.virtualKey&&this.virtualKey.classList.remove("keyboard__key_act")}},{key:"addDefaultKeys",value:function(e){this.pressKey(e),this.virtualKey&&this.input.handleAddDefaultKeys(this.virtualKey)}},{key:"handleEnterKey",value:function(e){this.pressKey(e),this.virtualKey&&this.input.handleEnter()}},{key:"handleTabKey",value:function(e){this.pressKey(e),this.virtualKey&&this.input.handleTab()}},{key:"handleDelKey",value:function(e){this.pressKey(e),this.virtualKey&&this.input.handleDel()}},{key:"handleSpaceKey",value:function(e){this.pressKey(e),this.virtualKey&&this.input.handleSpace()}},{key:"handleBackspaceKey",value:function(e){this.pressKey(e),this.virtualKey&&this.input.handleBackspace()}},{key:"handleCapsLockKey",value:function(e,t){t||(this.pressKey(e),this.virtualKey&&(this.input.toggleCapsLock(),this.virtualKey.classList.toggle("keyboard__key--active")))}},{key:"handleRightShiftKey",value:function(e){this.input.handleRightShiftKeyDown(e)}},{key:"handleLeftShiftKey",value:function(e){this.input.handleLeftShiftKeyDown(e)}},{key:"releaseShiftKey",value:function(e){this.input.handleShiftKeyUp(e)}},{key:"toggleLanguage",value:function(){var e=localStorage.getItem("lang");"en"===e?(localStorage.setItem("lang","ru"),this.keyLayout=a):"ru"===e&&(localStorage.setItem("lang","en"),this.keyLayout=n)}},{key:"makeKeys",value:function(){var e=this,t=document.createDocumentFragment();localStorage.getItem("lang")&&"en"!==localStorage.getItem("lang")?this.keyLayout=a:(this.keyLayout=n,localStorage.setItem("lang","en"));var i=this.pressedKeys.map((function(e){return e.code}));return this.keyLayout.forEach((function(n){var a=document.createElement("button");switch(a.setAttribute("type","button"),a.setAttribute("data-code","".concat(n.code)),a.classList.add("keyboard__key"),i.includes(n.code)&&a.classList.add("keyboard__key_act"),a.addEventListener("mousedown",(function(){a.classList.add("keyboard__key_act"),e.pressedKeys.push(n)})),a.addEventListener("mouseup",(function(){a.classList.remove("keyboard__key_act");var t=e.pressedKeys.findIndex((function(e){return e.code===n.code}));t>-1&&e.pressedKeys.splice(t,1)})),n.key){case"enter":a.classList.add("keyboard__key_wide"),a.textContent="Enter",a.addEventListener("click",(function(){e.input.handleEnter()}));break;case"tab":a.classList.add("keyboard__key_normal"),a.textContent="Tab",a.addEventListener("click",(function(){e.input.handleTab()}));break;case"del":a.textContent="Del",a.classList.add("keyboard__key_normal"),a.addEventListener("click",(function(){e.input.handleDel()}));break;case"space":a.classList.add("keyboard__key_super-wide"),a.addEventListener("click",(function(){e.input.handleSpace()}));break;case"backspace":a.classList.add("keyboard__key_wide"),a.textContent="Backspace",a.addEventListener("click",(function(){e.input.handleBackspace()}));break;case"caps":a.classList.add("keyboard__key_wide","keyboard__key--activatable"),a.textContent="CapsLock",e.input.checkIfCaps()&&a.classList.add("keyboard__key--active"),a.addEventListener("click",(function(){e.input.toggleCapsLock(),a.classList.toggle("keyboard__key--active")}));break;case"shiftRight":case"shiftLeft":a.classList.add("keyboard__key_wide"),a.textContent="Shift",a.addEventListener("mousedown",(function(){e.input.handleShiftMouseDown()})),a.addEventListener("mouseup",(function(){e.input.handleShiftMouseUp(n.key),a.classList.remove("keyboard__key_act")}));break;case"ctrlLeft":case"ctrlRight":a.textContent="Ctrl";break;case"altLeft":case"altRight":a.textContent="Alt";break;case"win":a.textContent="Win";break;default:a.textContent=e.input.checkIfCaps()?n.key.toUpperCase():n.key.toLowerCase(),a.addEventListener("click",(function(){e.input.handleAddDefaultKeys(a)}))}t.appendChild(a)})),t}}])&&l(t.prototype,i),Object.defineProperty(t,"prototype",{writable:!1}),e}(),h=document.createElement("h1");h.textContent="RSS Virtual Keyboard",document.body.append(h);var k=document.createElement("p");k.classList.add("text"),k.textContent="Клавиатура создана в операционной системе Windows. Для переключения языка: левые ctrl + alt",document.body.append(k);var f=document.createElement("textarea");f.classList.add("keyboard-input"),document.body.append(f),f.addEventListener("keypress",(function(e){e.preventDefault()}));var p=new y(f),v=new u(p),b=new i(v.makeKeys());window.addEventListener("DOMContentLoaded",(function(){b.init()})),document.addEventListener("keydown",(function(e){e.preventDefault();var t=e.ctrlKey,i=e.altKey,n=e.code,a=e.repeat;if(t&&i){if(a)return;setTimeout((function(){v.toggleLanguage();var e=v.makeKeys();b.updateLanguage(e),p.checkIfShift()&&(p.handleShiftDown(),p.checkWhichShift())}),200)}switch(n){case"Enter":v.handleEnterKey(n);break;case"Tab":v.handleTabKey(n);break;case"Delete":v.handleDelKey(n);break;case"Space":v.handleSpaceKey(n);break;case"Backspace":v.handleBackspaceKey(n);break;case"CapsLock":v.handleCapsLockKey(n,e.repeat);break;case"ShiftRight":v.handleRightShiftKey(n);break;case"ShiftLeft":v.handleLeftShiftKey(n);break;case"ControlLeft":case"ControlRight":case"AltLeft":case"AltRight":case"MetaLeft":v.pressKey(n);break;default:v.addDefaultKeys(n)}})),document.addEventListener("keyup",(function(e){e.preventDefault();var t=e.code;"ShiftLeft"!==t&&"ShiftRight"!==t||v.releaseShiftKey(t),v.releaseKey(t)}))})();