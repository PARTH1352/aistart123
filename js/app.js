/**
 * NEXUS APEX E-COMMERCE ENGINE
 * Handles: Cart, Shopify-Style Shopping Lists, Filters, Quick View,
 * Reviews Submission, Simulated Checkout, Promo Codes, and Toast System.
 */

// Application State
const AppState = {
  cart: [],
  activeShoppingLists: JSON.parse(JSON.stringify(DEFAULT_SHOPPING_LISTS)),
  activeCategory: 'all',
  searchQuery: '',
  sortBy: 'featured',
  discountPercent: 0,
  activePromoCode: null
};

// DOM Content Loaded Handler
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  renderShoppingListsSpotlight();
  renderProducts();
  renderReviews();
  renderWhyShop();
  setupEventListeners();
  updateCartUI();
  updateListBadgeCount();
}

/**
 * Event Listeners Setup
 */
function setupEventListeners() {
  // Category Pill Filters
  const categoryPills = document.querySelectorAll('.pill-btn');
  categoryPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      categoryPills.forEach(p => p.classList.remove('active'));
      e.currentTarget.classList.add('active');
      AppState.activeCategory = e.currentTarget.dataset.category;
      renderProducts();
    });
  });

  // Search input
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      AppState.searchQuery = e.target.value.toLowerCase().trim();
      renderProducts();
    });
  }

  // Sort select
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      AppState.sortBy = e.target.value;
      renderProducts();
    });
  }

  // Drawers Toggle
  const cartTrigger = document.getElementById('cartTrigger');
  const cartDrawer = document.getElementById('cartDrawer');
  const cartClose = document.getElementById('cartClose');
  const drawerBackdrop = document.getElementById('drawerBackdrop');

  const listTrigger = document.getElementById('listTrigger');
  const listDrawer = document.getElementById('listDrawer');
  const listClose = document.getElementById('listClose');

  if (cartTrigger) {
    cartTrigger.addEventListener('click', () => openDrawer(cartDrawer));
  }
  if (cartClose) {
    cartClose.addEventListener('click', closeAllDrawers);
  }
  if (listTrigger) {
    listTrigger.addEventListener('click', () => {
      renderListsDrawer();
      openDrawer(listDrawer);
    });
  }
  if (listClose) {
    listClose.addEventListener('click', closeAllDrawers);
  }
  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', closeAllDrawers);
  }

  // Modal Closers
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalClose = document.getElementById('modalClose');
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  // Promo Code Validation
  const applyPromoBtn = document.getElementById('applyPromoBtn');
  const promoInput = document.getElementById('promoInput');
  if (applyPromoBtn && promoInput) {
    applyPromoBtn.addEventListener('click', () => {
      const code = promoInput.value.trim().toUpperCase();
      if (code === 'ELEVATE20' || code === 'SAVE20') {
        AppState.discountPercent = 0.20;
        AppState.activePromoCode = code;
        showToast('🎉 Promo applied! 20% discount activated.', 'success');
        updateCartUI();
      } else if (code === 'FREESHIP') {
        AppState.discountPercent = 0.05;
        AppState.activePromoCode = code;
        showToast('🚀 Code FREESHIP applied! Free priority delivery unlocked.', 'success');
        updateCartUI();
      } else {
        showToast('❌ Invalid promo code. Try "ELEVATE20" or "FREESHIP"', 'error');
      }
    });
  }

  // Checkout Modal Trigger
  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (AppState.cart.length === 0) {
        showToast('Your shopping cart is currently empty.', 'warning');
        return;
      }
      closeAllDrawers();
      openCheckoutModal();
    });
  }

  // Newsletter Subscription Form
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('newsletterEmail');
      if (emailInput && emailInput.value) {
        showToast(`✨ Welcome aboard! VIP discount code 'ELEVATE20' sent to ${emailInput.value}`, 'success');
        emailInput.value = '';
      }
    });
  }

  // Write Review Trigger
  const openReviewModalBtn = document.getElementById('openReviewModalBtn');
  if (openReviewModalBtn) {
    openReviewModalBtn.addEventListener('click', openWriteReviewModal);
  }

  // Keyboard Escape to close drawers/modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllDrawers();
      closeModal();
    }
  });
}

