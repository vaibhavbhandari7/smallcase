const { RecordAlreadyExistsException, OperationException } = require('../exceptions/');

module.exports = async (inputs) => {
  try {
    let { Model, name, data } = inputs;
    let RecordExist = await Model.findOne({ ...data });
    if (RecordExist) {
      throw new RecordAlreadyExistsException.RecordAlreadyExistsException(name);
    }
    return true;
  } catch (err) {
    switch (err.name) {
      case 'RecordAlreadyExistsException':
        throw err;
      default:
        throw new OperationException.OperationException(err.message);
    }
  }
}
