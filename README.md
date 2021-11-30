<div align="center">
  <p>
    <a href="https://www.npmjs.com/package/fetchform"><img src="https://img.shields.io/npm/v/fetchform.svg?maxAge=3600" alt="npm version" /></a>
    <a href="https://www.npmjs.com/package/fetchform"><img src="https://img.shields.io/npm/dt/fetchform.svg?maxAge=3600" alt="npm downloads" /></a>
  </p>
</div>

## About


fetchform a powerful javascript framework that allows easily use html-forms.

## Installation

```sh-session
npm install fetchform
yarn add fetchform
pnpm add fetchform
```

## Examples

### import
```js
// CommonJS
const FetchForm = require('fetchform')
// ES6 Import
import FetchForm from 'fetchform'
```

### Get FormData
```js
// 'form' your form element selector
const form = document.querySelector('form')
// 'options' (optional) - setting
const fetchForm = new FetchForm(form, {
  includeDisabled: false,
  includeEmpty: true,
  includeHidden: true
})
```

### Options properties
+ **includeDisabled** (boolean)
+ - It includes elements that disabled
+ **includeEmpty** (boolean)
+ - It includes elements that don't contain any value
+ **includeHidden** (boolean)
+ - It includes elements that hidden
