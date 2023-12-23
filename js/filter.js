const name_item = document.querySelectorAll(".name");
// const search_item = document.getElementById("search-item");
const element_cakes = document.querySelectorAll(".product");
const filter_button = document.querySelectorAll("#filter_button .btn");
const h1_price = document.querySelectorAll(".price-discount");

Array.from(filter_button).forEach(function (button) {
  button.addEventListener("click", function (event) {
    for (let i = 0; i < filter_button.length; i++) {
      filter_button[i].classList.remove("active");
    }
    this.classList.add("active");

    let buttonAttr = event.target.dataset.filter;
    // let buttonAttr = button.getAttribute('data-filter');
    Array.from(element_cakes).forEach(function (element) {
      let elementAttr = element.dataset.item; // lấy giá trị data-* dùng getAttribute hoặc dataset
      if (buttonAttr === elementAttr || buttonAttr === "all") {
        element.style.display = "block";
      } else {
        element.style.display = "none";
      }
    });
  });
});
