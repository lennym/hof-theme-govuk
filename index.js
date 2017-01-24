const path = require('path');

module.exports = {
  views: require('hof-template-partials').views,
  translations: path.resolve(path.dirname(require.resolve('hof-template-partials/package.json')), './translations'),
  setup: require('hof-govuk-template').setup
};
