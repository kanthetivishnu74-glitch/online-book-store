const cartItemsContainer = document.getElementById("cart-items");
const totalContainer = document.getElementById("cart-total");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let total = 0;

if (cart.length === 0) {
  cartItemsContainer.innerHTML = "<p>Your cart is empty</p>";
  totalContainer.innerText = "";
} else {
  cart.forEach((item, index) => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;

    cartItemsContainer.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" width="80">
        <p><strong>${item.name}</strong></p>
        <p>${item.author}</p>
        <p>Price: ₹${item.price}</p>
        <p>Quantity: ${item.qty}</p>
        <p>Subtotal: ₹${itemTotal}</p>

        <button onclick="removeFromCart(${index})">
          Remove
        </button>
        <hr>
      </div>
    `;
  });

  totalContainer.innerText = "Total Amount: ₹" + total;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}
