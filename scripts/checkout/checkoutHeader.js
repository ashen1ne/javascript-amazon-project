import { cart } from "../../data/cart-class.js";


export function renderCheckoutHeader() {
    const quantity = cart.calculateQuantityCart();
    document.querySelector('.js-return-to-home-link').innerHTML = `${quantity} items`; 
  }