const { RecordDoesNotExistException, OperationException } = require('../exceptions');
module.exports = async (inputs) => {
  try {
    let { Model, name, id } = inputs;
    let data = await Model.findById(id);
    if (!data) {
      throw new RecordDoesNotExistException.RecordDoesNotExistException(name);
    }
    return data
  } catch (err) {
    switch (err.name) {
      case 'RecordDoesNotExistException':
      case 'OperationException':
        throw err;
      default:
        throw new OperationException.OperationException(err.message);
    }
  }
}
