const run = () => {
  browser.browserAction.onClicked.addListener(() => {
  /*
    For detailed info, why there is no switch with sidebarAction.isOpen and just async/await in
    handler for browserAction consult https://stackoverflow.com/a/47729896
    TLDR: async makes outer code forget, that the handler is actually triggered by user input and
    browser throws "* may only be called from a user input handler" error.
  */
    browser.sidebarAction.open();
  });
};

run();
