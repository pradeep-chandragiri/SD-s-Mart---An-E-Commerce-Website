function displayWishlist() {
    const container = document.getElementById('w-list-container');
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    container.innerHTML = "";

    if (wishlist.length === 0) {
        container.innerHTML = `<p class="no-wishlist">No items in your wishlist.</p>`;
        return;
    }

    wishlist.forEach(product => {
        const item = document.createElement('div');
        item.classList.add('wishlist-item');

        item.innerHTML = `

            <div class="image-container" title="${product.name}">
                <div class="img-cover">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="star-lay">
                    <div class="top">
                        <button class="wishlist-icon"  onclick="removeFromWishlist(${product.id})">
                            <svg aria-label="Notifications" width="24" height="24" role="img" fill="currentcolor"
                            color="var(--pink)" viewBox="0 0 32 32" class="x1lliihq x135i0dr x2lah0s x1f5funs x1n2onr6 x1bl4301 x3egl4o" style="--fill: transparent; --height: 30px; --width: 30px;"><title>Cart</title><path d="M5.5 12.8568C5.5 17.224 9.22178 21.5299 15.0332 25.2032C15.3554 25.397 15.7401 25.5909 16 25.5909C16.2703 25.5909 16.655 25.397 16.9668 25.2032C22.7782 21.5299 26.5 17.224 26.5 12.8568C26.5 9.11212 23.8698 6.5 20.4599 6.5C18.4847 6.5 16.9356 7.39792 16 8.74479C15.0851 7.40812 13.5257 6.5 11.5401 6.5C8.14059 6.5 5.5 9.11212 5.5 12.8568Z" stroke="currentColor" stroke-width="2"></path></svg>
                        </button>
                    </div>
                    <div class="bottom">
                        <button>${product.tag}</button>
                    </div>
                </div>
            </div>
            <div class="details-tag">
                <h3>${product.name}</h3>
                <p>${product.desc}</p>
            </div>
            <div class="add-to-cart">
                <h2>${product.price}</h2>
                <button onclick="addToCart(${product.id})">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" class="bi bi-bag" viewBox="0 0 16 16">
                        <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
                    </svg>
                    Add to cart</button>
            </div>
        `;

        container.appendChild(item);
    });
}

function removeFromWishlist(productId) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    wishlist = wishlist.filter(item => item.id !== productId);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    displayWishlist();
}


function addToWishlist(productId) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const product = products.find(item => item.id === productId);
    const index = wishlist.findIndex(item => item.id === productId);

    if (index === -1) {
        wishlist.push(product); // Add product
    } else {
        wishlist.splice(index, 1); // Remove if already in wishlist
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    updateWishlistUI(); // Update UI for count & heart color
}


function updateWishlistUI() {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const wishlistHeart = document.getElementById("wishlist-heart");

    // If wishlist has items, change heart to red
    if (wishlist.length > 0) {
        wishlistHeart.setAttribute("fill", "var(--pink)");
        wishlistHeart.setAttribute("color", "var(--pink)");
        wishlistHeart.style.color = "var(--pink)";
    } else {
        wishlistHeart.setAttribute("fill", "transparent");
        wishlistHeart.setAttribute("color", "white");
        wishlistHeart.style.color = "var(--pre-secondary)";
    }
}

// Call this function on page load
document.addEventListener("DOMContentLoaded", updateWishlistUI);




// Load wishlist on page load
displayWishlist();