export const saveToStorage = (hash) => browser.storage.local.set(hash);

export const loadFromStorage = (key = null) => browser.storage.local.get(key);

// https://stackoverflow.com/a/874742
export const stringToRegex = (str) => {
  const flags = str.replace(/.*\/([gimy]*)$/, '$1');
  const pattern = str.replace(new RegExp(`^/(.*?)/${flags}$`), '$1');
  return new RegExp(pattern, flags);
};

// eslint-disable-next-line default-param-last
export const createReducer = (handlers, initialState = {}) => (state = initialState, action) => {
  if (!Object.prototype.hasOwnProperty.call(handlers, action.type)) {
    return state;
  }
  return handlers[action.type](state, action);
};

export const breakE = (e) => { e.isDefaultPrevented = () => false; };

export const mutateDocumentWithModifiers = (mutationCommand, mutationValue) => {
  // NOTE: actual commands may be different from their corresponding
  // modifiers (e.g strikeThrough), some modifiers can group many commands
  // (like justify) and some need additional actions (fontSize) taken
  // TODO: refactor to use queryCommandState instead?
  const makeHandler = (command) => (value) => {
    document.execCommand(command, false, value);
    // commandStatus indicates whether command is still active
    const commandStatus = document.queryCommandState(command);
    const change = { [command]: commandStatus && value };
    return { change, commandStatus };
  };

  const commandHandlers = {
    redo: () => makeHandler('redo')() && { change: {} },
    undo: () => makeHandler('undo')() && { change: {} },
    strikethrough: (value) => {
      const { commandStatus } = makeHandler('strikeThrough')(value);
      const change = { strikethrough: commandStatus && value };
      return { change };
    },
    bold: makeHandler('bold'),
    underline: makeHandler('underline'),
    italic: makeHandler('italic'),
    ordered: (value) => makeHandler('insertOrderedList')() && { change: { ordered: value, unordered: false } },
    unordered: (value) => makeHandler('insertUnorderedList')() && { change: { ordered: false, unordered: value } },
    justifyFull: () => makeHandler('justifyFull')() && { change: { justify: 'full' } },
    justifyLeft: () => makeHandler('justifyLeft')() && { change: { justify: 'left' } },
    justifyCenter: () => makeHandler('justifyCenter')() && { change: { justify: 'center' } },
    justifyRight: () => makeHandler('justifyRight')() && { change: { justify: 'right' } },
  };

  return commandHandlers[mutationCommand](mutationValue);
};

export const collectModifiersFromSelection = (container) => {
  const initialModifiers = {
    italic: false,
    bold: false,
    underline: false,
    strikethrough: false,
    ordered: false,
    unordered: false,
    justify: null,
  };

  const selectorHandlers = {
    UL: () => ({ unordered: true }),
    OL: () => ({ ordered: true }),
    B: () => ({ bold: true }),
    STRONG: () => ({ bold: true }),
    I: () => ({ italic: true }),
    U: () => ({ underline: true }),
    STRIKE: () => ({ strikethrough: true }),
    'DIV[align]': (node) => ({ justify: node.align }),
  };

  const { anchorNode, focusNode } = window.getSelection(); // anchor - start, focus - end
  const anchor = anchorNode.parentElement;
  const focus = focusNode.parentElement;

  // execCommand only 'negates' current modifier only if anchor and focus are
  // equal in terms of node they represent, otherwise it will create new node,
  // so compare parents and show user default values (unset) if they are NOT equal
  if (anchor !== focus) return initialModifiers;

  // Otherwise we need to construct modifiers object by traversing DOM to the container and
  // applying handlers to, like, parse it
  const modifiers = Object.entries(selectorHandlers).reduce((acc, [selector, handler]) => {
    const closest = anchor.closest(selector);
    const closestExists = closest !== null && container.contains(closest);
    return closestExists ? { ...acc, ...handler(closest) } : acc;
  }, { ...initialModifiers });

  return modifiers;
};

export const getContent = (selector) => {
  const content = document.getElementById(selector).innerHTML;
  return content;
};
