var cart = new Array();
showcart();
showmycart();
//add products button
function addtocart(x) {
  //them vao gio hang
  var boxpr = x.parentElement.children;
  var img = boxpr[0].children[0].src;
  var price = boxpr[1].children[0].children[0].innerText; //price
  var name = boxpr[3].innerText;
  var quantity = parseInt(boxpr[4].value); // quantity
  var sp = new Array(img, price, name, quantity);

  // kiem tra san pham trong gio hang
  var kiemtra = 0;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i][2] == name) {
      kiemtra = 1;
      quantity += parseInt(cart[i][3]);
      cart[i][3] = quantity;
      break;
    }
  }

  if (kiemtra !== 0) {
    return;
  }

  cart.push(sp);
  localStorage.setItem("cart", JSON.stringify(cart));
  showcountsp(); // so luong duoc them
  showmycart();
}
//count number
function showcountsp() {
  document.querySelector(".cart-number").innerHTML = cart.length;
}
document.getElementById("showcart").style.display = "none";
// click show cart
function showcart() {
  var x = document.getElementById("showcart");
  if (x.style.display == "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
  showmycart();
}
// show pay cart
function showpaycart() {
  var cartget = localStorage.getItem("cart");
  if (!cartget) {
    return;
  }
  var cart = JSON.parse(cartget);
  var totalmoney = "";
  var total = 0;
  for (let i = 0; i < cart.length; i++) {
    var money = parseInt(cart[i][1]) * parseInt(cart[i][3]);
    total += money;
    totalmoney +=
      "<tr>" +
      "<td>" +
      (i + 1) +
      "</td>" +
      '<td><img src="' +
      cart[i][0] +
      '" alt="" /></td>' + // img
      "<td>" +
      cart[i][2] +
      "</td>" + // name
      "<td>" +
      cart[i][1] +
      "</td>" + // price
      "<td>" +
      cart[i][3] +
      "</td>" + // quantity
      "<td>" +
      "<div>" +
      money +
      "</div>" + // total
      "</td>" +
      "<td>" +
      '<button class="delete-btn" onclick="deletepr(this)"><i class="fa-solid fa-trash-can"></i></button>' + // delete product
      "</td>" +
      "</tr>";
  }
  totalmoney +=
    "<tr>" +
    '<th colspan="6">Cart Total</th>' +
    "<th>" +
    " <div>" +
    total +
    "$" +
    "</div>" +
    "</th>" +
    "</tr>";
  document.getElementById("payCart").innerHTML = totalmoney;
}
// showcart
function showmycart() {
  var cartget = localStorage.getItem("cart");
  if (!cartget) {
    return;
  }
  cart = JSON.parse(cartget);
  var totalmoney = "";
  var total = 0;
  for (let i = 0; i < cart.length; i++) {
    var money = parseInt(cart[i][1]) * parseInt(cart[i][3]);
    total += money;
    totalmoney +=
      "<tr>" +
      "<td>" +
      (i + 1) +
      "</td>" +
      '<td><img src="' +
      cart[i][0] +
      '" alt="" /></td>' + // img
      "<td>" +
      cart[i][2] +
      "</td>" + // name
      "<td>" +
      cart[i][1] +
      "$" +
      "</td>" + // price
      "<td>" +
      cart[i][3] +
      "</td>" + // quantity
      "<td>" +
      "<div>" +
      money +
      "</div>" + // total
      "</td>" +
      "<td>" +
      '<button class="delete-btn" onclick="deletepr(this)"><i class="fa-solid fa-trash-can"></i></button>' + // delete product
      "</td>" +
      "</tr>";
  }
  totalmoney +=
    "<tr>" +
    '<th colspan="6">Total</th>' +
    "<th>" +
    " <div>" +
    total +
    "$" +
    "</div>" +
    "</th>" +
    "</tr>";

  document.getElementById("mycart").innerHTML = totalmoney;
  showcountsp();
}
//delete button
function deletepr(x) {
  // delete product
  var product = x.parentElement.parentElement;
  var nameProduct = product.children[2].innerText;
  product.remove();

  // delete all products
  for (let i = 0; i < cart.length; i++) {
    if (cart[i][2] == nameProduct) {
      cart.splice(i, 1);
    }
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  showmycart();
  showcountsp();
  showpaycart();
}
//remove button
function removepr() {
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  showmycart();
  showcountsp();
  showpaycart();
}
