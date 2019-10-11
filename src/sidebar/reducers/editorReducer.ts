import * as types from '../constants/actionTypes';
import { omitBy, isUndefined, isNaN } from 'lodash';

const initialState = {
  cursorPosition: 0,
  modifiers: {
    font: '',
    fontSize: 12,
    italic: false,
    bold: false,
    underlined: false,
    strikethrough: false,
    ordered: false,
    unordered: false,
    justifyLeft: false,
    justifyCenter: false,
    justifyRight: false,
    justifyFull: false,
  },
};

const handlers = {
  [types.SET_CURSOR_POSITION]: (state, action) => {
    const { cursorPosition } = action;
    return {
      ...state,
      cursorPosition,
    };
  },
  [types.RETRIEVE_MODIFIERS]: (state, action) => {
    const { command, value } = action;
    if (command) {
      document.execCommand(command, false, value || '');
    }

    const selection = window.getSelection();
    const target = selection.focusNode;

    if (!target) {
      return state;
    }

    const nameModifierMap = {
      UL: () => ({ unordered: true }),
      OL: () => ({ ordered: true }),
      B: () => ({ bold: true }),
      I:() => ({ italic: true }),
      U: () => ({ underlined: true }),
      STRIKE:() => ({ strikethrough: true }),
      DIV: node => {
        switch (node.align) {
          case 'left':
            return { justifyLeft: true };
          case 'center':
            return { justifyCenter: true };
          case 'right':
            return { justifyRight: true };
          case 'full':
            return { justifyFull: true };
          default:
            return {};
        }
      },
      FONT: node => ({ font: node.face, fontSize: Number.parseInt(node.style['font-size'])}),
    };

    const commandModifiersMap = {
      bold: 'bold',
      underline: 'underlined',
      italic: 'italic',
      strikeThrough: 'strikethrough',
      insertOrderedList: 'ordered',
      insertUnorderedList: 'unordered',
      justifyLeft: 'justifyLeft',
      justifyCenter: 'justifyCenter',
      justifyRight: 'justifyRight',
      justifyFull: 'justifyFull',
    };

    // First traverse the common ancestor of the selection to the top
    // to get all modifiers
    let node = target;
    let modifiers = {};
    while (node.id !== 'textBox') {
      if (nameModifierMap[node.nodeName]) {
        
        const match = nameModifierMap[node.nodeName](node);
        const modifier = omitBy(match, value => isUndefined(value) || value === '' || isNaN(value));
        modifiers = {...modifiers, ...modifier };
      }
      node = node.parentNode;
    }

    // After traversal, check if the function is called with a command
    // This means that modifier needs to be changed accordingly
    if (command) {
      const modifier = commandModifiersMap[command];
      modifiers[modifier] = value;
    }

    const oldState = state;
    const newState = {
      ...state,
      modifiers: {
        ...state.modifiers,
        ...modifiers,
      },
    };
    return newState;
  },
};

const editorReducer = (state = initialState, action) => {
  if (!Object.prototype.hasOwnProperty.call(handlers, action.type)) {
    return state;
  }
  return handlers[action.type](state, action);
};

export default editorReducer;
