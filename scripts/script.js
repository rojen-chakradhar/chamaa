const menu = [
  {
    id: 1,
    name: "Special Brownie",
    desc: "best",
    price: 300,
    image: "./assets/images/special.webp",
    src: "special",
  },
  {
    id: 2,
    name: "Fuzzy Brownie",
    desc: "tasty",
    price: 200,
    image: "./assets/images/fuzzy.webp",
    src: "fudgy",
  },
  {
    id: 3,
    name: "Cakey Brownie",
    desc: "delicous",
    price: 200,
    image: "./assets/images/cakey.webp",
    src: "cakey",
  },
  {
    id: 4,
    name: "Nuts Brownie",
    desc: "tasty",
    price: 200,
    image: "./assets/images/nuts.webp",
    src: "nuts",
  },
  {
    id: 5,
    name: "Brownie Bites",
    desc: "tasty",
    price: 50,
    image: "./assets/images/bites.webp",
    src: "bites",
  },
  {
    id: 6,
    name: "Red Velvet Brownie",
    desc: "tasty",
    price: 250,
    image: "./assets/images/red-velvet.webp",
    src: "red-velvet",
  }
];

const grid = document.querySelector("#menuGrid");
const MIN_PIECES = 10;
const STEP = 10;

grid.innerHTML = menu.map(item => `
  <div class="m-item" data-src="${item.src}">
    <img src="${item.image}" class="m-img" loading="lazy" alt="${item.name}">
    <h3 class="m-title">${item.name}</h3>
    <p class="m-price">Rs ${item.price} / 10 pieces</p>
    <div class="m-item-a">
      <i class="ri-subtract-line m-icon" data-action="dec" data-src="${item.src}"></i>
      <p class="m-num" data-src="${item.src}">${MIN_PIECES}</p>
      <i class="ri-add-line m-icon" data-action="inc" data-src="${item.src}"></i>
    </div>
    <button class="m-btn cta" data-src="${item.src}">add to cart</button>
  </div>
`).join("");

grid.addEventListener("click", (e) => {
  const icon = e.target.closest(".m-icon");
  if (icon) {
    const action = icon.dataset.action;
    const src = icon.dataset.src;
    const numEl = grid.querySelector(`.m-num[data-src="${src}"]`);
    if (!numEl) return;
    let val = parseInt(numEl.textContent, 10) || MIN_PIECES;
    if (action === "inc") val += STEP;
    if (action === "dec") val = Math.max(MIN_PIECES, val - STEP);
    numEl.textContent = val;
    return;
  }

  const btn = e.target.closest(".m-btn");
  if (btn) {
    const src = btn.dataset.src;
    const numEl = grid.querySelector(`.m-num[data-src="${src}"]`);
    const qtyPieces = parseInt(numEl.textContent, 10) || MIN_PIECES;
    addToCart(src, qtyPieces);
  }
});

const userOrder = document.querySelector("#order");

function autoResize() {
  if (!userOrder) return;
  userOrder.style.height = "auto"
  userOrder.style.height = userOrder.scrollHeight + "px"
}

if (userOrder) userOrder.addEventListener("input", autoResize);
let totalPiecesText = document.getElementById("totalPiecesText");
let totalPriceText = document.getElementById("totalPriceText");

function formatPrice(n) {
  return `Rs ${n}`;
}

function updateOrderSummary() {
  const cart = JSON.parse(localStorage.getItem("cart")) || []
  let totalPieces = 0
  let totalPrice = 0
  let text = "";
  cart.forEach(item => {
    totalPieces += item.qty;
    const linePrice = (item.qty / 10) * item.price;
    totalPrice += linePrice;
    text += `${item.name} x ${item.qty} = ${formatPrice(linePrice)}\n`;
  })
  if (totalPiecesText) totalPiecesText.innerHTML = totalPieces;
  if (totalPriceText) totalPriceText.innerHTML = formatPrice(totalPrice);
  if (userOrder) {
    userOrder.value = text
    autoResize()
  }
}

