const BASEAPI = 'https://scblockchain.netlify.app/.netlify/functions/api';
module.exports = {
  PUSH: BASEAPI + '/PushMessages',
  PULL: BASEAPI + '/PullMessages',
};
