const products = [
    { name: "Sony 4K Smart TV", price: 55990, image: "/assets/tv.jpg" },
    { name: "Asus Laptop", price: 45990, image: "/assets/asus.jpg" },
    { name: "Asics Running Shoes", price: 2299, image: "/assets/shoes.jpg" },
    { name: "Hublot Watch", price: 3295, image: "/assets/h.jpg" },
    { name: "Clothes", price: 499, image: "/assets/c1.jpg" },
    { name: "Cosmetics", price: 399, image: "/assets/cosmetic.jpg" },
    { name: "Smartphone", price: 15999, image: "/assets/smart-phone.jpg" },
    { name: "Wireless Headphones", price: 2999, image: "/assets/headphone.jpg" },
    { name: "Digital Camera", price: 25999, image: "/assets/camera.jpg" },
    { name: "Coffee Mug", price: 499, image: "/assets/cofee-mug.jpg" },
    { name: "Bestseller Book", price: 299, image: "/assets/book.jpg" },
    { name: "Casual Watch", price: 1499, image: "/assets/watch.jpg" }
];

let cartItems = [];

// Add to cart
document.querySelectorAll('.add-to-cart').forEach((button, index) => {
    button.addEventListener('click', () => {
        const quantity = parseInt(document.querySelectorAll('.quantity')[index].innerText);
        const product = { ...products[index], quantity };
        cartItems.push(product);
        updateCart();
        alert("Product added to cart!");
    });
});

// Update cart UI
function updateCart() {
    const cartModal = document.querySelector('.cart-modal');
    const cartItemsList = document.querySelector('.cart-items');
    const totalPrice = document.querySelector('.total-price');

    cartItemsList.innerHTML = '';
    let total = 0;

    cartItems.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('cart-item');

        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.name;
        div.appendChild(img);

        const text = document.createElement('div');
        text.textContent = `${item.name} - ₹${item.price}`;
        div.appendChild(text);

        const quantityDiv = document.createElement('div');
        quantityDiv.classList.add('quantity-controls');

        const minus = document.createElement('button');
        minus.textContent = "-";
        minus.onclick = () => updateQuantity(item, -1);

        const qtySpan = document.createElement('span');
        qtySpan.textContent = item.quantity;

        const plus = document.createElement('button');
        plus.textContent = "+";
        plus.onclick = () => updateQuantity(item, 1);

        quantityDiv.append(minus, qtySpan, plus);
        div.appendChild(quantityDiv);

        cartItemsList.appendChild(div);

        total += item.price * item.quantity;
    });

    totalPrice.textContent = total;
    document.querySelector('.cart').textContent = `Cart (${cartItems.length})`;
    cartModal.style.display = 'block';
}

// Update Quantity
function updateQuantity(item, change) {
    const index = cartItems.indexOf(item);
    if(index !== -1) {
        cartItems[index].quantity += change;
        if(cartItems[index].quantity <= 0) cartItems.splice(index, 1);
        updateCart();
    }
}

// Login Modal
const loginBtn = document.querySelector('.login');
const loginModal = document.querySelector('.login-modal');
const closeLogin = document.querySelector('.close-login');

loginBtn.addEventListener('click', () => loginModal.style.display = 'block');
closeLogin.addEventListener('click', () => loginModal.style.display = 'none');

// Cart Modal Close Button
document.querySelector('.close-cart').addEventListener('click', () => {
    document.querySelector('.cart-modal').style.display = 'none';
});
