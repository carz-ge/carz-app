import {Product} from '../graphql/operations';

export function calculateMinPrice(product: Product): number | null {
  return (
    product.packages
      ?.map(item => {
        return item.pricesForCarTypes
          ?.filter(price => price.price)
          .reduce((prev, curr) => {
            if (prev.price === null || curr.price === null) {
              return prev;
            }
            return prev.price < curr.price ? prev : curr;
          })?.price;
      })
      .reduce((prev, curr) => {
        if (!prev && !curr) {
          return null;
        }
        if (!prev) {
          return curr;
        }
        if (!curr) {
          return prev;
        }
        return prev < curr ? prev : curr;
      }) || null
  );
}

export function convertPriceIntoGel(price: number): string {
  return `${price / 100}.${price % 100}`;
}

export function getMinProductPriceInGel(product: Product) {
  const minPrice = calculateMinPrice(product);
  return minPrice ? convertPriceIntoGel(minPrice) : null;
}
