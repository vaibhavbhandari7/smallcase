module.exports = (inputs) => {

  switch (inputs.name) {
    case 'ValidationException':
      return 400;
    case 'RecordDoesNotExistException':
      return 404;
    case 'RecordAlreadyExistsException':
      return 409;
    case 'OperationException':
      return 500;
    default:
      return 500;
  }
}