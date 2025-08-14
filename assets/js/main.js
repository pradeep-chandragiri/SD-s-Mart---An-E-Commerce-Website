const body = document.body;
let lastScroll = 0;

window.addEventListener("scroll", () => {
	const currentScroll = window.pageYOffset;
	if (currentScroll <= 0) {
		body.classList.remove("scroll-up");
		return;
	}

	if (currentScroll > lastScroll && !body.classList.contains("scroll-down")) {
		body.classList.remove("scroll-down");
		body.classList.add("scroll-up");
	} else if (
		currentScroll < lastScroll &&
		body.classList.contains("scroll-up")
	) {
		body.classList.remove("scroll-up");
		body.classList.add("scroll-down");
	}
	lastScroll = currentScroll;
});


function toggleDiv() {
    const cart = document.getElementById("cart");
    cart.style.display = (cart.style.display === "none" || cart.style.display === "") ? "block" : "none";
}


function toggleWish() {
    const wishList = document.getElementById("wishlist-container");
    wishList.style.display = (wishList.style.display === "none" || wishList.style.display === "") ? "block" : "none";
}