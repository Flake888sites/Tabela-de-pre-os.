document.addEventListener('DOMContentLoaded', loadPrices);

const form = document.getElementById('priceForm');
const priceTableBody = document.getElementById('priceTableBody');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const productName = document.getElementById('productName').value;
    const productPrice = document.getElementById('productPrice').value;

    addProduct(productName, productPrice);
    form.reset();
});

function getPrices() {
    return JSON.parse(localStorage.getItem('prices')) || [];
}

function savePrices(prices) {
    localStorage.setItem('prices', JSON.stringify(prices));
}

function addProduct(name, price) {
    const prices = getPrices();
    prices.push({ name, price: parseFloat(price).toFixed(2) });
    savePrices(prices);
    loadPrices();
}

function deleteProduct(index) {
    const prices = getPrices();
    prices.splice(index, 1);
    savePrices(prices);
    loadPrices();
}

function loadPrices() {
    priceTableBody.innerHTML = '';
    const prices = getPrices();

    prices.forEach((product, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${product.name}</td>
            <td>R$ ${product.price}</td>
            <td><button onclick="deleteProduct(${index})" class="deleteBtn">Excluir</button></td>
        `;

        priceTableBody.appendChild(row);
    });
}
