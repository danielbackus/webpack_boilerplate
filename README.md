### Bootstrapping a webpack repo
- `npm init -y`
- First let's setup up auto-formatting our code for consistency. Run `npm i -D husky prettier pretty-quick`
- I prefer Prettier over other options explicitly because it works very well without any configuration. However if you are particular about tab sizes, etc., you might want a `.prettierrc` file *a la*:
  - ```json
    {
      "trailingComma": "es5",
      "tabWidth": 2,
      "singleQuote": true
    }
    ```
- You may wish to install the Prettier extension and enable "format on save" or other IDE workspace specific settings. If so, install the [extension](https://github.com/prettier/prettier-vscode). Then, `code .vscode/settings.json` and enter something like:
  - ```js
    {
      "editor.formatOnSave": true
    }
    ```
- Next, our testing framework: `npm i -D jest`
- Add test scripts to `package.json`:
  - ```json
    "scripts": {
      "test": "npm run test:unit && npm run test:integration",
      "test:unit": "npx jest src/**/*.test.js",
      "test:integration": "npx jest src/**/*.spec.js"
    }
    ```
- Now that we have a tests and formatting, let's add git hooks to automate them. Add the following to `package.json`:
  - ```json
    {
      // rest of package.json above
      "husky": {
      "hooks": {
        "pre-commit": "npx pretty-quick --staged",
        "pre-push": "npm run test"
      }
    }
- Now let's get our webpack setup running. First our dependencies: `npm i -D webpack webpack-cli npm-run-all`
- Let's create our webpack config. This goes in the project root. First, prod: `webpack.config.js`:
  - ```js
    const path = require('path');
    const webpack = require('webpack');

    // note that this webpack config is an array
    // if you want another app to be built, you can simply add another object to the array
    module.exports = [
      {
        target: 'node',
        entry: path.resolve(__dirname, 'src/api/index.js'),
        output: {
          filename: 'main.js',
          path: path.resolve(__dirname, 'dist/api'),
        },
        resolve: {
          // this gives us some magic aliases we can use like absolute paths
          // `import db from '@lib/db'` instead of `import db from '../../../lib/db'`
          // it doesn't need an @ but I personally like it as a convention to help remember it is an alias
          alias: {
            '@lib': path.resolve(__dirname, 'src/lib'),
          },
        },
        // this is needed to fix a stupid bug with a restify dependency: https://github.com/node-formidable/node-formidable/issues/337
        plugins: [new webpack.DefinePlugin({    'global.GENTLY': false })],
        mode: 'production',
      }
    ];
    ```
- Next, we add the dev config. This is the same as prod with the following changes:
  - ```
    {
      // above here the config is same as prod
      mode: 'development',
    }
- Next, add our build and run scripts.
  - ```json
    "scripts": {
      // other scripts above here
      "build": "npx webpack --config webpack.config.js",
      "build:dev": "npx webpack --config webpack.dev.config.js",
      "watch:dev": "npx webpack --watch --config webpack.dev.config.js",
      "start:api": "node dist/api/main/js",
      // note that I am using npm-run-all with the parallel flag
      // this would allow you to run multiple webpacked apps in parallel
      // e.g. an api server and a static webserver
      // simply by adding a new script and appending its name to the end of `start:dev` script
      "start:dev": "npm run watch:dev && npx npm-run-all --parallel start:dev:api"
    }
    ```
- So what have we accomplished? Well:
  - We have a Webpack setup that can build any number of applications, simply by appending a config object to the `webpack.config.js` files
  - We can run these applications in parallel with `npm-run-all` with `npm run start:dev`
  - Before we commit, our code is automatically formatted with `pretty-quick`.
  - Before we push to remote, our test suites must run and pass.
- TODO:
  - Write simple restify API server and document
  - Document dotenv
  - Write simple utils module to demo aliasing and document
  - Write unit tests for API server and document
  - Write simple DB wrapper and document
  - Add simple unit tests to DB wrapper and document
  - Add simple integration tests for API server <-> DB and document
  - Add a static webserver to webpack setup and document
  - Add a webpack-dev-server setup for static webserver
  - Add a docker-compose setup?
  - Add some git stuff to showcase the hooks?
