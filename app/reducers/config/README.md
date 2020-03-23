
Webpack is replacing configs.electron.ts with `configs.web.ts` in `configs\webpack.config.web.prod.babel.js` when the application is built for Docker web deployment.

This will achieve the following:
* usable of local storage for web deployment
* usage of electron-store for Electron deployment.
