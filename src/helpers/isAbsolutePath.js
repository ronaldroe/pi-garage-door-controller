const isAbsolutePath = path => {

  const regex = /^\/{1}/;

  return Array.isArray(path.match(regex));

}

module.exports = isAbsolutePath;