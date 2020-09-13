class RecordAlreadyExistsException extends Error {
  constructor(recordType) {
    super(`${recordType} already exists`);
    this.name = this.constructor.name;
  }
  toString() {
    return {
      type: this.name,
      message: this.message,
    };
  }
}

module.exports = {
  RecordAlreadyExistsException,
};
