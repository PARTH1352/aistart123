/**
 * L'ÉCRIN - Haute Gastronomie
 * Client-Side Application Logic & State Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNavigation();
  initGlobalReservationModal();
  initToastSystem();
  initNewsletter();
  
  // Page-specific initializers
  if (document.querySelector('.menu-items-grid')) {
    initMenuInteractions();
  }
  
  if (document.getElementById('reservation-wizard')) {
    initReservationEngine();
  }
  
  if (document.querySelector('.faq-accordion-wrap')) {
    initFaqAccordion();
  }

  if (document.getElementById('event-inquiry-form')) {
    initEventInquiryForm();
  }
});

/* ==========================================================================
   1. TOAST NOTIFICATION SYSTEM
   ========================================================================== */
function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span style="color: var(--accent-gold); font-size: 1.1rem;">◆</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(40px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4200);
}

/* ==========================================================================
   2. MOBILE NAVIGATION
   ========================================================================== */
function initMobileNavigation() {
  const toggleBtn = document.querySelector('.mobile-menu-btn');
  const drawer = document.querySelector('.mobile-nav-drawer');

  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
    
    // Animate hamburger bars
    const spans = toggleBtn.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });

  // Close when clicking outside or on mobile link
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      const spans = toggleBtn.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });
}

/* ==========================================================================
   3. UNIVERSAL QUICK RESERVATION MODAL
   ========================================================================== */
function initGlobalReservationModal() {
  const modalBackdrop = document.getElementById('global-reserve-modal');
  const openButtons = document.querySelectorAll('[data-open-reserve-modal]');
  const closeBtn = document.getElementById('close-global-modal');
  const form = document.getElementById('quick-reserve-form');

  if (!modalBackdrop) return;

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modalBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const guests = form.querySelector('[name="quick-guests"]').value;
      const date = form.querySelector('[name="quick-date"]').value;
      const time = form.querySelector('[name="quick-time"]').value;
      const name = form.querySelector('[name="quick-name"]').value;

      closeModal();
      form.reset();
      
      const code = 'SELFWISE-' + Math.floor(100000 + Math.random() * 900000);
      showToast(`Reservation Confirmed for ${name} (${guests} Guests, ${date} at ${time}). Ref: #${code}`);
    });
  }
}

/* ==========================================================================
   4. MENU FILTERING & DISH DETAILS MODAL
   ========================================================================== */
