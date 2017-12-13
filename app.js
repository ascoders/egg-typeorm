'use strict';

const typeorm = require('./lib/typeorm');

module.exports = app => {
  if (app.config.typeorm.app) typeorm(app);
};
