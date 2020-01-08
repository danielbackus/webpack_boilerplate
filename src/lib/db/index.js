import { logger } from '@lib/utils';

export const connect = async () => {
  logger.log('connecting to database');
  return Promise.resolve({});
};
