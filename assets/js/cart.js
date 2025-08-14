const cart = JSON.parse(localStorage.getItem('cart')) || []; // Load cart from Local Storage
const exchangeRate = 83; // Example: 1 USD ≈ 83 INR (Update with the latest rate)
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart)); // Save cart to Local Storage
}

function displayCart() {
    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = ""; // Clear old content
    const cartTotalBox = document.getElementById('cart-total-box');
    const cartTotal = document.getElementById('cart-total');
    const billTotal = document.getElementById('bill-total');

    if (cart.length === 0) {
        cartContainer.innerHTML = `<p class="no-products">Your cart is empty.</p>`;
        cartTotalBox.classList.add("hidden");
        return;
    }

    let total = 0;

    cart.forEach((item, index) => {
        let priceNumber = parseFloat(item.price.replace(/[^\d.]/g, "")); // Extracts numeric value from "₹60"
        total += priceNumber * item.quantity;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
            <div class="item-photo">
                <div class="cover">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                </div>
                <div class="item-details">
                    <div>
                        <h3>${item.name}</h3>
                        <p>${item.desc}</p>
                    </div>
                    <div>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" class="bi bi-truck" viewBox="0 0 16 16">
                                <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A2 2 0 0 1 4.732 11h5.536a2 2 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
                            </svg> Delivered by April 4, 2025
                        </span>
                    </div>
            </div>
            <div class="item-total">
                <b>${item.price} x ${item.quantity}</b>
                <span class="quantity-container">
                    <button>Quantity</button>
                    <span>${item.quantity}</span>
                </span>
            </div>
            <div class="remove">
                <button onclick="removeFromCart(${index})">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                </button>
            </div>
        `;

        cartContainer.appendChild(cartItem);
    });

    let totalINR = total + 49.78 - 167.18;
    // Update total amount in INR & show the box
    cartTotal.innerText = `₹${total.toFixed(2)}`;
    billTotal.innerText = `₹${totalINR.toFixed(2)}`
    cartTotalBox.classList.remove("hidden");
}

function updateQuantity(id, change){
    const cartItem = cart.find(item => item.id === id);
    if(!cartItem) return;

    cartItem.quantity += change;
    if(cartItem.quantity <= 0){
        cart = cart.filter(item => item.id !== id);
    }

    updateCartCount();
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity++; // Increase quantity if product exists
    } else {
        cart.push({ ...product, quantity: 1 }); // Add new product
    }

    saveCart(); // Save cart to Local Storage
    updateCartCount();
    displayCart(); // Refresh the cart display// Refresh the cart display
}



function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').innerText = count;
    document.getElementById('innTxt').innerText = count;

    const cartIndicator = document.getElementById('cart-indicator');
    if (count > 0) {
        cartIndicator.style.display = "block"; // Show red dot
    } else {
        cartIndicator.style.display = "none"; // Hide red dot
    }
}


function removeFromCart(index) {
    cart.splice(index, 1); // Remove item from cart
    saveCart(); // Save updated cart
    displayCart(); // Refresh UI
    updateCartCount(); // Update count
}


document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    displayCart();
});
