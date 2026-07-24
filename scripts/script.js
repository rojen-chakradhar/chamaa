const menu = [
  {
    id: 1,
    name: "Special Brownie",
    desc: "best",
    price: 200,
    image: "https://nakednutrition.com/cdn/shop/articles/Depositphotos_8628296_S_2000x.jpg?v=1689059503",
    src: "special",
  },
  {
    id: 2,
    name: "Fuzzy Brownie",
    desc: "tasty",
    price: 200,
    image: "https://nakednutrition.com/cdn/shop/articles/Depositphotos_8628296_S_2000x.jpg?v=1689059503",
    src: "fudgy",
  },
  {
    id: 3,
    name: "Cakey Brownie",
    desc: "delicous",
    price: 500,
    image: "https://www.soulfullymade.com/wp-content/uploads/2023/03/cake-brownies-recipe-square-featured.jpg",
    src: "cakey",
  },
  {
    id: 4,
    name: "Nuts Brownie",
    desc: "tasty",
    price: 150,
    image: "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2021/11/11/REE_DRUMMOND_DARK_CHOCOLATE_BROWNIE_BITES_H.jpg.rend.hgtvcom.1280.1280.suffix/1636679032846.webp",
    src: "nuts",
  },
  {
    id: 5,
    name: "Brownie Bites",
    desc: "tasty",
    price: 50,
    image: "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2021/11/11/REE_DRUMMOND_DARK_CHOCOLATE_BROWNIE_BITES_H.jpg.rend.hgtvcom.1280.1280.suffix/1636679032846.webp",
    src: "bites",
  },
  {
    id: 6,
    name: "Red Velvet Brownie",
    desc: "tasty",
    price: 250,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKIt9CtMu4xc-SSS4yib7Wadx7fW1g1JEbhxCqXs-DgbP1oHQWVCMYBSDR&s=10",
    src: "red-velvet",
  }
];

const grid = document.querySelector("#menuGrid");
grid.innerHTML = menu.map(item => `
  <div class="m-item">
    <img src="${item.image}" class="m-img" loading="lazy" alt="${item.name}">
    <h3 class="m-title">${item.name}</h3>
    <div class="m-item-bottom">
      <p class="m-price">${item.price}</p>
      <i class="ri-shopping-cart-line m-icon" data-src="${item.src}"></i>
    </div>
  </div>
`).join("");

let count = 0;
grid.addEventListener("click", (e) => {
  const icon = e.target.closest(".m-icon");
  if (!icon) return;
  console.log(icon.dataset.src);
  addToCart(icon.dataset.src);
  count++;
});

const userOrder = document.querySelector("#order");
function addToCart(src) {
  const item = menu.find(product => product.src === src);
  if (!item) {
    console.error("Item not found:", src);
    return;
  }
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(product => product.src === src);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({
      src: item.src,
      name: item.name,
      price: item.price,
      qty: 1
    });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  console.log(cart);
  userOrder.value += `${count}.${item.name}\n`
}

document.querySelector("#orderForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const userName = document.querySelector("#userName").value;
  const phoneNumber = document.querySelector("#phoneNumber").value;
  const userAddress = document.querySelector("#address").value;
  const orderNotes = document.querySelector("#notes").value;
  const orderBtn = document.querySelector("#orderBtn");
  const cart = JSON.parse(localStorage.getItem("cart")) || []
  let total = 0
  let msg = "*New Order *\n"
  msg += `Name: ${userName}\n`
  msg += `Phone Number: ${phoneNumber}\n`
  msg += `Address: ${userAddress}\n\n`
  msg += `Order:\n`
  cart.forEach(item=> {
    total += item.price * item.qty;
    msg += `${item.name} * ${item.qty} = Rs ${item.price * item.qty}\n`
  })
  msg += `\nNotes:\n${orderNotes}\n\n`
  msg += `Total: Rs ${total}`
  window.open(`https://wa.me/9779746428695?text=${encodeURIComponent(msg)}`, "_blank")
})