const MENU_DATA = [
  {
    id: 'scallop',
    name: 'Hand-Dived Brittany Scallops',
    category: 'starters',
    price: '₹1,250',
    tags: ['GF'],
    desc: 'Celery root velouté, fermented green apple sphere, Périgord black truffle snow, cold-pressed hazelnut oil.',
    provenance: 'Wild-harvested in Saint-Brieuc Bay, Brittany at 25-meter depth.',
    allergens: 'Molluscs, Tree Nuts',
    winePairing: '2020 Domaine Leflaive Puligny-Montrachet 1er Cru'
  },
  {
    id: 'wagyu',
    name: 'A5 Miyazaki Wagyu Medallion',
    category: 'mains',
    price: '₹2,450',
    tags: ['GF', 'DF'],
    desc: 'Bincho-tan grilled tenderloin, black shallot reduction, pickled morel mushrooms, charred young leek ash.',
    provenance: 'Miyazaki Prefecture, Japan. Purebred Kuroge Washu 45-day dry-aged.',
    allergens: 'Allium',
    winePairing: '2016 Château Pontet-Canet, Pauillac'
  },
  {
    id: 'caviar',
    name: 'Oscietra Caviar & Smoked Dashi',
    category: 'starters',
    price: '₹1,850',
    tags: ['GF'],
    desc: 'Golden imperial caviar, Hokkaido uni emulsion, crisp kohlrabi disc, smoked kombu infusion.',
    provenance: 'Grown in pristine alpine spring waters, aged for 12 months in tin.',
    allergens: 'Fish, Shellfish',
    winePairing: '2015 Dom Pérignon Brut Champagne'
  },
  {
    id: 'duck',
    name: 'Dry-Aged Challans Duck Breast',
    category: 'mains',
    price: '₹1,950',
    tags: ['GF', 'DF'],
    desc: 'Spice-lacquered skin, fermented damson plum purée, parsnip ribbon, roasted duck bone jus infused with roasted cocoa.',
    provenance: 'Maison Burgaud, Challans, Vendée, France. Aged on the bone for 21 days.',
    allergens: 'None',
    winePairing: '2018 Domaine Dujac Morey-Saint-Denis'
  },
  {
    id: 'turbot',
    name: 'Line-Caught Breton Turbot',
    category: 'mains',
    price: '₹1,800',
    tags: ['GF'],
    desc: 'Steamed over coastal sea botanicals, preserved lemon emulsified butter, sea asparagus, razor clam ragout.',
    provenance: 'Sustainably landed by single-boat day trawlers in Roscoff, Brittany.',
    allergens: 'Fish, Dairy, Molluscs',
    winePairing: '2019 Meursault Genevrières, Domaine Antoine Jobard'
  },
  {
    id: 'morel',
    name: 'Wild Forest Morel & Spelt Tart',
    category: 'starters',
    price: '₹950',
    tags: ['V'],
    desc: 'Hand-picked coniferous morels, emulsion of aged Comté 36-month, black garlic mousse, crispy mountain spelt crust.',
    provenance: 'Foraged in the Jura mountains; organic spelt from Drôme provenance.',
    allergens: 'Gluten, Dairy',
    winePairing: '2017 Château Chalon Vin Jaune, Domaine Macle'
  },
  {
    id: 'cacao',
    name: 'Smoked Madagascar Noir & Sea Salt',
    category: 'dessert',
    price: '₹650',
    tags: ['V', 'GF'],
    desc: '74% single-plantation cacao quenelle, roasted cacao nib lace, Tahitian vanilla bean smoke, Maldon flake crystals.',
    provenance: 'Akesson’s Estate, Sambirano Valley, Madagascar.',
    allergens: 'Dairy',
    winePairing: '1998 Quinta do Noval Silval Vintage Port'
  },
  {
    id: 'quince',
    name: 'Roasted Quince & Pine needle Infusion',
    category: 'dessert',
    price: '₹550',
    tags: ['V', 'GF', 'DF'],
    desc: 'Poached heirloom orchard quince, chilled pine needle granita, cultured goat milk curd, toasted buckwheat crumble.',
    provenance: 'Organically grown in Kent orchards; alpine spruce shoots.',
    allergens: 'Dairy',
    winePairing: '2017 Château d’Yquem Sauternes 1er Cru Supérieur'
  },
  {
    id: 'cellar-pair',
    name: 'Grand Cru Sommelier Flight',
    category: 'cellar',
    price: '₹2,200',
    tags: [],
    desc: 'A five-glass progression of rare vintages and biodynamic single-terroir bottlings tailored to tonight’s menu.',
    provenance: 'Curated from Selfwise Cafe’s temperature-controlled subterranean vault.',
    allergens: 'Sulphites',
    winePairing: 'Curated specifically across each course'
  },
  {
    id: 'tasting-exp',
    name: 'The Obsidian Odyssey (10-Courses)',
    category: 'tasting',
    price: '₹4,800',
    tags: ['GF'],
    desc: 'Our quintessential culinary narrative honoring the season’s micro-harvest, rare coastal catch, and ancient preservation techniques.',
    provenance: 'Full terroir tour across Brittany, Jura, Miyazaki, and Normandy.',
    allergens: 'Customizable with 48h notice',
    winePairing: 'Optional Prestige Pairing available (₹2,200)'
  }
];

