class FetchFormError extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
    this.name = 'FetchFormError'
  }
}

export { FetchFormError }
