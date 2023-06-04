const fs = require('fs');
const path = require('path');

module.exports.subscribeToQueue = fs.readFileSync(
  path.join(__dirname, 'subscribeToQueue.gql'),
  'utf8',
);
