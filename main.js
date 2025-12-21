const featuredContainer = document.getElementById("featured-books");

if (featuredContainer) {
  products.slice(0, 3).forEach(product => {
    featuredContainer.innerHTML += `
      <div class="book-card">
        <img src="${product.image}">
        <h3>${product.name}</h3>
        <p>${product.author}</p>
        <p>₹${product.price}</p>
        <a href="products.html">View More</a>
      </div>
    `;
  });
}
const productsContainer = document.getElementById("products-container");
const searchInput = document.getElementById("search");

function displayProducts(list) {
  if (!productsContainer) return;

  productsContainer.innerHTML = "";

  list.forEach(product => {
    productsContainer.innerHTML += `
      <div class="book-card">
        <img src="${product.image}">
        <h3>${product.name}</h3>
        <p>${product.author}</p>
        <p>₹${product.price}</p>

        <button onclick="addToCart(${product.id})">Add to Cart</button>
        <a href="product-details.html?id=${product.id}">View Details</a>
      </div>
    `;
  });
}

if (productsContainer) {
  displayProducts(products);
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const value = this.value.toLowerCase();

      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(value) ||
        product.author.toLowerCase().includes(value)
      );

      displayProducts(filtered);
    });
  }
}
function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
}
const detailsContainer = document.getElementById("product-details");

if (detailsContainer && typeof products !== "undefined") {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));

  const product = products.find(p => p.id === id);

  if (product) {
    detailsContainer.innerHTML = `
  <div class="details-card">
    <img src="${product.image}" alt="${product.name}">

    <h2>${product.name}</h2>

    <p><strong>Author:</strong> ${product.author}</p>
    <p><strong>Price:</strong> ₹${product.price}</p>
    <p><strong>Language:</strong> ${product.language || "English"}</p>
    <p><strong>Publisher:</strong> ${product.publisher || "Not mentioned"}</p>
    <p><strong>Pages:</strong> ${product.pages || "N/A"}</p>
    <p><strong>Rating:</strong> ⭐ ${product.rating || "4.5"}</p>

    <p><strong>Description:</strong><br>
    ${product.description || "No description available."}</p>

    <button onclick="addToCart(${product.id})">
      Add to Cart
    </button>

    <br><br>
    <a href="products.html" class="back-btn">
      ← Back to Products
    </a>
  </div>
`;
  }
}

const toggle = document.getElementById("darkToggle");

if (localStorage.getItem("darkMode") === "enabled") {
  document.body.classList.add("dark");
}

if (toggle) {
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
      localStorage.setItem("darkMode", "enabled");
    } else {
      localStorage.setItem("darkMode", "disabled");
    }
  });
}

