const variety = [
  {
    name: "Fuzzy Brownie",
    desc: "tasty",
    price: "Rs 200",
    image: "https://nakednutrition.com/cdn/shop/articles/Depositphotos_8628296_S_2000x.jpg?v=1689059503",
    src: "fudgy",
  },
  {
    name: "Cakey Brownie",
    desc: "delicous",
    price: "Rs 500",
    image: "https://www.soulfullymade.com/wp-content/uploads/2023/03/cake-brownies-recipe-square-featured.jpg",
    src: "cakey",
  },
  {
    name: "Brownie Bites",
    desc: "tasty",
    price: "Rs 50",
    image: "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2021/11/11/REE_DRUMMOND_DARK_CHOCOLATE_BROWNIE_BITES_H.jpg.rend.hgtvcom.1280.1280.suffix/1636679032846.webp",
    src: "bites",
  },
  {
    name: "Red Velvet Brownie",
    desc: "tasty",
    price: "Rs 250",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKIt9CtMu4xc-SSS4yib7Wadx7fW1g1JEbhxCqXs-DgbP1oHQWVCMYBSDR&s=10",
    src: "red-velvet",
  },
]
let grid = document.querySelector("#menuGrid");
variety.forEach(type => {
  grid.innerHTML += `
  <a href="./${type.src}.html">
  <div class="item">
    <img src="${type.image}" alt="${type.name}'s image">
    <h3>${type.name}</h3>
    <div class="item-bottom">
      <p>${type.price}</p>
      <i class="ri-shopping-cart-line"></i>
    </div>
    </div>
  </a>`;
});