# Fast Redux with code-splitting and async components loading demo

This demo is based on [Next.js](https://github.com/zeit/next.js) using-preact [example](https://github.com/zeit/next.js/tree/master/examples/using-preact).

## The idea behind the example

This example uses [Preact](https://github.com/developit/preact) instead of React for production mode. For development mode is still used React to allow builtin Next.js hot-reloading.

`next.config.js` customizes default webpack config to support [preact-compat](https://github.com/developit/preact-compat).
