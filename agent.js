'use strict';

const typeorm = require('./lib/typeorm');

module.exports = agent => {
  if (agent.config.typeorm.agent) typeorm(agent);
};
