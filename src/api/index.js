import {} from 'dotenv/config';
import { logger, promises } from '@lib/utils';
import { createServer } from 'restify';

const init = async () => {
  promises.makePromisesSafe();

  logger.log('creating API server');
  const server = createServer();
  server.listen(process.env.API_PORT || 8080);
  logger.log(`API server is listening on port ${process.env.API_PORT || 8080}`);
};

init();
