module.exports = {
  verbose: true,
  sourceDir: './dist',
  build: {
    overwriteDest: true,
  },
  run: {
    firefoxProfile: 'PocketEditorFirefoxProfile',
    keepProfileChanges: true,
  },
};