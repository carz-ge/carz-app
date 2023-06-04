import fs from 'fs';

const modulePath = 'node_modules/react-native-maps';

// https://github.com/react-native-maps/react-native-maps/issues/4641#issuecomment-1473775067
function updateMapsPackage(): void {
  fs.writeFileSync(
    `${modulePath}/lib/index.web.js`,
    'module.exports = {}',
    'utf-8',
  );
  fs.copyFileSync(
    `${modulePath}/lib/index.d.ts`,
    `${modulePath}/lib/index.web.d.ts`,
  );
  const pkg = JSON.parse(
    fs.readFileSync(`${modulePath}/package.json`, 'utf-8'),
  );
  pkg['react-native'] = 'lib/index.js';
  pkg.main = 'lib/index.web.js';
  fs.writeFileSync(
    `${modulePath}/package.json`,
    JSON.stringify(pkg, null, 2),
    'utf-8',
  );
}

try {
  updateMapsPackage();
  console.log('Package update completed successfully.');
} catch (error) {
  console.error('Error updating package:', error);
}
