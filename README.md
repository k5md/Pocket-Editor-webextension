# Pocket Editor

## Features

Pocket Editor is a text editor add-on for Firefox. It allows you to quickly compose your documents right in the sidebar while browsing, which is very useful when collecting some data for publications, because it breaks the tedious "copy - switch to editor - paste - switch to browser" cycle!

What's most exciting - it supports editing multiple documents at once - you have as many open documents, as you want and switch between them using buttons in the bottom. To rename document one should click on its title.

Note, however, that it is a regular browser extension, and that is why it has no access to local files on users PC. However, all the extension data, related to one's documents is stored in indexedDB, they won't get lost. And there is always import/export feature to save users' time.

## Build

#### Linux
1. Install [node and npm](https://nodejs.org)
2. In the project directory run `make install`
3. In the project directory run one of these commands:

   `make build-dev` to build for development

   `make build-prod` to build for production

   `make pack` to build production version and pack it with [web-ext](https://developer.mozilla.org/ru/docs/Mozilla/Add-ons/WebExtensions/Getting_started_with_web-ext)

Building has been tested with:
- Node.js version [11.15.0](https://nodejs.org/download/release/v11.15.0/)
- npm version 6.9.0
- Arch Linux (5.1.7 x86-64)

#### Windows
1. Install [node and npm](https://nodejs.org)
2. Int the project directory run `npm run install`
3. In the project directory run one of these commands:

   `npm run build-dev` to build for development

   `npm run build-prod` to build for production

   `npm run pack` to build production version and pack it with [web-ext](https://developer.mozilla.org/ru/docs/Mozilla/Add-ons/WebExtensions/Getting_started_with_web-ext)

Building has been tested with:
- Node.js version [10.13.0](https://nodejs.org/download/release/v10.13.0/)
- npm version 6.9.0
- Windows 7 SP1

For verification and calculating diffs with submitted addon, use Windows configuration. On Linux and MacOS systems diff will fail because of line endings difference affecting webpack hash generation. Or use diff with --strip-trailing-cr on .html and .js files.

## Development
To monitor changes in browser with hot-reloading you can do
- `npm run watch` or `make watch` to start rebuilding dist on every save in src directory. This is achieved via running webpack and web-ext both in watch mode with concurrently npm package. You can load extension in browser with `npm run browser` or `make browser`. 
- Sometimes the above is not the best choice, since browser can stop reloading the extension rebuild due to errors, in this case you should avoid running webpack and web-ext in watch mode. If you want to monitor changes, you can just `npm run browser` once after first build-dev and then run build-dev on each change you want to inspect.

## Credits

Note icon is made by [Smashicons](https://www.flaticon.com/authors/smashicons) from [Flaticon](https://www.flaticon.com/) is licensed by [Creative Commons BY 3.0](http://creativecommons.org/licenses/by/3.0/).

## Problems, requests, suggestions

If you find a problem, please, [create an issue](https://github.com/k5md/Pocket-Editor-webextension/issues/new).
