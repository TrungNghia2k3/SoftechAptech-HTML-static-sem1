async function fetchProducts() {
  try {
    const response = await fetch("data.json");
    const data = await response.json();
    return data.products; // trả về mảng products
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

