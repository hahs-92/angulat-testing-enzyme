import { faker } from '@faker-js/faker';
//models
import { Product } from './product.models';

export const generateOneProduct = (): Product => {
  return {
    id: faker.datatype.uuid(),
    title: faker.commerce.productName(),
    price: parseInt(faker.commerce.price(), 10),
    description: faker.commerce.productDescription(),
    category: {
      id: faker.datatype.uuid(),
      name: faker.commerce.department(),
    },
    images: [faker.image.imageUrl(), faker.image.imageUrl()],
  };
};

export const generateManyProducts = (size = 10) => {
  return Array.from({ length: size }, () => generateOneProduct());
};
