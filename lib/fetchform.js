(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.FetchForm = factory());
})(this, (function () { 'use strict';

  var FetchFormError = /*@__PURE__*/(function (Error) {
    function FetchFormError(message, status) {
      Error.call(this, message);
      this.status = status;
      this.name = 'FetchFormError';
    }

    if ( Error ) FetchFormError.__proto__ = Error;
    FetchFormError.prototype = Object.create( Error && Error.prototype );
    FetchFormError.prototype.constructor = FetchFormError;

    return FetchFormError;
  }(Error));

  var FetchForm = function(form, options) {
    if ( options === void 0 ) options = {
    includeDisabled: false,
    includeEmpty: true,
    includeHidden: true
  };

    this.form = form;
    this.options = options;
    this.data = this.getData();
    this.submit = this.submit.bind(this);
  };

  /**
   * Get form data
   * @return {Object} Form data
   * @throws {FetchFormError}
   * @private
   * @memberof FetchForm
   * @instance
   * @method getData
   * @example
   * const form = document.querySelector('form')
   * const fetchForm = new FetchForm(form)
   * const data = fetchForm.getData()
   * console.log(data)
   * // {
   * // "name": "John Doe",
   * // "email": "johndoe@example.com",
   * // "website": "http://example.com",
   * // "age": "25"
   * // }
   */

  FetchForm.prototype.getData = function () {
    var data = {};
    var form = this.form;
    var options = this.options;
    var elements = form.elements;

    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];

      data[element.name] = this.val(element);

      if (options.includeEmpty === false && data[element.name] === '') {
        delete data[element.name];
      }

      if (options.includeDisabled === false && element.disabled) {
        delete data[element.name];
      }

      if (options.includeHidden === false && element.type === 'hidden') {
        delete data[element.name];
      }
    }

    return data
  };

  /**
   * listener on submit form
   * @param {Object} element
   * @return {String} Value
   * @private
   * @memberof FetchForm
   * @instance
   * @method submit
   * @example
   * const form = document.querySelector('form')
   * const fetchForm = new FetchForm(form)
   * fetchForm.submit((event) => {
   *event.preventDefault()
   *const data = fetchform.getData()
   * })
   */
  FetchForm.prototype.submit = function (callback) {
    var form = this.form;

    form.onsubmit = callback;
  };

  /**
   * Get value of element
   * @param {Object} element
   * @return {String} Value
   * @private
   * @memberof FetchForm
   * @instance
   * @method val
   * @example
   * const form = document.querySelector('form')
   * const input = form.elements.username
   * const fetchForm = new FetchForm(form)
   * const value = fetchForm.val(input)
   * console.log(value)
   * // "John Doe"
   */
  FetchForm.prototype.val = function (element) {
    if (element.tagName === 'SELECT') {
      return this.valSelect(element)
    } else if (element.tagName === 'INPUT') {
      return this.valInput(element)
    } else if (element.tagName === 'TEXTAREA') {
      return this.valTextarea(element)
    } else {
      throw new FetchFormError(("Unknown element type: " + (element.tagName)))
    }
  };

  /**
   * Get value of select element
   * @param {Object} element
   * @return {String} Value
   * @private
   * @memberof FetchForm
   * @instance
   * @method valSelect
   * @example
   * const form = document.querySelector('form')
   * const fetchForm = new FetchForm(form)
   * const value = fetchForm.valSelect(element)
   * console.log(value)
   * // ["John Doe"]
   */
  FetchForm.prototype.valSelect = function (element) {
    var options = element.options;
    var values = [];

    for (var i = 0; i < options.length; i++) {
      var option = options[i];

      if (option.selected) {
        values.push(option.value);
      }
    }

    return values
  };

  /**
   * Get value of input element
   * @param {Object} element
   * @return {String} Value
   * @private
   * @memberof FetchForm
   * @instance
   * @method valInput
   * @example
   * const form = document.querySelector('form')
   * const fetchForm = new FetchForm(form)
   * const value = fetchForm.valInput(element)
   * console.log(value)
   * // "John Doe"
   */
  FetchForm.prototype.valInput = function (element) {
    if (element.type === 'checkbox') {
      return element.checked
    } else if (element.type === 'radio') {
      return this.valRadio(element)
    } else {
      return element.value
    }
  };

  /**
   * Get value of radio element
   * @param {Object} element
   * @return {String} Value
   * @private
   * @memberof FetchForm
   * @instance
   * @method valRadio
   * @example
   * const form = document.querySelector('form')
   * const gender = form.elements.gender;
   * const fetchForm = new FetchForm(form)
   * const value = fetchForm.valRadio(gender)
   * console.log(value)
   * // "male"
   */
  FetchForm.prototype.valRadio = function (element) {
    var name = element.name;
    var radios = this.form.querySelectorAll(("input[name=\"" + name + "\"]"));
    for (var i = 0; i < radios.length; i++) {
      var radio = radios[i];
      if (radio.checked) {
        return radio.value
      }
    }
    return null
  };

  /**
   * Get value of textarea element
   * @param {Object} element
   * @return {String} Value
   * @private
   * @memberof FetchForm
   * @instance
   * @method valTextarea
   * @example
   * const form = document.querySelector('form')
   * const fetchForm = new FetchForm(form)
   * const value = fetchForm.valRadio(element)
   * console.log(value)
   * // "Hello world"
   */
  FetchForm.prototype.valTextarea = function (element) {
    return element.value
  };

  return FetchForm;

}));
//# sourceMappingURL=fetchform.js.map
