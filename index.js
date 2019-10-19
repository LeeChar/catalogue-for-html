import catalogueForHtml from './src';

const root = typeof self == 'object' && self.self === self && self ||
  typeof global == 'object' && global.global === global && global ||
  this;

if (root === window) {
  root.catalogueForHtml = catalogueForHtml;
}

export default catalogueForHtml;
