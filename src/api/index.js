import {} from 'dotenv/config';
import { connect } from '@lib/db';
import utils from '@lib/utils';
import { createServer } from 'restify';

const init = () => {
  const db = connect();
  console.log('creating API server');
  const server = createServer();
  server.listen(process.env.API_PORT || 8080);
  console.log(
    `API server is listening on port ${process.env.API_PORT || 8080}`
  );
};

init();