/**
 * Drawer Operations
 */
function openDrawer(drawerEl) {
  if (!drawerEl) return;
  closeAllDrawers();
  const backdrop = document.getElementById('drawerBackdrop');
  if (backdrop) backdrop.classList.add('active');
  drawerEl.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeAllDrawers() {
  const backdrop = document.getElementById('drawerBackdrop');
  if (backdrop) backdrop.classList.remove('active');
  document.querySelectorAll('.side-drawer').forEach(d => d.classList.remove('active'));
  document.body.style.overflow = '';
}

/**
 * Modal Operations
 */
function openModal(contentHtml) {
  const backdrop = document.getElementById('modalBackdrop');
  const container = document.getElementById('modalDynamicContainer');
  if (!backdrop || !container) return;
  container.innerHTML = contentHtml;
  backdrop.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const backdrop = document.getElementById('modalBackdrop');
  if (backdrop) backdrop.classList.remove('active');
  document.body.style.overflow = '';
}

/**
 * Toast Notification System
 */
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let icon = '⚡';
  if (type === 'success') icon = '✅';
  if (type === 'error') icon = '⚠️';
  if (type === 'warning') icon = '🔔';

  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <span class="toast-text">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/**
 * Render Shopping Lists Spotlight Section
 */
function renderShoppingListsSpotlight() {
  const container = document.getElementById('shoppingListsSpotlightGrid');
  if (!container) return;

  container.innerHTML = AppState.activeShoppingLists.map(list => {
    const items = list.itemIds.map(id => PRODUCTS_DATA.find(p => p.id === id)).filter(Boolean);
    const thumbsHtml = items.slice(0, 4).map(p => `
      <div class="list-thumb" title="${p.name}">
        <img src="${p.image}" alt="${p.name}" loading="lazy" />
      </div>
    `).join('');

    return `
      <div class="list-collection-card">
        <div class="list-card-header">
          <h3>${list.title}</h3>
          <span class="list-item-count">${items.length} items</span>
        </div>
        <p class="list-card-desc">${list.description}</p>
        <div class="list-preview-thumbs">
          ${thumbsHtml}
        </div>
        <div class="list-card-actions">
          <button class="btn-open-list" onclick="viewSpecificList('${list.id}')">
            View Shopping List <span>→</span>
          </button>
          <button class="btn-add-all-cart" onclick="addAllListToCart('${list.id}')">
            + Add All to Cart
          </button>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Render Product Grid
 */
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const countLabel = document.getElementById('productCountLabel');
  if (!grid) return;

  let filtered = PRODUCTS_DATA.filter(p => {
    const matchesCategory = AppState.activeCategory === 'all' || p.category === AppState.activeCategory;
    const matchesSearch = !AppState.searchQuery || 
      p.name.toLowerCase().includes(AppState.searchQuery) ||
      p.description.toLowerCase().includes(AppState.searchQuery) ||
      p.categoryLabel.toLowerCase().includes(AppState.searchQuery);
    return matchesCategory && matchesSearch;
  });

  // Sorting
  if (AppState.sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (AppState.sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (AppState.sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  if (countLabel) {
    countLabel.textContent = `Showing ${filtered.length} products`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-catalog">
        <h3>No Matching Gear Found</h3>
        <p>We couldn't find anything matching "${AppState.searchQuery}". Try searching for running shoes, backpacks, or clear filters.</p>
        <button class="btn-primary" onclick="resetFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(p => {
    const isWishlisted = isItemInAnyList(p.id);
    const starString = '★'.repeat(Math.floor(p.rating)) + (p.rating % 1 !== 0 ? '½' : '');

    return `
      <article class="product-card" data-id="${p.id}">
        <span class="card-badge badge-${p.badgeType}">${p.badge}</span>
        <button class="card-wishlist-btn ${isWishlisted ? 'active' : ''}" 
                title="Add to Shopping List" 
                onclick="toggleItemWishlist('${p.id}')">
          ♥
        </button>
        <div class="card-media">
          <img src="${p.image}" alt="${p.name}" loading="lazy" />
          <button class="quick-view-overlay-btn" onclick="openQuickView('${p.id}')">
            Quick View 👁️
          </button>
        </div>
        <div class="card-body">
          <div class="card-category">${p.categoryLabel}</div>
          <h3 class="card-title" onclick="openQuickView('${p.id}')" style="cursor: pointer;">${p.name}</h3>
          <div class="card-rating">
            <span class="stars">${starString}</span>
            <span class="rating-count">(${p.reviewCount})</span>
          </div>
          <p class="card-desc">${p.description}</p>
          <div class="card-footer">
            <div class="price-wrap">
              <span class="price-current">$${p.price.toFixed(2)}</span>
              ${p.originalPrice ? `<span class="price-original">$${p.originalPrice.toFixed(2)}</span>` : ''}
            </div>
            <button class="btn-add-cart" onclick="addToCart('${p.id}')">
              <span>+</span> Add to Cart
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function resetFilters() {
  AppState.activeCategory = 'all';
  AppState.searchQuery = '';
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = '';
  document.querySelectorAll('.pill-btn').forEach(p => p.classList.remove('active'));
  const allBtn = document.querySelector('.pill-btn[data-category="all"]');
  if (allBtn) allBtn.classList.add('active');
  renderProducts();
}

/**
 * Quick View Modal
 */
function openQuickView(productId) {
  const p = PRODUCTS_DATA.find(item => item.id === productId);
  if (!p) return;

  const starString = '★'.repeat(Math.floor(p.rating)) + (p.rating % 1 !== 0 ? '½' : '');
  const sizeChips = p.sizes.map((s, idx) => `
    <button class="chip-btn ${idx === 0 ? 'active' : ''}" onclick="selectChip(this)">${s}</button>
  `).join('');

  const colorChips = p.colors.map((c, idx) => `
    <button class="chip-btn ${idx === 0 ? 'active' : ''}" onclick="selectChip(this)">
      <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:${c.hex}; margin-right:4px;"></span>
      ${c.name}
    </button>
  `).join('');

  const specsRows = Object.entries(p.specs).map(([k, v]) => `
    <tr>
      <td>${k}</td>
      <td><strong>${v}</strong></td>
    </tr>
  `).join('');

  const content = `
    <div class="quick-view-grid">
      <div class="modal-media-wrap">
        <img src="${p.image}" alt="${p.name}" />
      </div>
      <div class="modal-info-wrap">
        <div>
          <span class="card-badge badge-${p.badgeType}" style="position:static; display:inline-block; margin-bottom:0.5rem;">${p.badge}</span>
          <h2 style="font-size: 1.6rem; font-weight: 800; margin-bottom: 0.3rem;">${p.name}</h2>
          <div class="card-rating" style="margin-bottom: 0.5rem;">
            <span class="stars">${starString}</span>
            <span class="rating-count">(${p.reviewCount} verified reviews) • <strong>In Stock (${p.stockCount} left)</strong></span>
          </div>
          <div class="price-wrap" style="flex-direction:row; gap:0.8rem; align-items:baseline; margin-bottom: 0.8rem;">
            <span class="price-current" style="font-size: 1.6rem;">$${p.price.toFixed(2)}</span>
            ${p.originalPrice ? `<span class="price-original" style="font-size: 1.1rem;">$${p.originalPrice.toFixed(2)}</span>` : ''}
          </div>
        </div>
        <p style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.6;">${p.description}</p>
        
        <div>
          <label style="font-size: 0.82rem; font-weight: 600; color: var(--text-muted); display:block; margin-bottom: 0.4rem;">SELECT COLOR:</label>
          <div class="chip-row">${colorChips}</div>
        </div>

        <div>
          <label style="font-size: 0.82rem; font-weight: 600; color: var(--text-muted); display:block; margin-bottom: 0.4rem;">SELECT SIZE / FIT:</label>
          <div class="chip-row">${sizeChips}</div>
        </div>

        <div>
          <label style="font-size: 0.82rem; font-weight: 600; color: var(--text-muted); display:block; margin-bottom: 0.4rem;">PERFORMANCE SPECIFICATIONS:</label>
          <table class="spec-table">${specsRows}</table>
        </div>

        <div style="display: flex; gap: 0.8rem; margin-top: 1rem;">
          <button class="btn-primary" style="flex-grow: 1; justify-content: center;" onclick="addToCart('${p.id}'); closeModal();">
            Add to Bag • $${p.price.toFixed(2)}
          </button>
          <button class="btn-secondary" onclick="toggleItemWishlist('${p.id}'); closeModal();">
            ♥ Add to List
          </button>
        </div>
      </div>
    </div>
  `;

  openModal(content);
}

function selectChip(el) {
  const parent = el.parentElement;
  parent.querySelectorAll('.chip-btn').forEach(btn => btn.classList.remove('active'));
  el.classList.add('active');
}

/**
 * Cart Functionality
 */
function addToCart(productId, quantity = 1) {
  const p = PRODUCTS_DATA.find(item => item.id === productId);
  if (!p) return;

  const existing = AppState.cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    AppState.cart.push({
      id: p.id,
      name: p.name,
      price: p.price,
      image: p.image,
      category: p.categoryLabel,
      quantity: quantity
    });
  }

  showToast(`Added "${p.name}" to your cart! 🛍️`, 'success');
  updateCartUI();
}

function updateCartQuantity(productId, delta) {
  const item = AppState.cart.find(i => i.id === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    AppState.cart = AppState.cart.filter(i => i.id !== productId);
    showToast(`Removed "${item.name}" from cart`, 'info');
  }
  updateCartUI();
}

function removeFromCart(productId) {
  const item = AppState.cart.find(i => i.id === productId);
  if (item) {
    AppState.cart = AppState.cart.filter(i => i.id !== productId);
    showToast(`Removed "${item.name}" from cart`, 'info');
    updateCartUI();
  }
}

function updateCartUI() {
  const cartBadge = document.getElementById('cartBadgeCount');
  const cartBody = document.getElementById('cartDrawerBody');
  const cartSubtotalEl = document.getElementById('cartSubtotal');
  const cartDiscountRow = document.getElementById('cartDiscountRow');
  const cartDiscountVal = document.getElementById('cartDiscountVal');
  const cartShippingEl = document.getElementById('cartShipping');
  const cartTotalEl = document.getElementById('cartTotal');

  const totalItems = AppState.cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cartBadge) {
    cartBadge.textContent = totalItems;
    cartBadge.style.display = totalItems > 0 ? 'grid' : 'none';
  }

  if (!cartBody) return;

  if (AppState.cart.length === 0) {
    cartBody.innerHTML = `
      <div class="drawer-empty">
        <div class="drawer-empty-icon">🛒</div>
        <h4>Your Cart is Empty</h4>
        <p>Explore our high-performance running shoes and commuter backpacks.</p>
        <button class="btn-primary" onclick="closeAllDrawers()">Start Shopping</button>
      </div>
    `;
    if (cartSubtotalEl) cartSubtotalEl.textContent = '$0.00';
    if (cartShippingEl) cartShippingEl.textContent = '$0.00';
    if (cartTotalEl) cartTotalEl.textContent = '$0.00';
    if (cartDiscountRow) cartDiscountRow.style.display = 'none';
    return;
  }

  cartBody.innerHTML = AppState.cart.map(item => `
    <div class="drawer-item">
      <div class="drawer-item-img">
        <img src="${item.image}" alt="${item.name}" />
      </div>
      <div class="drawer-item-details">
        <div>
          <div class="drawer-item-meta">${item.category}</div>
          <h4 class="drawer-item-name">${item.name}</h4>
          <span class="drawer-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
        <div class="drawer-item-controls">
          <div class="qty-stepper">
            <button class="qty-btn" onclick="updateCartQuantity('${item.id}', -1)">-</button>
            <span class="qty-val">${item.quantity}</span>
            <button class="qty-btn" onclick="updateCartQuantity('${item.id}', 1)">+</button>
          </div>
          <button class="item-delete-btn" onclick="removeFromCart('${item.id}')">Remove</button>
        </div>
      </div>
    </div>
  `).join('');

  // Calculations
  const subtotal = AppState.cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  const discount = subtotal * AppState.discountPercent;
  const shipping = (subtotal - discount > 75 || AppState.activePromoCode === 'FREESHIP') ? 0.00 : 12.00;
  const total = (subtotal - discount) + shipping;

  if (cartSubtotalEl) cartSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  if (cartShippingEl) cartShippingEl.textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
  if (cartTotalEl) cartTotalEl.textContent = `$${total.toFixed(2)}`;

  if (cartDiscountRow && cartDiscountVal) {
    if (discount > 0) {
      cartDiscountRow.style.display = 'flex';
      cartDiscountVal.textContent = `-$${discount.toFixed(2)} (${AppState.activePromoCode})`;
    } else {
      cartDiscountRow.style.display = 'none';
    }
  }
}

/**
 * Shopify-Style Shopping Lists Management
 */
function isItemInAnyList(productId) {
  return AppState.activeShoppingLists.some(list => list.itemIds.includes(productId));
}

function updateListBadgeCount() {
  const badge = document.getElementById('listBadgeCount');
  if (!badge) return;
  const totalUniqueItems = new Set();
  AppState.activeShoppingLists.forEach(l => l.itemIds.forEach(id => totalUniqueItems.add(id)));
  badge.textContent = totalUniqueItems.size;
  badge.style.display = totalUniqueItems.size > 0 ? 'grid' : 'none';
}

function toggleItemWishlist(productId) {
  const p = PRODUCTS_DATA.find(item => item.id === productId);
  if (!p) return;

  const defaultList = AppState.activeShoppingLists[0];
  const index = defaultList.itemIds.indexOf(productId);

  if (index > -1) {
    defaultList.itemIds.splice(index, 1);
    showToast(`Removed "${p.name}" from "${defaultList.title}"`, 'info');
  } else {
    defaultList.itemIds.push(productId);
    showToast(`Saved "${p.name}" to "${defaultList.title}"! ❤️`, 'success');
  }

  updateListBadgeCount();
  renderProducts();
  renderShoppingListsSpotlight();
  renderListsDrawer();
}

function addAllListToCart(listId) {
  const list = AppState.activeShoppingLists.find(l => l.id === listId);
  if (!list) return;

  list.itemIds.forEach(id => {
    addToCart(id, 1);
  });
  showToast(`Added all ${list.itemIds.length} items from "${list.title}" to cart! 🛍️`, 'success');
  openDrawer(document.getElementById('cartDrawer'));
}

function viewSpecificList(listId) {
  const list = AppState.activeShoppingLists.find(l => l.id === listId);
  if (!list) return;
  renderListsDrawer(listId);
  openDrawer(document.getElementById('listDrawer'));
}

function renderListsDrawer(selectedListId = null) {
  const body = document.getElementById('listDrawerBody');
  if (!body) return;

  const currentList = selectedListId 
    ? AppState.activeShoppingLists.find(l => l.id === selectedListId) 
    : AppState.activeShoppingLists[0];

  if (!currentList || currentList.itemIds.length === 0) {
    body.innerHTML = `
      <div class="drawer-empty">
        <div class="drawer-empty-icon">📋</div>
        <h4>No Items in This Shopping List</h4>
        <p>Save your favorite running shoes and backpacks to organize before you buy.</p>
        <button class="btn-primary" onclick="closeAllDrawers()">Browse Store</button>
      </div>
    `;
    return;
  }

  const items = currentList.itemIds.map(id => PRODUCTS_DATA.find(p => p.id === id)).filter(Boolean);

  const listsSelectHtml = `
    <div style="margin-bottom: 1.2rem;">
      <label style="font-size: 0.8rem; font-weight: 600; color: var(--text-muted); display: block; margin-bottom: 0.4rem;">ACTIVE SHOPPING LIST:</label>
      <select class="form-input" onchange="renderListsDrawer(this.value)">
        ${AppState.activeShoppingLists.map(l => `
          <option value="${l.id}" ${l.id === currentList.id ? 'selected' : ''}>${l.title} (${l.itemIds.length})</option>
        `).join('')}
      </select>
    </div>
  `;

  const itemsHtml = items.map(item => `
    <div class="drawer-item">
      <div class="drawer-item-img">
        <img src="${item.image}" alt="${item.name}" />
      </div>
      <div class="drawer-item-details">
        <div>
          <div class="drawer-item-meta">${item.categoryLabel}</div>
          <h4 class="drawer-item-name">${item.name}</h4>
          <span class="drawer-item-price">$${item.price.toFixed(2)}</span>
        </div>
        <div class="drawer-item-controls" style="margin-top: 0.6rem;">
          <button class="btn-primary" style="padding: 0.35rem 0.8rem; font-size: 0.78rem;" onclick="addToCart('${item.id}')">
            + Move to Bag
          </button>
          <button class="item-delete-btn" onclick="removeFromSpecificList('${currentList.id}', '${item.id}')">
            Remove
          </button>
        </div>
      </div>
    </div>
  `).join('');

  body.innerHTML = `
    ${listsSelectHtml}
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.8rem;">
      <span style="font-size:0.85rem; color:var(--text-muted);">${items.length} items saved</span>
      <button class="btn-secondary" style="padding:0.35rem 0.75rem; font-size:0.78rem;" onclick="addAllListToCart('${currentList.id}')">Add All to Bag</button>
    </div>
    <div style="display:flex; flex-direction:column; gap:0.9rem;">
      ${itemsHtml}
    </div>
  `;
}

function removeFromSpecificList(listId, productId) {
  const list = AppState.activeShoppingLists.find(l => l.id === listId);
  if (!list) return;
  list.itemIds = list.itemIds.filter(id => id !== productId);
  showToast('Item removed from shopping list', 'info');
  updateListBadgeCount();
  renderProducts();
  renderShoppingListsSpotlight();
  renderListsDrawer(listId);
}

/**
 * Why Shop Pillars
 */
function renderWhyShop() {
  const grid = document.getElementById('whyShopGrid');
  if (!grid) return;

  grid.innerHTML = WHY_SHOP_PILLARS.map(item => `
    <div class="why-card">
      <div class="why-icon-wrap">${item.icon}</div>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <div class="why-metric-pill">
        <span>✨</span> ${item.metric}
      </div>
    </div>
  `).join('');
}

/**
 * Customer Reviews
 */
function renderReviews() {
  const grid = document.getElementById('reviewsGrid');
  if (!grid) return;

  grid.innerHTML = REVIEWS_DATA.map(rev => {
    const starString = '★'.repeat(rev.rating) + '☆'.repeat(5 - rev.rating);
    return `
      <div class="review-card">
        <div class="review-header">
          <div class="review-avatar">
            <img src="${rev.avatar}" alt="${rev.author}" loading="lazy" />
          </div>
          <div class="reviewer-info">
            <h4>${rev.author} <span class="verified-icon" title="Verified Customer">✓</span></h4>
            <p>${rev.role}</p>
          </div>
        </div>
        <div class="review-rating-line">
          <span class="stars">${starString}</span>
          <span class="review-product-tag">${rev.productName}</span>
        </div>
        <h4 class="review-title">"${rev.title}"</h4>
        <p class="review-content">${rev.content}</p>
        <div class="review-footer">
          <span>${rev.date}</span>
          <button class="btn-helpful" onclick="markReviewHelpful(this, ${rev.helpfulCount})">
            👍 Helpful (${rev.helpfulCount})
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function markReviewHelpful(btn, count) {
  btn.innerHTML = `👍 Helpful (${count + 1})`;
  btn.style.color = '#10b981';
  btn.disabled = true;
  showToast('Thank you for your feedback! 👍', 'info');
}

/**
 * Write Review Modal
 */
function openWriteReviewModal() {
  const productOptions = PRODUCTS_DATA.map(p => `
    <option value="${p.name}">${p.name}</option>
  `).join('');

  const content = `
    <div style="padding: 2.2rem;">
      <h2 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 0.4rem;">Submit a Verified Product Review</h2>
      <p style="color: var(--text-muted); font-size: 0.88rem; margin-bottom: 1.5rem;">Share your real-world experience with fellow athletes and adventurers.</p>
      
      <form id="submitReviewForm" onsubmit="handleReviewSubmit(event)">
        <div class="form-group">
          <label>SELECT PRODUCT</label>
          <select id="revProduct" class="form-input" required>
            ${productOptions}
          </select>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>YOUR NAME</label>
            <input type="text" id="revAuthor" class="form-input" placeholder="e.g. Liam Parker" required />
          </div>
          <div class="form-group">
            <label>YOUR TITLE / SPORT</label>
            <input type="text" id="revRole" class="form-input" placeholder="e.g. Marathoner / Daily Commuter" required />
          </div>
        </div>

        <div class="form-group">
          <label>RATING</label>
          <select id="revRating" class="form-input">
            <option value="5">★★★★★ (5 Stars - Exceptional)</option>
            <option value="4">★★★★☆ (4 Stars - Great)</option>
            <option value="3">★★★☆☆ (3 Stars - Average)</option>
          </select>
        </div>

        <div class="form-group">
          <label>REVIEW HEADLINE</label>
          <input type="text" id="revTitle" class="form-input" placeholder="Sum up your experience in one sentence" required />
        </div>

        <div class="form-group">
          <label>YOUR REVIEW</label>
          <textarea id="revContent" class="form-input" rows="4" placeholder="Detail the fit, durability, weather-resistance, or comfort..." required></textarea>
        </div>

        <button type="submit" class="btn-primary" style="width: 100%; justify-content: center; margin-top: 0.5rem;">
          Publish Verified Review ✨
        </button>
      </form>
    </div>
  `;

  openModal(content);
}

function handleReviewSubmit(e) {
  e.preventDefault();
  const author = document.getElementById('revAuthor').value.trim();
  const role = document.getElementById('revRole').value.trim();
  const productName = document.getElementById('revProduct').value;
  const rating = parseInt(document.getElementById('revRating').value, 10);
  const title = document.getElementById('revTitle').value.trim();
  const content = document.getElementById('revContent').value.trim();

  const newReview = {
    id: `rev-${Date.now()}`,
    author,
    role,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    productName,
    rating,
    date: 'Just now',
    title,
    content,
    verified: true,
    helpfulCount: 1
  };

  REVIEWS_DATA.unshift(newReview);
  renderReviews();
  closeModal();
  showToast('🌟 Review posted successfully! Thank you for supporting the community.', 'success');
}

/**
 * Simulated Checkout & Order Confirmation Modal
 */
function openCheckoutModal() {
  const subtotal = AppState.cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  const discount = subtotal * AppState.discountPercent;
  const shipping = (subtotal - discount > 75 || AppState.activePromoCode === 'FREESHIP') ? 0.00 : 12.00;
  const total = (subtotal - discount) + shipping;

  const content = `
    <div class="checkout-modal-content">
      <h2 style="font-size: 1.6rem; font-weight: 800; margin-bottom: 0.4rem;">Fast Track Checkout</h2>
      <p style="color: var(--text-muted); font-size: 0.88rem; margin-bottom: 1.5rem;">🔒 256-Bit SSL Encrypted End-to-End Payment Simulation</p>

      <form id="checkoutForm" onsubmit="handleCheckoutSubmit(event)">
        <div class="form-row">
          <div class="form-group">
            <label>FIRST NAME</label>
            <input type="text" class="form-input" placeholder="Alex" required />
          </div>
          <div class="form-group">
            <label>LAST NAME</label>
            <input type="text" class="form-input" placeholder="Morgan" required />
          </div>
        </div>

        <div class="form-group">
          <label>SHIPPING ADDRESS</label>
          <input type="text" class="form-input" placeholder="742 Evergreen Terrace, Suite 400" required />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>CITY & STATE</label>
            <input type="text" class="form-input" placeholder="Seattle, WA" required />
          </div>
          <div class="form-group">
            <label>ZIP / POSTAL CODE</label>
            <input type="text" class="form-input" placeholder="98101" required />
          </div>
        </div>

        <div style="background: rgba(255, 255, 255, 0.04); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.2rem; margin: 1.2rem 0;">
          <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem; font-size:0.9rem; color:var(--text-muted);">
            <span>Items Subtotal (${AppState.cart.reduce((s,i) => s + i.quantity, 0)})</span>
            <span>$${subtotal.toFixed(2)}</span>
          </div>
          ${discount > 0 ? `
            <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem; font-size:0.9rem; color:#10b981;">
              <span>Promo Discount (${AppState.activePromoCode})</span>
              <span>-$${discount.toFixed(2)}</span>
            </div>
          ` : ''}
          <div style="display:flex; justify-content:space-between; margin-bottom:0.8rem; font-size:0.9rem; color:var(--text-muted);">
            <span>Express Tracked Shipping</span>
            <span>${shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:1.25rem; font-weight:800; border-top:1px solid var(--border-subtle); padding-top:0.8rem;">
            <span>Total Payable:</span>
            <span style="color:#38bdf8;">$${total.toFixed(2)}</span>
          </div>
        </div>

        <div class="form-group">
          <label>SIMULATED CARD NUMBER</label>
          <input type="text" class="form-input" value="•••• •••• •••• 4242" readonly />
        </div>

        <button type="submit" class="btn-checkout" style="width: 100%; margin-top: 1rem;">
          Authorize & Place Order • $${total.toFixed(2)} 🚀
        </button>
      </form>
    </div>
  `;

  openModal(content);
}

function handleCheckoutSubmit(e) {
  e.preventDefault();
  const orderId = 'NX-' + Math.floor(100000 + Math.random() * 900000);
  const itemsPurchased = [...AppState.cart];
  AppState.cart = [];
  updateCartUI();

  const successContent = `
    <div class="order-success-card">
      <div class="order-success-icon">✓</div>
      <h2 style="font-size: 1.8rem; font-weight: 800; margin-bottom: 0.5rem;">Order Successfully Placed!</h2>
      <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.5rem;">
        Confirmation code: <strong style="color: #38bdf8;">#${orderId}</strong>
      </p>

      <div style="background: rgba(255, 255, 255, 0.04); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.5rem; text-align: left; margin-bottom: 1.8rem;">
        <h4 style="font-size: 0.95rem; margin-bottom: 0.8rem; color: #a855f7;">ORDER SUMMARY:</h4>
        ${itemsPurchased.map(i => `
          <div style="display:flex; justify-content:space-between; font-size: 0.88rem; margin-bottom: 0.4rem; color: var(--text-muted);">
            <span>${i.name} (x${i.quantity})</span>
            <span style="color: var(--text-main); font-weight: 600;">$${(i.price * i.quantity).toFixed(2)}</span>
          </div>
        `).join('')}
        <div style="margin-top: 1rem; padding-top: 0.8rem; border-top: 1px solid var(--border-subtle); font-size: 0.85rem; color: #10b981;">
          📦 Dispatch Status: Processing in automated logistics hub. Tracking email will arrive shortly.
        </div>
      </div>

      <button class="btn-primary" onclick="closeModal()">
        Continue Exploring Gear
      </button>
    </div>
  `;

  openModal(successContent);
  showToast(`Order #${orderId} confirmed! Static response executed. 🎉`, 'success');
}
