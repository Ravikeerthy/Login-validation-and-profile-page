document.addEventListener("DOMContentLoaded", function () {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

document.addEventListener("DOMContentLoaded", function() {
    let products = JSON.parse(localStorage.getItem("products")) || [];

    let productContainer = document.getElementById("productContainer");

    function displayProducts() {
        productContainer.innerHTML = "";  

        if (products.length === 0) {
            productContainer.innerHTML = "<p>No products available.</p>";
        } else {
            products.forEach(product => {
                let card = document.createElement("div");
                card.className = "col-md-4 mb-3";
                card.innerHTML = `
                    <div class="card shadow-sm">
                        <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}" style="height: 200px; object-fit: cover;">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text"> $${product.price}</p>
                        </div>
                    </div>
                `;
                productContainer.appendChild(card);
            });

            document.querySelectorAll(".addToCart").forEach(button => {
                button.addEventListener("click", function() {
                    let productId = this.getAttribute("data-id");
                    let selectedProduct = products.find(product => product.id == productId);
                    addToCart(selectedProduct);
                });
            });
        }
    }

    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${product.name} added to cart!`);
    }

    displayProducts();
});
