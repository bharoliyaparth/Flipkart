const products = [
    { name: "Sony 4K Smart TV", price: 55990, image: "/tv.jpg" },
    { name: "Asus Laptop", price: 45990, image: "/asus.jpg" },
    { name: "Asics Running Shoes", price: 2299, image: "/shoes.jpg" },
    { name: "Hublot Watch", price: 3295, image: "/h.jpg" },
    { name: "Clothes", price: 499, image: "/c1.jpg" },
    { name: "Cosmetics", price: 399, image: "/cosmetic.jpg" }
];

let cartItems = [];

// Handle adding items to the cart
document.querySelectorAll('.add-to-cart').forEach((button, index) => {
    button.addEventListener('click', () => {
        const quantity = document.querySelectorAll('.quantity')[index].innerText;
        const product = products[index];

        // Add product to cart with quantity
        const cartItem = { ...product, quantity: parseInt(quantity) };
        cartItems.push(cartItem);

        // Show cart notification
        document.querySelector('.cart-notification').style.display = 'block';
        setTimeout(() => {
            document.querySelector('.cart-notification').style.display = 'none';
        }, 2000); // Hide after 2 seconds

        // Update cart display
        updateCart();
    });
});

// Update Cart UI
function updateCart() {
    const cartModal = document.querySelector('.cart-modal');
    const cartItemsList = document.querySelector('.cart-items'); 
    const totalPrice = document.querySelector('.total-price');

    cartItemsList.innerHTML = ''; // Clear the list

    let total = 0;

    cartItems.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('cart-item');

        // Create and append image
        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.name;
        div.appendChild(img);

        // Create and append product details
        const text = document.createElement('div');
        text.innerHTML = `${item.name} - ₹${item.price}`;
        div.appendChild(text);

        // Add quantity controls
        const quantityDiv = document.createElement('div');
        quantityDiv.classList.add('quantity-controls');
        const minusButton = document.createElement('button');
        minusButton.textContent = '-';
        minusButton.addEventListener('click', () => updateQuantity(item, -1));
        const quantitySpan = document.createElement('span');
        quantitySpan.textContent = item.quantity;
        const plusButton = document.createElement('button');
        plusButton.textContent = '+';
        plusButton.addEventListener('click', () => updateQuantity(item, 1));

        quantityDiv.append(minusButton, quantitySpan, plusButton);
        div.appendChild(quantityDiv);

        cartItemsList.appendChild(div);

        total += item.price * item.quantity;
    });

    totalPrice.textContent = total; // Update total price
    document.querySelector('.cart').textContent = `Cart (${cartItems.length})`; // Update cart count
    cartModal.style.display = 'block';
}

// Update Quantity of items in Cart
function updateQuantity(item, change) {
    const index = cartItems.indexOf(item);
    if (index !== -1) {
        cartItems[index].quantity += change;
        if (cartItems[index].quantity <= 0) cartItems.splice(index, 1); // Remove item if quantity is 0
        updateCart();
    }
}

// Login Modal Logic
const loginButton = document.querySelector('.login');
const loginModal = document.querySelector('.login-modal');
const closeLoginButton = document.querySelector('.close-login');

loginButton.addEventListener('click', () => {
    loginModal.style.display = 'block';
});

closeLoginButton.addEventListener('click', () => {
    loginModal.style.display = 'none';
});

// Handle Cart Button Click
document.querySelector('.cart').addEventListener('click', () => {
    updateCart();
});

// Search Suggestions
const searchInput = document.getElementById('search-input');
const searchSuggestions = document.getElementById('search-suggestions');

searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    if (query.length > 0) {
        const filteredProducts = products.filter(product => product.name.toLowerCase().includes(query));
        searchSuggestions.innerHTML = ''; // Clear previous suggestions

        filteredProducts.forEach(product => {
            const div = document.createElement('div');
            div.textContent = product.name;
            div.addEventListener('click', () => {
                searchInput.value = product.name;
                searchSuggestions.innerHTML = ''; // Hide suggestions after selection
            });
            searchSuggestions.appendChild(div);
        });

        searchSuggestions.style.display = 'block';
    } else {
        searchSuggestions.style.display = 'none';
    }
});
