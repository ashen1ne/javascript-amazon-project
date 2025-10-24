export const cart = [
  {
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2
  },
  {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1
  }
];

const addedMessageTimeouts = {};

export function addToCart(productId) {

  let matchingItem;
  const selectorQuantity = document.querySelector(`.js-quantity-selector-${productId}`);
  const selectQuantityValue = Number(selectorQuantity.value);

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
      
    }
  });

  if (matchingItem) {
    matchingItem.quantity += selectQuantityValue;
  } else {
    cart.push({
      productId,
      quantity: selectQuantityValue
    });
  }

  console.log(cart)
}