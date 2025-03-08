document.addEventListener("DOMContentLoaded", function () {
    const userEmail = localStorage.getItem("email") || "Guest";
    document.getElementById("userEmail").innerText = userEmail;
    document.getElementById("welcomeMessage").innerText = `Welcome, ${userEmail}!`;

    let welcomeModal = new bootstrap.Modal(document.getElementById('welcomeModal'));
    welcomeModal.show();

    let products = JSON.parse(localStorage.getItem("products")) || [
        { name: "Product 1", price: "$10.00", imageUrl: "https://via.placeholder.com/200" },
        { name: "Product 2", price: "$15.00", imageUrl: "https://via.placeholder.com/200" }
    ];

    if (!localStorage.getItem("products")) {
        localStorage.setItem("products", JSON.stringify(products));
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let productContainer = document.getElementById("productContainer");
    let cartList = document.getElementById("cartList");
    let cartCount = document.getElementById("cartCount");

    function displayProducts() {
        productContainer.innerHTML = "";
        products.forEach((product, index) => {
            let card = document.createElement("div");
            card.className = "col-md-4 mb-3";
            card.innerHTML = `
                <div class="card shadow-sm">
                    <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}" style="height: 200px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.price}</p>
                        <button class="btn btn-primary addToCart" data-index="${index}">Add to Cart</button>
                    </div>
                </div>
            `;
            productContainer.appendChild(card);
        });

        document.querySelectorAll(".addToCart").forEach(button => {
            button.addEventListener("click", function () {
                let productIndex = this.getAttribute("data-index");
                cart.push(products[productIndex]);
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCartCount();
                displayCart();
            });
        });
    }

    function displayCart() {
        cartList.innerHTML = "";
        if (cart.length === 0) {
            cartList.innerHTML = "<li class='list-group-item text-muted'>Cart is empty.</li>";
        } else {
            cart.forEach((item, index) => {
                let li = document.createElement("li");
                li.className = "list-group-item d-flex justify-content-between align-items-center";
                li.innerHTML = `${item.name} - ${item.price} 
                                <button class="btn btn-sm btn-danger removeItem" data-index="${index}">Remove</button>`;
                cartList.appendChild(li);
            });

            document.querySelectorAll(".removeItem").forEach(button => {
                button.addEventListener("click", function () {
                    let itemIndex = this.getAttribute("data-index");
                    cart.splice(itemIndex, 1);
                    localStorage.setItem("cart", JSON.stringify(cart));
                    updateCartCount();
                    displayCart();
                });
            });
        }
    }

    function updateCartCount() {
        cartCount.innerText = cart.length;
    }

    document.getElementById("signOut").addEventListener("click", function () {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
        localStorage.removeItem("cart");
        alert("Signed out successfully!");
        window.location.href = "login.html";
    });

    displayProducts();
    displayCart();
    updateCartCount();
});
