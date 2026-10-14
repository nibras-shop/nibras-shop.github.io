<<<<<<< HEAD
const SUPABASE_URL = "https://xheziltgghwlavnnwxoc.supabase.co";
const SUPABASE_KEY = "sb_publishable_0C9vtighquCRtTWoPr4pHw_6eTJpGx9";

// Public storefront client. Never put a service-role/secret key here.
const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const WHATSAPP_NUMBER = "96176096582";

const productList = document.getElementById("product-list");
const statusBox = document.getElementById("status");
const productCount = document.getElementById("product-count");
const cartList = document.getElementById("cart-list");
const cartTotal = document.getElementById("cart-total");
const checkoutButton = document.getElementById("checkout");

const cart = new Map();
let products = [];

document.getElementById("year").textContent = new Date().getFullYear();

function escapeHTML(value = "") {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function formatPrice(value) {
  return "$" + Number(value).toFixed(2);
}

async function loadProducts() {
  statusBox.textContent = "جارٍ تحميل المنتجات...";

  const { data, error } = await db
    .from("products")
    .select("id, name, description, price, category, image_url")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    statusBox.textContent =
      "تعذّر تحميل المنتجات. تأكد من بيانات الاتصال وسياسات قاعدة البيانات.";
    console.error(error);
    return;
  }

  products = data || [];
  productCount.textContent = `${products.length} منتجات`;
  statusBox.textContent = products.length
    ? ""
    : "لا توجد منتجات مضافة حاليًا. أضف منتجات من لوحة الإدارة لاحقًا.";

  renderProducts();
}

function renderProducts() {
  productList.innerHTML = products.map((product) => {
    const image = product.image_url
      ? `<img src="${escapeHTML(product.image_url)}" alt="${escapeHTML(product.name)}" loading="lazy">`
      : `<div class="product-placeholder">نبراس</div>`;

    return `
      <article class="product-card">
        ${image}
        <div class="product-info">
          <h3>${escapeHTML(product.name)}</h3>
          <p>${escapeHTML(product.description || product.category || "")}</p>
          <div class="price">${formatPrice(product.price)}</div>
          <button class="add-button" data-add="${escapeHTML(product.id)}">
            أضف إلى السلة
          </button>
        </div>
      </article>
    `;
  }).join("");
}

productList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-add]");
  if (!button) return;

  const id = button.dataset.add;
  const product = products.find((item) => String(item.id) === id);
  if (!product) return;

  cart.set(id, (cart.get(id) || 0) + 1);
  renderCart();
});

function renderCart() {
  if (cart.size === 0) {
    cartList.textContent = "لم تضف أي منتجات بعد.";
    cartTotal.textContent = "$0.00";
    return;
  }

  let total = 0;
  const rows = [];

  for (const [id, quantity] of cart) {
    const product = products.find((item) => String(item.id) === id);
    if (!product) continue;

    total += Number(product.price) * quantity;

    rows.push(`
      <div class="cart-row">
        <span>${escapeHTML(product.name)} × ${quantity}</span>
        <span>${formatPrice(Number(product.price) * quantity)}</span>
        <button class="remove-button" data-remove="${escapeHTML(id)}">
          حذف
        </button>
      </div>
    `);
  }

  cartList.innerHTML = rows.join("");
  cartTotal.textContent = formatPrice(total);
}

cartList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-remove]");
  if (!button) return;

  cart.delete(button.dataset.remove);
  renderCart();
});

checkoutButton.addEventListener("click", () => {
  if (cart.size === 0) {
    alert("أضف منتجًا إلى السلة أولًا.");
    return;
  }

  let total = 0;
  const lines = ["مرحبًا، أريد طلب المنتجات التالية من متجر نبراس:"];

  for (const [id, quantity] of cart) {
    const product = products.find((item) => String(item.id) === id);
    if (!product) continue;

    const subtotal = Number(product.price) * quantity;
    total += subtotal;
    lines.push(`${product.name} × ${quantity} — ${formatPrice(subtotal)}`);
  }

  lines.push(`المجموع: ${formatPrice(total)}`);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;

  window.open(url, "_blank", "noopener,noreferrer");
});