function initMenuInteractions() {
  const tabButtons = document.querySelectorAll('.menu-tab-btn');
  const dietaryChips = document.querySelectorAll('.dietary-chip');
  const menuContainer = document.querySelector('.menu-items-grid');
  const modal = document.getElementById('dish-detail-modal');

  let activeCategory = 'all';
  let activeDietary = 'all';

  function renderDishes() {
    menuContainer.innerHTML = '';

    const filtered = MENU_DATA.filter(item => {
      const matchCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchDietary = activeDietary === 'all' || item.tags.includes(activeDietary);
      return matchCategory && matchDietary;
    });

    if (filtered.length === 0) {
      menuContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;">
          <p style="font-family: var(--font-serif); font-size: 1.4rem; color: var(--text-primary); margin-bottom: 0.5rem;">No courses match the chosen dietary filter.</p>
          <p style="color: var(--text-muted); font-size: 0.9rem;">Our kitchen will gladly curate bespoke options for all allergies upon request.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = 'menu-card';
      card.setAttribute('data-id', item.id);
      
      const tagBadges = item.tags.map(t => `<span class="dish-tag">${t}</span>`).join('');

      card.innerHTML = `
        <div>
          <div class="menu-card-top">
            <h4 class="menu-dish-name">${item.name}</h4>
            <span class="menu-dish-price">${item.price}</span>
          </div>
          <p class="menu-dish-desc">${item.desc}</p>
        </div>
        <div class="menu-dish-footer">
          <div class="dish-tags">${tagBadges}</div>
          <span class="dish-action-hint">Explore Course Details →</span>
        </div>
      `;

      card.addEventListener('click', () => openDishModal(item));
      menuContainer.appendChild(card);
    });
  }

  // Tab Filtering
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-category');
      renderDishes();
    });
  });

  // Dietary Filtering
  dietaryChips.forEach(chip => {
    chip.addEventListener('click', () => {
      dietaryChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeDietary = chip.getAttribute('data-filter');
      renderDishes();
    });
  });

  // Modal handler
  function openDishModal(dish) {
    if (!modal) return;
    
    document.getElementById('modal-dish-title').textContent = dish.name;
    document.getElementById('modal-dish-price').textContent = dish.price;
    document.getElementById('modal-dish-desc').textContent = dish.desc;
    document.getElementById('modal-dish-origin').textContent = dish.provenance;
    document.getElementById('modal-dish-pairing').textContent = dish.winePairing;
    document.getElementById('modal-dish-allergens').textContent = dish.allergens;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  const closeBtn = document.getElementById('close-dish-modal');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Initial render
  renderDishes();

  // PDF Download simulation
  const downloadBtn = document.getElementById('download-menu-btn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Generating official tasting menu folio (PDF)...');
      setTimeout(() => {
        showToast('Tasting Menu document ready for archival download.');
      }, 1500);
    });
  }
}

/* ==========================================================================
   5. RESERVATION ENGINE WIZARD (reservations.html)
   ========================================================================== */
