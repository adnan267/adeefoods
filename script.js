const cart = [];
const count = document.getElementById('cartCount');
const toast = document.getElementById('toast');
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
}
document.querySelectorAll('.add-btn').forEach(button => {
  button.addEventListener('click', () => {
    const name = button.dataset.product;
    const price = Number(button.dataset.price);
    cart.push({name, price});
    count.textContent = cart.length;
    button.textContent = '✓ Added';
    setTimeout(() => button.textContent = '＋ Add to Cart', 1000);
    showToast(`${name} added to cart · Rs. ${price.toLocaleString('en-PK')}`);
  });
});
document.getElementById('cartJump').addEventListener('click', () => {
  if (!cart.length) return showToast('Your cart is empty — add a product to get started.');
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const summary = cart.map(item => item.name).join(', ');
  showToast(`${cart.length} item(s) · Total Rs. ${total.toLocaleString('en-PK')}`);
  console.log('Demo cart:', cart, 'Items:', summary);
});
function filterProducts(filter) {
  document.querySelectorAll('.product-card').forEach(card => {
    const matches = filter === 'all' || card.dataset.category === filter;
    card.classList.toggle('hidden', !matches);
  });
  document.getElementById('products').scrollIntoView({behavior:'smooth'});
}
document.querySelectorAll('.category-card').forEach(card => {
  card.addEventListener('click', () => filterProducts(card.dataset.filter));
});
document.getElementById('categoryMenu').addEventListener('click', () => {
  document.getElementById('categories').scrollIntoView({behavior:'smooth'});
});
document.getElementById('viewAll').addEventListener('click', event => {
  event.preventDefault();
  filterProducts('all');
});
document.getElementById('searchForm').addEventListener('submit', event => {
  event.preventDefault();
  const query = document.getElementById('searchInput').value.trim().toLowerCase();
  let shown = 0;
  document.querySelectorAll('.product-card').forEach(card => {
    const matches = !query || card.dataset.name.includes(query) || card.textContent.toLowerCase().includes(query);
    card.classList.toggle('hidden', !matches);
    if (matches) shown++;
  });
  document.getElementById('products').scrollIntoView({behavior:'smooth'});
  showToast(shown ? `${shown} product(s) found` : 'No matching product found. Try ghee, rice or honey.');
});
document.getElementById('newsletterForm').addEventListener('submit', event => {
  event.preventDefault();
  document.getElementById('newsletterMessage').textContent = 'Thanks for subscribing! Connect a mailing service to collect real signups.';
  event.target.reset();
});
