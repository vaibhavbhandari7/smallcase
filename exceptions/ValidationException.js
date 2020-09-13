class ValidationException extends Error {
  constructor(additionalInfo) {
    super('Validation Error');
    this.additionalInfo = additionalInfo;
    this.name = this.constructor.name;
  }

  toString() {
    return {
      type: this.name,
      additionalInfo: this.additionalInfo,
    };
  }
}

module.exports = {
  ValidationException,
};