function addToCart(src, qtyPieces = MIN_PIECES) {
  const item = menu.find(product => product.src === src);
  if (!item) {
    console.error("Item not found:", src);
    return;
  }
  if (qtyPieces < MIN_PIECES || qtyPieces % STEP !== 0) {
    alert(`Minimum order is ${MIN_PIECES} pieces and must be in multiples of ${STEP}.`);
    return;
  }
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(product => product.src === src);
  if (existing) {
    existing.qty += qtyPieces;
  } else {
    cart.push({
      src: item.src,
      name: item.name,
      price: item.price,
      qty: qtyPieces
    });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateOrderSummary();
  renderCartPopup();
}

const cartEl = document.getElementById("cart");
const cartIcon = document.querySelector('.cart-icon');

function renderCartPopup() {
  if (!cartEl) return;
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    cartEl.innerHTML = `<div class="cart-empty"><p>Your cart is empty</p></div>`;
    return;
  }
  let html = '<div class="cart-header"><h3>Your cart</h3><button class="cart-close">✕</button></div>';
  html += '<div class="cart-items">';
  cart.forEach(item => {
    const linePrice = (item.qty / 10) * item.price;
    html += `
      <div class="cart-item" data-src="${item.src}">
        <div class="ci-left">
          <p class="ci-name">${item.name}</p>
          <p class="ci-price">${formatPrice(linePrice)}</p>
        </div>
        <div class="ci-right">
          <button class="ci-dec" data-src="${item.src}">-</button>
          <span class="ci-qty" data-src="${item.src}">${item.qty}</span>
          <button class="ci-inc" data-src="${item.src}">+</button>
          <button class="ci-remove" data-src="${item.src}">remove</button>
        </div>
      </div>
    `;
  });
  html += '</div>';
  const totals = cart.reduce((acc, item) => {
    acc.pieces += item.qty;
    acc.price += (item.qty / 10) * item.price;
    return acc;
  }, {pieces: 0, price: 0});
  html += `
  <div class="cart-footer">
    <div class="c-f-wrapper">
      <p>Total: ${formatPrice(totals.price)} (${totals.pieces} pieces)</p>
      <button class="cta clear-btn" id="clear" onclick="clearCart()">Clear</button>
    </div>
    <a href="#contact" onclick="toggleCart()"><button class="cta">Go to Checkout</button></a>
  </div>`;
  cartEl.innerHTML = html;
}

function clearCart() {
  localStorage.clear()
  updateOrderSummary()
  renderCartPopup()
}

function toggleCart() {
  if (!cartEl) return;
  cartEl.classList.toggle('show');
  if (cartEl.classList.contains('show')) renderCartPopup();
}

if (cartIcon) cartIcon.addEventListener('click', toggleCart);

if (cartEl) {
  cartEl.addEventListener('click', (e) => {
    const inc = e.target.closest('.ci-inc');
    const dec = e.target.closest('.ci-dec');
    const remove = e.target.closest('.ci-remove');
    const close = e.target.closest('.cart-close');
    const orderBtn = e.target.closest('.order-whatsapp');

    if (close) { cartEl.classList.remove('show'); return; }
    if (inc) {
      const src = inc.dataset.src;
      changeCartQty(src, STEP);
      return;
    }
    if (dec) {
      const src = dec.dataset.src;
      changeCartQty(src, -STEP);
      return;
    }
    if (remove) {
      const src = remove.dataset.src;
      removeFromCart(src);
      return;
    }
    if (orderBtn) {
      openWhatsAppOrder();
      return;
    }
  });
}

function changeCartQty(src, deltaPieces) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const item = cart.find(i=>i.src===src);
  if (!item) return;
  item.qty = Math.max(MIN_PIECES, item.qty + deltaPieces);
  if (item.qty % STEP !== 0) item.qty = Math.round(item.qty / STEP) * STEP;
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCartPopup();
  updateOrderSummary();
}

function removeFromCart(src) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(i=>i.src!==src);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCartPopup();
  updateOrderSummary();
}

function openWhatsAppOrder() {
  const userName = document.querySelector("#userName").value || '';
  const phoneNumber = document.querySelector("#phoneNumber").value || '';
  const userAddress = document.querySelector("#address").value || '';
  const orderNotes = document.querySelector("#notes").value || '';
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.length === 0) { alert('Cart is empty'); return; }
  for (const item of cart) {
    if (item.qty < MIN_PIECES || item.qty % STEP !== 0) {
      alert(`Each item must be at least ${MIN_PIECES} pieces and in multiples of ${STEP}.`);
      return;
    }
  }
  let total = 0;
  let msg = '*New Order*\n';
  if (userName) msg += `Name: ${userName}\n`;
  if (phoneNumber) msg += `Phone: ${phoneNumber}\n`;
  if (userAddress) msg += `Address: ${userAddress}\n\n`;
  msg += 'Order:\n';
  cart.forEach(item=>{
    const linePrice = (item.qty / 10) * item.price;
    total += linePrice;
    msg += `${item.name} * ${item.qty} = Rs ${linePrice}\n`;
  });
  if (orderNotes) msg += `\nNotes:\n${orderNotes}\n`;
  msg += `\nTotal: Rs ${total}`;
  window.open(`https://wa.me/9779746428695?text=${encodeURIComponent(msg)}`, '_blank');
}

updateOrderSummary();
renderCartPopup();

const orderForm = document.querySelector('#orderForm');
if (orderForm) {
  orderForm.addEventListener('submit', function(e){
    e.preventDefault();
    openWhatsAppOrder();
  });
}
