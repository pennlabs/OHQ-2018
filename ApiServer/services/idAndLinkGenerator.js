const uuid = require('uuid/v4')

module.exports = function(obj) {
  const classId = uuid()
  const fourDigitIds = []
  // generate link candidates until we find two that don't exist yet
  while (fourDigitIds.length < 2) {
    const candidates = uuid().split('-').slice(1, 4)
    for (const candidate of candidates) {
      if (!obj.hasOwnProperty(candidate)) {
        fourDigitIds.push(candidate)
      }
    }
  }
  return {
    studentLink: fourDigitIds[0],
    TALink: fourDigitIds[1],
    classId
  }
}
