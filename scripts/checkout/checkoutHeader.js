import { calculateQuantityCart } from "../../data/cart.js";

export function renderCheckoutHeader() {
    const quantity = calculateQuantityCart();
    document.querySelector('.js-return-to-home-link').innerHTML = `${quantity} items`; 
  }