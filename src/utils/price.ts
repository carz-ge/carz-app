import {Product, ProductDetailsCarPrice} from '../graphql/operations';

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

export function getMinAndMaxPackagePriceInGel(
  carsAndPrices: ProductDetailsCarPrice[],
): {min: number | null; max: number | null} {
  let min: number | null = null;
  let max: number | null = null;

  carsAndPrices.forEach(carAndPrice => {
    if (carAndPrice.price) {
      if (min === null || carAndPrice.price < min) {
        min = carAndPrice.price;
      }
      if (max === null || carAndPrice.price > max) {
        max = carAndPrice.price;
      }
    }
  });
  return {
    min,
    max,
  };
}

export function getPriceRangeForPackage(
  packages: ProductDetailsCarPrice[],
): string | null {
  const {min, max} = getMinAndMaxPackagePriceInGel(packages);
  if (!min || !max) {
    return null;
  }
  if (min === max) {
    return convertPriceIntoGel(min);
  }

  return `${convertPriceIntoGel(min)} - ${convertPriceIntoGel(max)}`;
}
