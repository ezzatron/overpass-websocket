module.exports = function unmarshalExecute (header) {
  var namespace = header[2]
  var command = header[3]

  if (typeof namespace !== 'string') throw new Error('Invalid EXECUTE message header (namespace).')
  if (typeof command !== 'string') throw new Error('Invalid EXECUTE message header (command).')

  return {namespace: namespace, command: command}
}
