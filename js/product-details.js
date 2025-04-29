// 1. Hàm lấy id từ URL
function getProductIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

// 3. Hàm render chi tiết sản phẩm
async function renderProductDetails() {
  const productId = getProductIdFromUrl();
  const products = await fetchProducts();

  if (!products) return;

  const product = products.find((p) => p.id == productId); // tìm product có id khớp

  if (!product) {
    document.getElementById(
      "product-details"
    ).innerHTML = `<div class="content"><p>Product not found!</p></div>`;
    return;
  }

  // Render ra HTML
  const productDetailsHTML = `
  <div class="content">  
      <div class="product-image">
          <img src="${product.image}" alt="${product.name}" />
      </div>
      <div class="product-content">
        <div class="product-name">
          <h3>${product.name}</h3>
        </div>
        <div class="product-price">
          <span class="price-discount">$${product.discountPrice}</span>
          <span class="price-standard">$${product.originalPrice}</span>
        </div>
        <div class="product-description">
          <p>${product.description}</p>
        </div>
        <div class="btn-groups">
          <button class="add-cart-btn">
            <i class="fas fa-shopping-cart"></i>
            Add to cart
          </button>
        </div>
      </div>
  </div>
`;

  const container = document.getElementById("product-details");
  container.innerHTML = productDetailsHTML;

  // Gắn sự kiện cho nút Add to Cart
  const addCartBtn = container.querySelector(".add-cart-btn");
  addCartBtn.addEventListener("click", () => {
    const cartContainer = document.querySelector(".showcart");
    addToCart(product.id, 1, cartContainer);
  });
}

// 4. Gọi hàm khi load trang
renderProductDetails();
