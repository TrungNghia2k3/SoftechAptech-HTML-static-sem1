const toggleBtn = document.getElementById("menu-toggle");
const canvas = document.getElementById("navbar-canvas");
const closeBtn = document.getElementById("close-canvas");
const overlay = document.getElementById("canvas-overlay");

function openCanvas() {
  canvas.classList.add("active");
  overlay.classList.add("active");
}

function closeCanvas() {
  canvas.classList.remove("active");
  overlay.classList.remove("active");
}

toggleBtn.addEventListener("click", openCanvas);
closeBtn.addEventListener("click", closeCanvas);
overlay.addEventListener("click", closeCanvas);

async function fetchProducts() {
  try {
    const response = await fetch("data.json");
    const data = await response.json();
    return data.products; // trả về mảng products
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

function addToCart(productId, quantity, container = null) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingProduct = cart.find((item) => item.productId === productId);

  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartNumber();

  // Nếu có container thì render cho đúng vùng
  if (container) {
    renderCartTable(container);
  }

  showToast("Product added to cart successfully!");
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast-message";
  toast.innerText = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2000);
}

// CẬP NHẬT SỐ LƯỢNG .cart-number
function updateCartNumber() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartNumberElements = document.querySelectorAll(".cart-number");

  cartNumberElements.forEach((el) => {
    el.innerText = cart.length;
  });
}

// TOGGLE HIỂN THỊ GIỎ HÀNG
const cartIcons = document.querySelectorAll(".cart-icon");

cartIcons.forEach((icon) => {
  const showCart = icon.nextElementSibling;

  icon.addEventListener("click", () => {
    showCart.classList.toggle("active");

    if (showCart.classList.contains("active")) {
      renderCartTable(showCart);
    }
  });
});

async function renderCartTable(container) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const tbody = container.querySelector(".mycart");
  tbody.innerHTML = "";

  const allProducts = await fetchProducts();

  if (cart.length === 0) {
    const emptyRow = document.createElement("tr");
    emptyRow.innerHTML = `
      <td colspan="6" style="text-align: center;">There are no products in the cart</td>
    `;
    tbody.appendChild(emptyRow);
    return;
  }

  cart.forEach((item) => {
    const product = allProducts.find((p) => p.id === item.productId);
    if (!product) return;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${product.image}" width="50"/></td>
      <td>${product.name}</td>
      <td>$${product.discountPrice}</td>
      <td>${item.quantity}</td>
      <td>$${(product.discountPrice * item.quantity).toFixed(3)}</td>
      <td>
        <button class="delete-from-cart" data-id="${product.id}">
          <i class="fa-solid fa-trash"></i>
        </button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

document.addEventListener("click", function (e) {
  if (e.target.closest(".delete-from-cart")) {
    const btn = e.target.closest(".delete-from-cart");
    const productId = parseInt(btn.getAttribute("data-id"));
    const container = btn.closest(".showcart");
    deleteFromCart(productId, container);
  }
});

function deleteFromCart(productId, container) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((item) => item.productId !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartNumber();
  renderCartTable(container);
}

window.addEventListener("DOMContentLoaded", () => {
  updateCartNumber();
});
