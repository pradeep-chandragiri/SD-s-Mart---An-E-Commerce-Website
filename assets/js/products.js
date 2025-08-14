// Local product data (instead of an API)
const products = [
    { 
        id: 1,
        image: "assets/images/pexels-athena-1777467.jpg",
        tag: "#BestSeller",
        name: "Converse Chuck Taylor All Star",
        desc: "classic and popular style, recognizable by their canvas material, rubber toe cap, and signature white laces.",
        price: "₹4,799",
        category: "shoes"
    },
    { 
        id: 2,
        image: "assets/images/pexels-tima-miroshnichenko-7946294.jpg",
        tag: "🛹 #SkaterFashion",
        name: "Skater Edge Black Denim",
        desc: "The Skater Edge Black Denim is a stylish and durable pair of jeans designed for urban streetwear and skateboarding enthusiasts. Featuring a slim-straight fit, cropped length, and high-quality black denim fabric, these jeans provide both comfort and flexibility for everyday wear. The minimalistic design pairs well with sneakers and jackets, making it a versatile wardrobe essential.",
        price: "₹2,597",
        category: "mens clothing"
    },
    { 
        id: 3,
        image: "assets/images/pexels-carolinoportraits-2914284.jpg",
        tag: "🔥#StreetwearEssential",
        name: "Layered Urban Comfort Set",
        desc: "A cozy fashion-forward combination of a beige cable-knit turtleneck and a black-and-green plaid oversized flannel. The layered look is both warm and stylish, perfect for fall and winter.",
        price: "₹3,249",
        category: "women clothing"
    },
    { 
        id: 4,
        image: "assets/images/pexels-tima-miroshnichenko-7936508.jpg",
        tag: "💙 #DenimLover",
        name: "Retro Light-Wash Wide-Leg Jeans",
        desc: "These vintage-inspired light-wash denim jeans offer a relaxed wide-leg fit for ultimate comfort and style. The high-waisted cut and slightly faded texture give off a classic ’90s streetwear vibe, making them perfect for casual wear or skater fashion.",
        price: "₹4,500",
        category: "mens clothing"
    }
];


function displayProducts(productList) {
    const container = document.getElementById('products-list');
    container.innerHTML = "";

    if (productList.length === 0) {
        container.innerHTML = `<h3 class="no-products">No products available in this category.</h3>`;
        return;
    }

    // Get wishlist from localStorage
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    productList.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('card');
        

        // Check if product is in wishlist
        const isInWishlist = wishlist.some(item => item.id === product.id);

        card.innerHTML = `
            <div class="image-container" title="${product.name}">
                <div class="img-cover">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="star-lay">
                    <div class="top">
                        <button class="wishlist-icon" onclick="toggleWishlist(${product.id}, this)">
                            <svg aria-label="Notifications" width="24" height="24" role="img" fill="${isInWishlist ? 'var(--pink)' : 'transparent'}"
                            color="${isInWishlist ? 'var(--pink)' : 'white'}" viewBox="0 0 32 32" class="x1lliihq x135i0dr x2lah0s x1f5funs x1n2onr6 x1bl4301 x3egl4o" style="--fill: transparent; --height: 30px; --width: 30px;"><title>Cart</title><path d="M5.5 12.8568C5.5 17.224 9.22178 21.5299 15.0332 25.2032C15.3554 25.397 15.7401 25.5909 16 25.5909C16.2703 25.5909 16.655 25.397 16.9668 25.2032C22.7782 21.5299 26.5 17.224 26.5 12.8568C26.5 9.11212 23.8698 6.5 20.4599 6.5C18.4847 6.5 16.9356 7.39792 16 8.74479C15.0851 7.40812 13.5257 6.5 11.5401 6.5C8.14059 6.5 5.5 9.11212 5.5 12.8568Z" stroke="currentColor" stroke-width="2"></path></svg>
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

        container.appendChild(card);
    });

    // Store product data in localStorage to access it on product.html
    localStorage.setItem("products", JSON.stringify(products));
}


function filterByCategory(category) {
    let filteredProducts;
    let seeAllBtn = document.querySelector(".product-all");
    if (category === "all") {

        filteredProducts = products;
        seeAllBtn.classList.add("active");

    } else if (category === "mens") {

        filteredProducts = products.filter(product => product.category.includes("mens"));
        seeAllBtn.classList.remove("active");

    } else if (category === "women") {

        filteredProducts = products.filter(product => product.category.includes("women"));
        seeAllBtn.classList.remove("active");

    } else if (category === "clothing") {

        filteredProducts = products.filter(product => product.category.includes("clothing"));
        seeAllBtn.classList.remove("active");

    } else {

        filteredProducts = products.filter(product => product.category === category);
        seeAllBtn.classList.remove("active");

    }

    displayProducts(filteredProducts);
}

// Function to update cart count in the navbar
function updateCartCount() {
    document.getElementById('cart-count').innerText = cart.length;
}



function toggleWishlist(productId, element) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const product = products.find(p => p.id === productId);

    if (!product) return;

    const index = wishlist.findIndex(item => item.id === productId);
    if (index !== -1) {
        wishlist.splice(index, 1); // Remove from wishlist
        element.querySelector("svg").setAttribute("fill", "transparent");
        element.querySelector("svg").setAttribute("color", "white");
    } else {
        wishlist.push(product); // Add to wishlist
        element.querySelector("svg").setAttribute("fill", "var(--pink)");
        element.querySelector("svg").setAttribute("color", "var(--pink)");
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
}






document.querySelectorAll(".filter-item").forEach(item => {
    item.addEventListener("click", function () {
        document.querySelectorAll(".filter-item").forEach(btn => btn.classList.remove("active"));
        this.classList.add("active");

        const selectedCategory = this.getAttribute("data-category");
        filterByCategory(selectedCategory);
    });
});

function goToProduct(productId) {
    window.location.href = `loadPage('product.html?id=${productId}')`;
}

displayProducts(products);