function initReservationEngine() {
  const state = {
    guests: 2,
    experience: 'The Grand Tasting Menu',
    experiencePrice: 4800,
    service: 'Dinner',
    date: 'Tonight',
    time: '19:30',
    winePairing: false,
    winePairingPrice: 2200,
    area: 'Main Dining Room'
  };

  // DOM elements
  const guestBtns = document.querySelectorAll('.guest-btn');
  const expCards = document.querySelectorAll('.experience-card-option');
  const timeSlotBtns = document.querySelectorAll('.time-slot-btn');
  const dateInput = document.getElementById('res-date-input');
  const wineToggle = document.getElementById('wine-pairing-checkbox');
  const areaSelect = document.getElementById('dining-area-select');
  const bookingForm = document.getElementById('reservation-wizard');

  // Summary labels
  const sumGuests = document.getElementById('sum-guests');
  const sumExp = document.getElementById('sum-experience');
  const sumDate = document.getElementById('sum-date');
  const sumTime = document.getElementById('sum-time');
  const sumArea = document.getElementById('sum-area');
  const sumTotal = document.getElementById('sum-total');

  function updateSummary() {
    if (sumGuests) sumGuests.textContent = `${state.guests} Guests`;
    if (sumExp) sumExp.textContent = state.experience;
    if (sumDate) sumDate.textContent = state.date;
    if (sumTime) sumTime.textContent = `${state.time} (${state.service})`;
    if (sumArea) sumArea.textContent = state.area;

    const baseCost = state.guests * state.experiencePrice;
    const wineCost = state.winePairing ? (state.guests * state.winePairingPrice) : 0;
    const total = baseCost + wineCost;

    if (sumTotal) sumTotal.textContent = `₹${total.toLocaleString('en-IN')}`;
  }

  // Guest buttons
  guestBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      guestBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.guests = parseInt(btn.getAttribute('data-guests'), 10);
      updateSummary();
    });
  });

  // Experience cards
  expCards.forEach(card => {
    card.addEventListener('click', () => {
      expCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      state.experience = card.getAttribute('data-name');
      state.experiencePrice = parseInt(card.getAttribute('data-price'), 10);
      updateSummary();
    });
  });

  // Time slot buttons
  timeSlotBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.disabled) return;
      timeSlotBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.time = btn.getAttribute('data-time');
      updateSummary();
    });
  });

  // Date input
  if (dateInput) {
    // Set default tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split('T')[0];
    dateInput.value = dateStr;
    state.date = dateStr;

    dateInput.addEventListener('change', (e) => {
      state.date = e.target.value;
      updateSummary();
    });
  }

  // Wine pairing toggle
  if (wineToggle) {
    wineToggle.addEventListener('change', (e) => {
      state.winePairing = e.target.checked;
      updateSummary();
    });
  }

  // Area select
  if (areaSelect) {
    areaSelect.addEventListener('change', (e) => {
      state.area = e.target.value;
      updateSummary();
    });
  }

  // Initial calculation
  updateSummary();

  // Submit Handler
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const guestName = document.getElementById('guest-name').value;
      const guestEmail = document.getElementById('guest-email').value;
      const guestPhone = document.getElementById('guest-phone').value;
      const guestNotes = document.getElementById('guest-notes').value || 'None';

      const bookingRef = 'SELFWISE-' + Math.floor(100000 + Math.random() * 900000);

      // Open Confirmation Modal
      const confModal = document.getElementById('booking-confirmed-modal');
      if (confModal) {
        document.getElementById('conf-ref-code').textContent = `#${bookingRef}`;
        document.getElementById('conf-guest-name').textContent = guestName;
        document.getElementById('conf-details').textContent = `${state.guests} Guests · ${state.date} · ${state.time} (${state.area})`;
        document.getElementById('conf-exp').textContent = state.experience;
        document.getElementById('conf-total').textContent = sumTotal ? sumTotal.textContent : '₹0';

        confModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }

      showToast(`Reservation Confirmed for ${guestName}! Booking Reference: #${bookingRef}`);
    });
  }

  // Close confirmation modal
  const closeConfBtn = document.getElementById('close-conf-modal');
  const confModal = document.getElementById('booking-confirmed-modal');
  if (closeConfBtn && confModal) {
    closeConfBtn.addEventListener('click', () => {
      confModal.classList.remove('open');
      document.body.style.overflow = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ==========================================================================
   6. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    btn.addEventListener('click', () => {
      const wasActive = item.classList.contains('active');
      items.forEach(i => i.classList.remove('active'));
      if (!wasActive) {
        item.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   7. EVENT INQUIRY FORM (contact.html)
   ========================================================================== */
function initEventInquiryForm() {
  const form = document.getElementById('event-inquiry-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('[name="client-name"]').value;
    const type = form.querySelector('[name="event-type"]').value;
    const guests = form.querySelector('[name="guest-count"]').value;
    
    const eventRef = 'PRIV-' + Math.floor(10000 + Math.random() * 90000);
    showToast(`Inquiry #${eventRef} received for ${name} (${type}, ${guests} guests). Our Private Dining Director will respond within 24 hours.`);
    form.reset();
  });
}

/* ==========================================================================
   8. NEWSLETTER SUBSCRIPTION
   ========================================================================== */
function initNewsletter() {
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (input && input.value) {
        showToast(`Thank you. ${input.value} has been enrolled in the Selfwise Cafe Journal.`);
        input.value = '';
      }
    });
  });
}
