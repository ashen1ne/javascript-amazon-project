export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
    orders.unshift(order);
    saveToStorage();
}

export function calculateOrderPlaced(orderTime) {
    const date = new Date(orderTime);
    const formatedDate = date.toLocaleDateString('en',{
        month: 'long',
        day: 'numeric'
    })

    return formatedDate;
}

function saveToStorage() {
    localStorage.setItem('orders', JSON.stringify(orders));
}

console.log(orders);