let items = [
  {
    name: "Brownie",
    desc: "tasty",
    price: "Rs 200",
    image: "",
  },
  {
    name: "cake",
    desc: "delicous",
    price: "Rs 500",
    image: ","
  },
  {
    name: "Brownie byte",
    desc: "tasty",
    price: "Rs 50",
    image: "",
  },
  {
    name: "red valvet Brownie",
    desc: "tasty",
    price: "Rs 250",
    image: "",
  },
]

let item = document.querySelectorAll(".item");

items.forEach(elm => {
  item.forEach(el => {
    el.innerHTML=`<h2>${elm.name}</h2><p>${elm.desc}</p><p>${elm.price}</p>`
    el.addEventListener("click", () => {
      window.location.href = "http://127.0.0.1:5500/item.html"
      localStorage.setItem("name", elm.name);
      localStorage.setItem("description", elm.desc);
      localStorage.setItem("price", elm.price);
      localStorage.setItem("image", elm.image);
    })
  });
});