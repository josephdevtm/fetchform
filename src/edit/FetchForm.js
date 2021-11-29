import { FetchFormError } from "../Errors"

export default class FetchForm {
  /**
   * Fetch form data
   * @param {Object} form
   * @param {Object} options
   * @return {Object} Form data
   * @memberof FetchForm
   * @instance
   * @example
   * const form = document.querySelector('form')
   * // options is optional
   * const options = {
   *   includeEmpty: false,
   *   includeDisabled: false,
   *   includeHidden: false
   * }
   * const fetchForm = new FetchForm(form, options)
   * const data = fetchForm.getData()
   * console.log(data)
   * // { username: 'John Doe' }
   */
  constructor(form, options = {
    includeDisabled: false,
    includeEmpty: true,
    includeHidden: true
  }) {
    this.form = form
    this.options = options
    this.data = this.getData()
    this.submit = this.submit.bind(this)
  }

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
   * //   "name": "John Doe",
   * //   "email": "johndoe@example.com",
   * //   "website": "http://example.com",
   * //   "age": "25"
   * // }
   */

  getData() {
    const data = {}
    const form = this.form
    const options = this.options
    const elements = form.elements

    for (let i = 0; i < elements.length; i++) {
      let element = elements[i]

      data[element.name] = this.val(element)

      if (options.includeEmpty === false && data[element.name] === '') {
        delete data[element.name]
      }

      if (options.includeDisabled === false && element.disabled) {
        delete data[element.name]
      }

      if (options.includeHidden === false && element.type === 'hidden') {
        delete data[element.name]
      }
    }

    return data
  }

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
   *  event.preventDefault()
   *  const data = fetchform.getData()
   * })
   */
  submit(callback) {
    const form = this.form

    form.onsubmit = callback
  }

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
  val(element) {
    if (element.tagName === 'SELECT') {
      return this.valSelect(element)
    } else if (element.tagName === 'INPUT') {
      return this.valInput(element)
    } else if (element.tagName === 'TEXTAREA') {
      return this.valTextarea(element)
    } else {
      throw new FetchFormError(`Unknown element type: ${element.tagName}`)
    }
  }

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
  valSelect(element) {
    const options = element.options
    const values = []

    for (let i = 0; i < options.length; i++) {
      let option = options[i]

      if (option.selected) {
        values.push(option.value)
      }
    }

    return values
  }

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
  valInput(element) {
    if (element.type === 'checkbox') {
      return element.checked
    } else if (element.type === 'radio') {
      return this.valRadio(element)
    } else {
      return element.value
    }
  }

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
  valRadio(element) {
    const name = element.name
    const radios = this.form.querySelectorAll(`input[name="${name}"]`)
    for (let i = 0; i < radios.length; i++) {
      const radio = radios[i]
      if (radio.checked) {
        return radio.value
      }
    }
    return null
  }

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
  valTextarea(element) {
    return element.value
  }
}
