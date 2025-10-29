import { orders } from "../data/orders.js";
import { formatCurrency } from "../scripts/utils/money.js"; 
import { calculateOrderPlaced } from '../data/orders.js';
import { getProduct, loadProductsFetch } from "../data/products.js";
import { cart } from "../data/cart-class.js";

async function loadPage() {
    try {
        //throw 'error1';
        await loadProductsFetch();
    } catch(error) {
        console.log('Unexpected error. Please try again later.');
    }
    renderOrdersGrid();
}

loadPage();


function renderOrdersGrid() {
    let ordersHTML = `

    `;

    orders.forEach((order) => {
        ordersHTML += `
            <div class="order-container">
            
            <div class="order-header">
                <div class="order-header-left-section">
                <div class="order-date">
                    <div class="order-header-label">Order Placed:</div>
                    <div>${calculateOrderPlaced(order.orderTime)}</div>
                </div>
                <div class="order-total">
                    <div class="order-header-label">Total:</div>
                    <div>$${formatCurrency(order.totalCostCents)}</div>
                </div>
                </div>

                <div class="order-header-right-section">
                <div class="order-header-label">Order ID:</div>
                <div>${order.id}</div>
                </div>
            </div>

            <div class="order-details-grid js-order-details-grid">
                ${renderOrderDetails(order)}
            </div>
            </div>
        `
    });

    document.querySelector(`.js-orders-grid`).innerHTML = ordersHTML;

    document.querySelectorAll('.js-buy-again').forEach((buyAgainBtn) => {
        buyAgainBtn.addEventListener('click', () => {
            const { productId } = buyAgainBtn.dataset;
            console.log(productId)
            cart.addToCart(productId);
        });
    });
}

function renderOrderDetails(order) {

    let orderProductDetails = `
    
    `;
    order.products.forEach((product) => {

    const matchingProduct = getProduct(product.productId);


    orderProductDetails += `
        <div class="product-image-container">
        <img src="${matchingProduct.image}">
        </div>

        <div class="product-details">
        <div class="product-name">
            ${matchingProduct.name}
        </div>
        <div class="product-delivery-date">
            Arriving on: ${calculateOrderPlaced(product.estimatedDeliveryTime)}
        </div>
        <div class="product-quantity">
            Quantity: ${product.quantity}
        </div>
        <button class="buy-again-button button-primary js-buy-again"
        data-product-id="${matchingProduct.id}">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
        </button>
        </div>

        <div class="product-actions">
        <a href="tracking.html?orderId=123&productId=456">
            <button class="track-package-button button-secondary">
            Track package
            </button>
        </a>
        </div>
    `;

    });
    return orderProductDetails;
}