const fs = require('fs');
const path = require('path');

module.exports.sendOtp = fs.readFileSync(
  path.join(__dirname, 'sendOtp.gql'),
  'utf8',
);
module.exports.authorize = fs.readFileSync(
  path.join(__dirname, 'authorize.gql'),
  'utf8',
);
module.exports.checkPhoneForManger = fs.readFileSync(
  path.join(__dirname, 'checkPhoneForManger.gql'),
  'utf8',
);
module.exports.authenticateManager = fs.readFileSync(
  path.join(__dirname, 'authenticateManager.gql'),
  'utf8',
);
module.exports.addCar = fs.readFileSync(
  path.join(__dirname, 'addCar.gql'),
  'utf8',
);
module.exports.removeCar = fs.readFileSync(
  path.join(__dirname, 'removeCar.gql'),
  'utf8',
);
module.exports.updateCar = fs.readFileSync(
  path.join(__dirname, 'updateCar.gql'),
  'utf8',
);
module.exports.createCategory = fs.readFileSync(
  path.join(__dirname, 'createCategory.gql'),
  'utf8',
);
module.exports.updateCategory = fs.readFileSync(
  path.join(__dirname, 'updateCategory.gql'),
  'utf8',
);
module.exports.removeCategory = fs.readFileSync(
  path.join(__dirname, 'removeCategory.gql'),
  'utf8',
);
module.exports.sendPushNotification = fs.readFileSync(
  path.join(__dirname, 'sendPushNotification.gql'),
  'utf8',
);
module.exports.sendSmsNotification = fs.readFileSync(
  path.join(__dirname, 'sendSmsNotification.gql'),
  'utf8',
);
module.exports.createOrder = fs.readFileSync(
  path.join(__dirname, 'createOrder.gql'),
  'utf8',
);
module.exports.createProductDetails = fs.readFileSync(
  path.join(__dirname, 'createProductDetails.gql'),
  'utf8',
);
module.exports.updateProductDetails = fs.readFileSync(
  path.join(__dirname, 'updateProductDetails.gql'),
  'utf8',
);
module.exports.removeProductDetails = fs.readFileSync(
  path.join(__dirname, 'removeProductDetails.gql'),
  'utf8',
);
module.exports.createProduct = fs.readFileSync(
  path.join(__dirname, 'createProduct.gql'),
  'utf8',
);
module.exports.updateProduct = fs.readFileSync(
  path.join(__dirname, 'updateProduct.gql'),
  'utf8',
);
module.exports.removeProduct = fs.readFileSync(
  path.join(__dirname, 'removeProduct.gql'),
  'utf8',
);
module.exports.createProvider = fs.readFileSync(
  path.join(__dirname, 'createProvider.gql'),
  'utf8',
);
module.exports.updateProvider = fs.readFileSync(
  path.join(__dirname, 'updateProvider.gql'),
  'utf8',
);
module.exports.removeProvider = fs.readFileSync(
  path.join(__dirname, 'removeProvider.gql'),
  'utf8',
);
module.exports.scheduleCarForService = fs.readFileSync(
  path.join(__dirname, 'scheduleCarForService.gql'),
  'utf8',
);
module.exports.updateUser = fs.readFileSync(
  path.join(__dirname, 'updateUser.gql'),
  'utf8',
);
module.exports.removeUser = fs.readFileSync(
  path.join(__dirname, 'removeUser.gql'),
  'utf8',
);
module.exports.addDeviceToken = fs.readFileSync(
  path.join(__dirname, 'addDeviceToken.gql'),
  'utf8',
);
