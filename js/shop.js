// Biến global
let allProducts = [];
let currentProducts = [];
let currentPage = 1;
const itemsPerPage = 8;

// Fetch dữ liệu từ data.json
async function fetchData() {
  try {
    const res = await fetch("data.json");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

// Render sản phẩm ra HTML
function renderProducts(products) {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedProducts = products.slice(start, end);

  if (paginatedProducts.length === 0) {
    productList.innerHTML = "<p>No products found.</p>";
    return;
  }

  paginatedProducts.forEach((product) => {
    const productItem = document.createElement("div");
    productItem.classList.add("product-item");

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

    // Gắn sự kiện click cho icon thêm vào giỏ hàng
    productItem.querySelector(".add-to-cart").addEventListener("click", () => {
      const quantityInput = productItem.querySelector("input[name='quantity']");
      const quantity = parseInt(quantityInput.value) || 1;
      addToCart(product.id, quantity);
    });

    productList.appendChild(productItem);
  });

  renderPagination(products.length);
}

// Render nút phân trang
function renderPagination(totalItems) {
  const pagination = document.querySelector(".pagination");
  pagination.innerHTML = "";

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (currentPage > 1) {
    const prev = document.createElement("a");
    prev.href = "#";
    prev.innerHTML = "&laquo;";
    prev.addEventListener("click", () => {
      currentPage--;
      renderProducts(currentProducts);
    });
    pagination.appendChild(prev);
  }

  for (let i = 1; i <= totalPages; i++) {
    const page = document.createElement("a");
    page.href = "#";
    page.innerText = i;
    if (i === currentPage) page.classList.add("active");
    page.addEventListener("click", () => {
      currentPage = i;
      renderProducts(currentProducts);
    });
    pagination.appendChild(page);
  }

  if (currentPage < totalPages) {
    const next = document.createElement("a");
    next.href = "#";
    next.innerHTML = "&raquo;";
    next.addEventListener("click", () => {
      currentPage++;
      renderProducts(currentProducts);
    });
    pagination.appendChild(next);
  }
}

// Sự kiện Search sản phẩm
document.getElementById("button-search").addEventListener("click", function () {
  const searchInput = document
    .getElementById("search-input")
    .value.toLowerCase();
  const filtered = currentProducts.filter((p) =>
    p.name.toLowerCase().includes(searchInput)
  );
  currentPage = 1;
  renderProducts(filtered);
});

// Sự kiện Filter (All, Combo)
document.querySelectorAll("#filter_button a").forEach((button) => {
  button.addEventListener("click", function () {
    document
      .querySelector("#filter_button a.active")
      .classList.remove("active");
    this.classList.add("active");

    const filter = this.getAttribute("data-filter");

    if (filter === "all") {
      currentProducts = [...allProducts.products, ...allProducts.combo];
    } else if (filter === "combo") {
      currentProducts = allProducts.combo;
    }

    currentPage = 1;
    renderProducts(currentProducts);
  });
});

// Hàm init
async function init() {
  allProducts = await fetchData();
  currentProducts = [...allProducts.products, ...allProducts.combo];
  renderProducts(currentProducts);
}

// Khi load trang thì render products
init();