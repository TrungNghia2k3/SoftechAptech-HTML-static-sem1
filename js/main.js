// Javacript for img slider navigation
const btns = document.querySelectorAll(".nav-btn");
const slides = document.querySelectorAll(".img-slide");
// const contents = document.querySelectorAll(".content");

var sliderNav = function (index) {
  btns.forEach((btn) => {
    btn.classList.remove("active");
  });
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });
  // contents.forEach((content) => {
  //   // content.classList.remove("active");
  // });
  btns[index].classList.add("active");
  slides[index].classList.add("active");
  // contents[index].classList.add("active");
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
