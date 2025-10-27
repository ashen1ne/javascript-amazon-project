import { cart } from '../../data/cart-class.js';
import { getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import { hello } from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { calculateDeliveryDate, deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';
import { renderCheckoutHeader } from './checkoutHeader.js';

export function renderOrderSummary() {

  let cartSummaryHTML = '';

  cart.cartItems.forEach((cartItem) => {

    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;
    
    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const dateString = calculateDeliveryDate(deliveryOption);

    cartSummaryHTML += `
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id} js-cart-item-container">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price js-product-price-${matchingProduct.id}">
                  ${matchingProduct.getPriceMulQuantity(cartItem)}
                </div>
                <div class="product-quantity js-product-quantity-${matchingProduct.id}">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-link"
                  data-product-id="${matchingProduct.id}">
                    Update
                  </span>
                  <input class="quantity-input js-quantity-input-${matchingProduct.id}">
                  <span class="save-quantity-link link-primary js-save-link"
                  data-product-id="${matchingProduct.id}">
                    Save
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link 
                    js-delete-link-${matchingProduct.id}"
                    data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingProduct, cartItem)}
              </div>
            </div>
          </div>
    `;
    
  });
  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;


  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {

      const dateString = calculateDeliveryDate(deliveryOption);

      const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)}`;

      const isCheked = deliveryOption.id === cartItem.deliveryOptionId

      html += `
        <div class="delivery-option js-delivery-option"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}">
          <input type="radio"
            ${isCheked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} - Shipping
            </div>
          </div>
        </div>
      `
    });

    return html
  }



  function updateCartQauntity() {
    const quantity = cart.calculateQuantityCart();
    document.querySelector('.js-return-to-home-link').innerHTML = `${quantity} items`; 
  }

  renderCheckoutHeader();

  document.querySelectorAll('.js-delete-link').forEach((deleteLink) => {
    deleteLink.addEventListener('click', () => {
      const productId = deleteLink.dataset.productId;
      cart.removeFromCart(productId);

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      
      container.remove();
      
      updateCartQauntity();
      renderPaymentSummary();
    });
  });

  document.querySelectorAll('.js-update-link').forEach((updateLink) => {
    updateLink.addEventListener(('click'), () => {
      const productId = updateLink.dataset.productId;
      console.log(productId);
      const cartContainer = document.querySelector(`.js-cart-item-container-${productId}`);
      cartContainer.classList.add('is-editing-quantity');
    });
  }); 

  document.querySelectorAll('.js-save-link').forEach((saveLink) => {
    saveLink.addEventListener(('click'), () => {
    const productId = saveLink.dataset.productId;
    const quantityInput = document.querySelector(`.js-quantity-input-${productId}`)
    const updateQuantityValue = Number(quantityInput.value);
    const cartContainer = document.querySelector(`.js-cart-item-container-${productId}`);

    cartContainer.classList.remove('is-editing-quantity');

    document.querySelector(`.js-quantity-label-${productId}`).innerHTML = updateQuantityValue;

    cart.updateQuantity(productId, updateQuantityValue);
    
    updateCartQauntity();
    renderPaymentSummary();
    renderOrderSummary();
    });
  }); 

  updateCartQauntity();

  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const { productId, deliveryOptionId } = element.dataset
      cart.updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    })
  });
}