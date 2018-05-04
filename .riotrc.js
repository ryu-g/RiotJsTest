const pug = require('pug')

module.exports = {
  template: 'pug',
  parsers: {
    html: {
      pug: html => pug.compile(html)
    }
  }
}
