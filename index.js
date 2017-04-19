const template = require('hof-govuk-template');

const partials = require('hof-template-partials');

module.exports = options => {
  return template(options);
};

module.exports.views = partials.views;
module.exports.translations = partials.resources();
