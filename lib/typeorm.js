'use strict';

const assert = require('assert');
const { createConnection } = require('typeorm');

let count = 0;

module.exports = app => {
  app.addSingleton('typeorm', createOneClient);
};

function createOneClient(config, app) {
  assert(config.host && config.port && config.user && config.database,
    `[egg-typeorm] 'host: ${config.host}', 'port: ${config.port}', 'user: ${config.user}', 'database: ${config.database}' are required on config`);

  app.coreLogger.info('[egg-typeorm] connecting %s@%s:%s/%s',
config.user, config.host, config.port, config.database);

  const connectConfig = {
    type: 'mysql',
    host: config.host,
    port: config.port,
    username: config.user,
    password: config.password,
    database: config.database,
    synchronize: !!config.synchronize,
  };

  if (connectConfig.entities) {
    connectConfig.entities = config.entities;
  }

  if (connectConfig.subscribers) {
    connectConfig.subscribers = config.subscribers;
  }

  app.beforeStart(function* () {
    const connection = yield createConnection(connectConfig);

    const rows = yield connection.manager.query('select 1 as column1;');
    const index = count++;
    app.coreLogger.info(`[egg-typeorm] instance[${index}] status OK, rds currentTime: ${rows[0].currentTime}`);

    app.typeorm = connection;
  });
  return createConnection;
}
