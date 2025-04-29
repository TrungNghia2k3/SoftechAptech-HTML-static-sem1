async function fetchProducts() {
  try {
    const response = await fetch("data.json");
    const data = await response.json();
    return data.products; // trả về mảng products
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

function addToCart(productId, quantity) {
  // Lấy cart từ localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Kiểm tra xem sản phẩm đã tồn tại chưa
  const existingProduct = cart.find((item) => item.productId === productId);

  if (existingProduct) {
    // Nếu đã có thì cộng thêm số lượng
    existingProduct.quantity += quantity;
  } else {
    // Nếu chưa có thì thêm mới
    cart.push({ productId, quantity });
  }

  // Lưu lại cart vào localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Cập nhật số lượng giỏ hàng
  updateCartNumber();

  // Cập nhật lại giỏ hàng hiển thị
  renderCartTable();

  // Gọi hàm showToast thông báo
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
  const cartNumber = document.querySelector(".cart-number");
  cartNumber.innerText = cart.length;
}

// TOGGLE HIỂN THỊ GIỎ HÀNG
const cartIcon = document.querySelector(".cart-icon");
const showCartDiv = document.getElementById("showcart");

cartIcon.addEventListener("click", () => {
  showCartDiv.classList.toggle("active");
  if (showCartDiv.classList.contains("active")) {
    renderCartTable();
  }
});

async function renderCartTable() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const tbody = document.getElementById("mycart");
  tbody.innerHTML = "";

  const allProducts = await fetchProducts(); // <- phải await

  if (cart.length === 0) {
    const emptyRow = document.createElement("tr");
    emptyRow.innerHTML = `
      <td colspan="7" style="text-align: center;">There are no products in the cart</td>
    `;
    tbody.appendChild(emptyRow);
    return;
  }

  cart.forEach((item) => {
    const product = allProducts.find((p) => p.id === item.productId);

    if (!product) {
      return; // bỏ qua nếu không tìm thấy sản phẩm
    }

    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${product.image}" width="50"/></td>
      <td>${product.name}</td>
      <td>$${product.discountPrice}</td>
      <td>${item.quantity}</td>
      <td>$${(product.discountPrice * item.quantity).toFixed(3)}</td>
      <td><button class="delete-from-cart" onclick="deleteFromCart(${product.id})">
            <i class="fa-solid fa-trash"></i>
          </button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function deleteFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((item) => item.productId !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartNumber();
  renderCartTable();
}

window.addEventListener("DOMContentLoaded", () => {
  updateCartNumber();
});
