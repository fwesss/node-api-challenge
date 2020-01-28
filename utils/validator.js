import Validation from 'folktale/validation'

const { Success, Failure } = Validation

export const validator = (errorString, predicate) => o =>
  predicate(o) ? Success(o) : /* otherwise */ Failure([errorString])

export const didItValidate = validationErrors =>
  validationErrors.matchWith({
    Success: () => true,
    Failure: () => false,
  })
