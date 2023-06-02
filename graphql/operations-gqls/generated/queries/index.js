const fs = require('fs');
const path = require('path');

module.exports.checkPhone = fs.readFileSync(
  path.join(__dirname, 'checkPhone.gql'),
  'utf8',
);
module.exports.listCars = fs.readFileSync(
  path.join(__dirname, 'listCars.gql'),
  'utf8',
);
module.exports.listCategories = fs.readFileSync(
  path.join(__dirname, 'listCategories.gql'),
  'utf8',
);
module.exports.echo = fs.readFileSync(path.join(__dirname, 'echo.gql'), 'utf8');
module.exports.echoAuthorized = fs.readFileSync(
  path.join(__dirname, 'echoAuthorized.gql'),
  'utf8',
);
module.exports.echoMono = fs.readFileSync(
  path.join(__dirname, 'echoMono.gql'),
  'utf8',
);
module.exports.echoFlux = fs.readFileSync(
  path.join(__dirname, 'echoFlux.gql'),
  'utf8',
);
module.exports.listOrders = fs.readFileSync(
  path.join(__dirname, 'listOrders.gql'),
  'utf8',
);
module.exports.getOrder = fs.readFileSync(
  path.join(__dirname, 'getOrder.gql'),
  'utf8',
);
module.exports.listOrdersByUserId = fs.readFileSync(
  path.join(__dirname, 'listOrdersByUserId.gql'),
  'utf8',
);
module.exports.listProductDetailsByProductId = fs.readFileSync(
  path.join(__dirname, 'listProductDetailsByProductId.gql'),
  'utf8',
);
module.exports.getProduct = fs.readFileSync(
  path.join(__dirname, 'getProduct.gql'),
  'utf8',
);
module.exports.listProducts = fs.readFileSync(
  path.join(__dirname, 'listProducts.gql'),
  'utf8',
);
module.exports.listProductByCategoryId = fs.readFileSync(
  path.join(__dirname, 'listProductByCategoryId.gql'),
  'utf8',
);
module.exports.listProductByProviderId = fs.readFileSync(
  path.join(__dirname, 'listProductByProviderId.gql'),
  'utf8',
);
module.exports.searchProducts = fs.readFileSync(
  path.join(__dirname, 'searchProducts.gql'),
  'utf8',
);
module.exports.listProviders = fs.readFileSync(
  path.join(__dirname, 'listProviders.gql'),
  'utf8',
);
module.exports.listQueue = fs.readFileSync(
  path.join(__dirname, 'listQueue.gql'),
  'utf8',
);
module.exports.listChatMessages = fs.readFileSync(
  path.join(__dirname, 'listChatMessages.gql'),
  'utf8',
);
module.exports.getMe = fs.readFileSync(
  path.join(__dirname, 'getMe.gql'),
  'utf8',
);
module.exports.getUserById = fs.readFileSync(
  path.join(__dirname, 'getUserById.gql'),
  'utf8',
);
