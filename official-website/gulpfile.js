const { src, series } = require('gulp')
const sftp = require('gulp-fez-sftp')

// Notice: ftppass.json is out of version control for security
const ftppass = require('./ftppass.json')

function upload () {
  return src('dist/**')
    .pipe(sftp(ftppass.keyMain))
}

exports.default = series(upload)
