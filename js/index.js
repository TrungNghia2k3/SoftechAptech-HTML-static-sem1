// Javacript for img slider navigation
const btns = document.querySelectorAll(".nav-btn");
const slides = document.querySelectorAll(".img-slide");

var sliderNav = function (index) {
  btns.forEach((btn) => {
    btn.classList.remove("active");
  });
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });
  btns[index].classList.add("active");
  slides[index].classList.add("active");
};
btns.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    sliderNav(i);
  });
});
// End Javacript for img slider navigation

// Responsive navbar
const bar = document.getElementById("bar");
const nav = document.getElementById("navbar");
const close = document.getElementById("close-bar");

if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });
}

if (close) {
  close.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}

async function fetchProducts() {
  try {
    const response = await fetch("data.json");
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error("Lỗi fetch sản phẩm:", error);
    return [];
  }
}

async function renderProducts() {
  const container = document.getElementById("products-container");
  container.innerHTML = "";

  const products = await fetchProducts();

  products.slice(0, 8).forEach((product) => {
    const productItem = document.createElement("div");
    productItem.className = "product-item";
    productItem.innerHTML = `
      <span class="add-to-cart">
        <i class="fa-solid fa-cart-plus"></i>
      </span>
      <div class="product-img">
        <a href="product-details.html?id=${product.id}">
          <img src="${product.image}" alt="${product.name}" />
        </a>
      </div>
      <div class="price">
        <p class="price-discount">
          <span>$ ${product.discountPrice}</span>
        </p>
        <span class="price-standard">$${product.originalPrice}</span>
        <input 
          type="number" 
          name="quantity"
          min="1"
          value="1" />
      </div>
      <a href="product-details.html?id=${product.id}">
        <h4 class="product-name">${product.name}</h4>
      </a>
      <button>
        <a href="#">Buy now</a>
      </button>
    `;
    
    container.appendChild(productItem);
  });
}

async function renderNewProducts() {
  const container = document.getElementById("new-products-container");
  container.innerHTML = "";

  const products = await fetchProducts();

  products.slice(0, 4).forEach((product) => {
    const productItem = document.createElement("div");
    productItem.className = "product-item";
    productItem.innerHTML = `
      <span class="add-to-cart">
        <i class="fa-solid fa-cart-plus"></i>
      </span>
      <div class="product-img">
        <a href="product-details.html?id=${product.id}">
          <img src="${product.image}" alt="${product.name}" />
        </a>
      </div>
      <div class="price">
        <p class="price-discount">
          <span>$ ${product.discountPrice}</span>
        </p>
        <span class="price-standard">$${product.originalPrice}</span>
        <input 
          type="number" 
          name="quantity"
          min="1"
          value="1" />
      </div>
      <a href="product-details.html?id=${product.id}">
        <h4 class="product-name">${product.name}</h4>
      </a>
      <button>
        <a href="#">Buy now</a>
      </button>
    `;
    container.appendChild(productItem);
  });
}

// Khi load trang thì render products
window.addEventListener("DOMContentLoaded", renderProducts);

// Khi load trang thì render new products
window.addEventListener("DOMContentLoaded", renderNewProducts);
