<div align="center">
  <p>
    <a href="https://www.npmjs.com/package/fetch-form"><img src="https://img.shields.io/npm/v/fetch-form.svg?maxAge=3600" alt="npm version" /></a>
    <a href="https://www.npmjs.com/package/fetch-form"><img src="https://img.shields.io/npm/dt/fetch-form.svg?maxAge=3600" alt="npm downloads" /></a>
  </p>
</div>

## About

fetch-form is a powerful [Node.js](https://nodejs.org) module that allows you to fetching forms data

## Installation

```sh-session
npm install fetch-form
yarn add fetch-form
pnpm add fetch-form
```

## Examples

### import
```js
// CommonJS
const FetchForm = require('fetch-form')
// ES6 Import
import FetchForm from 'fetch-form'
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