=======
const SUPABASE_URL = "https://xheziltgghwlavnnwxoc.supabase.co";
const SUPABASE_KEY = "sb_publishable_0C9vtighquCRtTWoPr4pHw_6eTJpGx9";

// Public storefront client. Never put a service-role/secret key here.
const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const WHATSAPP_NUMBER = "96176096582";

const productList = document.getElementById("product-list");
const statusBox = document.getElementById("status");
const productCount = document.getElementById("product-count");
const cartList = document.getElementById("cart-list");
const cartTotal = document.getElementById("cart-total");
const checkoutButton = document.getElementById("checkout");

const cart = new Map();
let products = [];

document.getElementById("year").textContent = new Date().getFullYear();

function escapeHTML(value = "") {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function formatPrice(value) {
  return "$" + Number(value).toFixed(2);
}

async function loadProducts() {
  statusBox.textContent = "جارٍ تحميل المنتجات...";

  const { data, error } = await db
    .from("products")
    .select("id, name, description, price, category, image_url")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    statusBox.textContent =
      "تعذّر تحميل المنتجات. تأكد من بيانات الاتصال وسياسات قاعدة البيانات.";
    console.error(error);
    return;
  }

  products = data || [];
  productCount.textContent = `${products.length} منتجات`;
  statusBox.textContent = products.length
    ? ""
    : "لا توجد منتجات مضافة حاليًا. أضف منتجات من لوحة الإدارة لاحقًا.";

  renderProducts();
}

function renderProducts() {
  productList.innerHTML = products.map((product) => {
    const image = product.image_url
      ? `<img src="${escapeHTML(product.image_url)}" alt="${escapeHTML(product.name)}" loading="lazy">`
      : `<div class="product-placeholder">نبراس</div>`;

    return `
      <article class="product-card">
        ${image}
        <div class="product-info">
          <h3>${escapeHTML(product.name)}</h3>
          <p>${escapeHTML(product.description || product.category || "")}</p>
          <div class="price">${formatPrice(product.price)}</div>
          <button class="add-button" data-add="${escapeHTML(product.id)}">
            أضف إلى السلة
          </button>
        </div>
      </article>
    `;
  }).join("");
}

productList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-add]");
  if (!button) return;

  const id = button.dataset.add;
  const product = products.find((item) => String(item.id) === id);
  if (!product) return;

  cart.set(id, (cart.get(id) || 0) + 1);
  renderCart();
});

function renderCart() {
  if (cart.size === 0) {
    cartList.textContent = "لم تضف أي منتجات بعد.";
    cartTotal.textContent = "$0.00";
    return;
  }

  let total = 0;
  const rows = [];

  for (const [id, quantity] of cart) {
    const product = products.find((item) => String(item.id) === id);
    if (!product) continue;

    total += Number(product.price) * quantity;

    rows.push(`
      <div class="cart-row">
        <span>${escapeHTML(product.name)} × ${quantity}</span>
        <span>${formatPrice(Number(product.price) * quantity)}</span>
        <button class="remove-button" data-remove="${escapeHTML(id)}">
          حذف
        </button>
      </div>
    `);
  }

  cartList.innerHTML = rows.join("");
  cartTotal.textContent = formatPrice(total);
}

cartList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-remove]");
  if (!button) return;

  cart.delete(button.dataset.remove);
  renderCart();
});

checkoutButton.addEventListener("click", () => {
  if (cart.size === 0) {
    alert("أضف منتجًا إلى السلة أولًا.");
    return;
  }

  let total = 0;
  const lines = ["مرحبًا، أريد طلب المنتجات التالية من متجر نبراس:"];

  for (const [id, quantity] of cart) {
    const product = products.find((item) => String(item.id) === id);
    if (!product) continue;

    const subtotal = Number(product.price) * quantity;
    total += subtotal;
    lines.push(`${product.name} × ${quantity} — ${formatPrice(subtotal)}`);
  }

  lines.push(`المجموع: ${formatPrice(total)}`);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;

  window.open(url, "_blank", "noopener,noreferrer");
});

>>>>>>> origin/main
loadProducts();