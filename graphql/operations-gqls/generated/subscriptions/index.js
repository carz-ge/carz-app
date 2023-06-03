const fs = require('fs');
const path = require('path');

module.exports.subscribeToQueue = fs.readFileSync(
  path.join(__dirname, 'subscribeToQueue.gql'),
  'utf8',
);
module.exports.askSage = fs.readFileSync(
  path.join(__dirname, 'askSage.gql'),
  'utf8',
);
