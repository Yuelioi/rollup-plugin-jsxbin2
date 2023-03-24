# rollup-plugin-jsxbin2

Plugin for rollup with covert jsx file to jsxbin(new)

## Installation

```shell
yarn add rollup-plugin-jsxbin2 -D
// or
npm i rollup-plugin-jsxbin2 -D
// or
pnpm i rollup-plugin-jsxbin2 -D
```

## Usage

```javascript
import jsxbin2 from 'rollup-plugin-jsxbin2'
 
export default {
  // ...
  plugins: [
    jsxbin2({file:"foo.jsx"})
  ]
}
```

## Dependencies

if don't install `jsxbin`, (jsxbin file not in node_modules/.bin folder)

```shell
yarn add jsxbin -D
// or
npm i jsxbin -D
// or
pnpm i jsxbin -D
```

## TODO

multi files?
