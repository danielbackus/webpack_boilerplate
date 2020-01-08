import { logger } from '@lib/utils';

const makePromisesSafe = () =>
  process.on('unhandledRejection', err => {
    logger.error(err);
  });

export default {
  makePromisesSafe,
};
