# fast-redux - O(1) speed and dynamic importing of actions/reducers

Fully compatible with Redux but works with O(1) speed when Redux itself works with O(N) speed (N is number of reducers). You can use standard Redux devtools with fast-redux actions.

Plays well with code splitting. You can dynamically import and  actions/reducers to the store during lifetime of the applications.

Don't repeat yourself. Constants for action types aren't need (say goodbye to `switch` statements as well).


### Installation

To install the stable version:

```
npm install --save fast-redux
```

The Redux source code is written in ES2015 but we precompile both CommonJS and UMD builds to ES5 so they work in [any modern browser](http://caniuse.com/#feat=es5).


You can use fast-redux together with [React](https://facebook.github.io/react/), or with any other view library.  
It is tiny (1kB, including dependencies).

fast-redux is simpler and IMO better version [Edux](https://github.com/dogada/edux) (my first attempt to make Redux more developer friendly).

### License

MIT

