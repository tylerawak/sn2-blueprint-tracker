// ── State ──
let state = {
  activeStation:    STATIONS[0].id,
  activeCategory:   'All',
  searchQuery:      '',
  todoItems:        [],
  inventory:        {},
  activeRightTab:   'queue',
  selectedRecipeId: null,
};

let detailQty = 1;

function loadState() {
  try {
    const saved = localStorage.getItem('sn2-todo-v3');
    if (saved) {
      const p = JSON.parse(saved);
      state.todoItems      = p.todoItems      || [];
      state.inventory      = p.inventory      || {};
      state.activeRightTab = p.activeRightTab || 'queue';
    }
  } catch (_) {}
}

function saveState() {
  localStorage.setItem('sn2-todo-v3', JSON.stringify({
    todoItems:      state.todoItems,
    inventory:      state.inventory,
    activeRightTab: state.activeRightTab,
  }));
}

// ── DOM refs ──
const stationTabsEl     = document.getElementById('station-tabs');
const categoryTabsEl    = document.getElementById('category-tabs');
const recipeGridEl      = document.getElementById('recipe-grid');
const recipeDetailEl    = document.getElementById('recipe-detail');
const todoListEl        = document.getElementById('todo-list');
const todoScrollEl      = document.getElementById('todo-scroll');
const emptyStateEl      = document.getElementById('empty-state');
const resourceSummaryEl = document.getElementById('resource-summary');
const resourceListEl    = document.getElementById('resource-list');
const inventoryViewEl   = document.getElementById('inventory-view');
const rightTabBarEl     = document.getElementById('right-tab-bar');
const searchInput       = document.getElementById('recipe-search');
const totalQueuedEl     = document.getElementById('total-queued');
const totalReadyEl      = document.getElementById('total-ready');
const clearCompletedBtn    = document.getElementById('clear-completed-btn');
const toggleCollapseBtnEl  = document.getElementById('toggle-collapse-btn');
const markAllCraftedBtnEl  = document.getElementById('mark-all-crafted-btn');

// Returns the icon source (recipe or raw material entry) for any item name.
function getItemIcon(name) {
  return RECIPES.find(r => r.name === name) || MATERIALS[name] || null;
}

// ── Right-panel tab switching ──
function switchRightTab(tab) {
  state.activeRightTab = tab;
  saveState();
  rightTabBarEl.querySelectorAll('.right-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tab);
  });
  const onQueue = tab === 'queue';
  todoScrollEl.style.display         = onQueue ? '' : 'none';
  inventoryViewEl.style.display      = onQueue ? 'none' : '';
  clearCompletedBtn.style.display    = onQueue ? '' : 'none';
  toggleCollapseBtnEl.style.display  = onQueue && state.todoItems.length ? '' : 'none';
  markAllCraftedBtnEl.style.display  = 'none';
  if (!onQueue) renderInventory();
}

rightTabBarEl.addEventListener('click', e => {
  const btn = e.target.closest('.right-tab');
  if (btn) switchRightTab(btn.dataset.tab);
});

// ── Helper: is this ingredient name currently being produced by a queued recipe? ──
function isIngredientBeingCrafted(ingredientName) {
  return state.todoItems.some(item => {
    const recipe = RECIPES.find(r => r.id === item.recipeId);
    return recipe && recipe.name === ingredientName;
  });
}

// ── Add to queue ──
function addToQueue(recipe, qty = 1) {
  const idx = state.todoItems.findIndex(t => t.recipeId === recipe.id);
  if (idx >= 0) {
    state.todoItems[idx].qty += qty;
  } else {
    state.todoItems.push({
      id: Date.now() + Math.random(),
      recipeId: recipe.id,
      qty,
      expanded: true,
    });
  }
  saveState();
  renderTodoList();

  const card = recipeGridEl.querySelector(`[data-recipe-id="${recipe.id}"]`);
  if (card) {
    card.classList.add('added-flash');
    setTimeout(() => card.classList.remove('added-flash'), 400);
  }
}

// ── Render: station tabs ──
function renderStationTabs() {
  stationTabsEl.innerHTML = '';
  STATIONS.forEach(station => {
    const btn = document.createElement('button');
    btn.className = 'station-tab' + (state.activeStation === station.id ? ' active' : '');
    btn.textContent = station.short;
    btn.addEventListener('click', () => {
      state.activeStation    = station.id;
      state.activeCategory   = 'All';
      state.selectedRecipeId = null;
      detailQty = 1;
      renderStationTabs();
      renderCategoryTabs();
      renderRecipeGrid();
      renderRecipeDetail();
    });
    stationTabsEl.appendChild(btn);
  });
}

// ── Render: category tabs ──
function renderCategoryTabs() {
  const station = STATIONS.find(s => s.id === state.activeStation);
  const cats    = station ? station.categories : [];
  categoryTabsEl.innerHTML = '';

  const allBtn = document.createElement('button');
  allBtn.className = 'cat-tab' + (state.activeCategory === 'All' ? ' active' : '');
  const allCount = RECIPES.filter(r => r.station === state.activeStation).length;
  allBtn.innerHTML = `All <span class="cat-count">${allCount}</span>`;
  allBtn.addEventListener('click', () => {
    state.activeCategory   = 'All';
    state.selectedRecipeId = null;
    detailQty = 1;
    renderCategoryTabs();
    renderRecipeGrid();
    renderRecipeDetail();
  });
  categoryTabsEl.appendChild(allBtn);

  cats.forEach(cat => {
    const count = RECIPES.filter(r => r.station === state.activeStation && r.category === cat).length;
    const btn   = document.createElement('button');
    btn.className = 'cat-tab' + (state.activeCategory === cat ? ' active' : '');
    btn.innerHTML = `${cat} <span class="cat-count">${count}</span>`;
    btn.addEventListener('click', () => {
      state.activeCategory   = cat;
      state.selectedRecipeId = null;
      detailQty = 1;
      renderCategoryTabs();
      renderRecipeGrid();
      renderRecipeDetail();
    });
    categoryTabsEl.appendChild(btn);
  });
}

// ── Craft one queued item: consume full ingredient amounts from inventory, add output ──
function craftItem(item, recipe) {
  recipe.ingredients.forEach(ing => {
    const consumed  = ing.qty * item.qty;
    const remaining = (state.inventory[ing.item] || 0) - consumed;
    if (remaining <= 0) delete state.inventory[ing.item];
    else state.inventory[ing.item] = remaining;
  });
  state.inventory[recipe.name] = (state.inventory[recipe.name] || 0) + item.qty;
}

// ── Navigate to a recipe: switch station/category and select it ──
function selectRecipe(recipe) {
  state.activeStation    = recipe.station;
  state.activeCategory   = 'All';
  state.selectedRecipeId = recipe.id;
  detailQty = 1;
  renderStationTabs();
  renderCategoryTabs();
  renderRecipeGrid();
  renderRecipeDetail();
}

// ── Render: recipe grid ──
function getFilteredRecipes() {
  const q = state.searchQuery.toLowerCase();
  return RECIPES.filter(r => {
    if (q) return r.name.toLowerCase().includes(q) || r.description.toLowerCase().includes(q);
    return r.station === state.activeStation &&
      (state.activeCategory === 'All' || r.category === state.activeCategory);
  });
}

function renderRecipeGrid() {
  const recipes = getFilteredRecipes();
  recipeGridEl.innerHTML = '';
  if (recipes.length === 0) {
    const msg = document.createElement('div');
    msg.className   = 'no-results';
    msg.textContent = state.searchQuery ? 'No blueprints match your search.' : 'No blueprints in this category.';
    recipeGridEl.appendChild(msg);
    return;
  }
  recipes.forEach(recipe => {
    const card            = document.createElement('div');
    const isSelected      = state.selectedRecipeId === recipe.id;
    card.className        = 'recipe-icon-card' + (isSelected ? ' active' : '');
    card.dataset.recipeId = recipe.id;
    card.title            = recipe.name;

    const img     = document.createElement('img');
    img.src       = recipe.iconUrl;
    img.alt       = recipe.name;
    img.className = 'recipe-icon-img';
    const fallback = document.createElement('span');
    fallback.className   = 'icon-fallback';
    fallback.textContent = recipe.icon;
    fallback.style.display = 'none';
    img.addEventListener('error', () => { img.style.display = 'none'; fallback.style.display = 'block'; });
    card.appendChild(img);
    card.appendChild(fallback);

    card.addEventListener('click', () => {
      if (state.selectedRecipeId === recipe.id) {
        addToQueue(recipe, detailQty);
      } else {
        selectRecipe(recipe);
      }
    });

    recipeGridEl.appendChild(card);
  });
}

function renderRecipeDetail() {
  recipeDetailEl.innerHTML = '';

  if (!state.selectedRecipeId) {
    recipeDetailEl.innerHTML = `<div class="detail-empty-state"><div class="empty-icon">⬡</div><p>Select a blueprint.</p></div>`;
    return;
  }

  const recipe = RECIPES.find(r => r.id === state.selectedRecipeId);
  if (!recipe) return;

  // Hero: big icon + name + description
  const hero = document.createElement('div');
  hero.className = 'detail-hero';

  const iconWrap = document.createElement('div');
  iconWrap.className = 'detail-icon-wrap';
  const heroImg = document.createElement('img');
  heroImg.src       = recipe.iconUrl;
  heroImg.alt       = recipe.name;
  heroImg.className = 'detail-icon-img';
  const heroFallback = document.createElement('span');
  heroFallback.className   = 'icon-fallback detail-icon-fallback';
  heroFallback.textContent = recipe.icon;
  heroFallback.style.display = 'none';
  heroImg.addEventListener('error', () => { heroImg.style.display = 'none'; heroFallback.style.display = 'block'; });
  iconWrap.appendChild(heroImg);
  iconWrap.appendChild(heroFallback);
  hero.appendChild(iconWrap);

  const info = document.createElement('div');
  info.className = 'detail-info';
  const nameEl = document.createElement('div');
  nameEl.className   = 'detail-name';
  nameEl.textContent = recipe.name;
  info.appendChild(nameEl);
  if (recipe.description) {
    const descEl = document.createElement('div');
    descEl.className   = 'detail-desc';
    descEl.textContent = recipe.description;
    info.appendChild(descEl);
  }
  hero.appendChild(info);
  recipeDetailEl.appendChild(hero);

  // Ingredients
  if (recipe.ingredients.length > 0) {
    const label = document.createElement('div');
    label.className   = 'detail-section-label';
    label.textContent = 'Required Resources';
    recipeDetailEl.appendChild(label);

    const ingGrid = document.createElement('div');
    ingGrid.className = 'detail-ing-grid';

    recipe.ingredients.forEach(ing => {
      const ingRecipe = RECIPES.find(r => r.name === ing.item); // for navigation
      const ingIcon   = ingRecipe || MATERIALS[ing.item];       // for icon display
      const have      = state.inventory[ing.item] || 0;
      const need      = ing.qty;
      const satisfied = have >= need;

      const tile = document.createElement('div');
      tile.className = 'detail-ing-tile' + (ingRecipe ? ' clickable' : '');
      tile.title = ing.item;

      // Icon box
      const iconBox = document.createElement('div');
      iconBox.className = 'detail-ing-icon-box' + (satisfied ? ' satisfied' : '');

      const img     = document.createElement('img');
      img.alt       = ing.item;
      img.className = 'detail-ing-tile-img';

      if (ingIcon) {
        img.src = ingIcon.iconUrl;
        img.addEventListener('error', () => { img.style.display = 'none'; fb.style.display = 'block'; });
      } else {
        img.style.display = 'none';
      }

      const fb = document.createElement('span');
      fb.className   = 'icon-fallback';
      fb.textContent = ingIcon ? (ingIcon.icon || '?') : '?';
      fb.style.display = ingIcon ? 'none' : 'block';

      iconBox.appendChild(img);
      iconBox.appendChild(fb);
      tile.appendChild(iconBox);

      // have / need count
      const count = document.createElement('span');
      count.className   = 'detail-ing-count' + (satisfied ? ' satisfied' : '');
      count.textContent = `${have}/${need}`;
      tile.appendChild(count);

      if (ingRecipe) tile.addEventListener('click', () => selectRecipe(ingRecipe));

      ingGrid.appendChild(tile);
    });

    recipeDetailEl.appendChild(ingGrid);
  }

  // Actions: qty stepper + Add to Queue button
  const actions = document.createElement('div');
  actions.className = 'detail-actions';

  const qtyWrap = document.createElement('div');
  qtyWrap.className = 'qty-mini';

  const decBtn = document.createElement('button');
  decBtn.className   = 'qty-mini-btn';
  decBtn.textContent = '−';

  const qtyInput = document.createElement('input');
  qtyInput.type      = 'number';
  qtyInput.className = 'qty-input';
  qtyInput.value     = detailQty;
  qtyInput.min       = '1';

  const incBtn = document.createElement('button');
  incBtn.className   = 'qty-mini-btn';
  incBtn.textContent = '+';

  decBtn.addEventListener('click', () => {
    if (detailQty > 1) { detailQty--; qtyInput.value = detailQty; }
  });
  incBtn.addEventListener('click', () => {
    detailQty++;
    qtyInput.value = detailQty;
  });
  qtyInput.addEventListener('change', e => {
    const val = parseInt(e.target.value, 10);
    detailQty = (!isNaN(val) && val >= 1) ? val : 1;
    qtyInput.value = detailQty;
  });

  qtyWrap.appendChild(decBtn);
  qtyWrap.appendChild(qtyInput);
  qtyWrap.appendChild(incBtn);
  actions.appendChild(qtyWrap);

  const addBtn = document.createElement('button');
  addBtn.className   = 'detail-add-btn';
  addBtn.textContent = 'Add to Queue';
  addBtn.addEventListener('click', () => addToQueue(recipe, detailQty));
  actions.appendChild(addBtn);

  recipeDetailEl.appendChild(actions);
}

// ── Render: TODO list ──
function renderTodoList() {
  todoListEl.querySelectorAll('.todo-item').forEach(el => el.remove());

  if (state.todoItems.length === 0) {
    emptyStateEl.style.display = '';
    resourceSummaryEl.style.display = 'none';
    totalQueuedEl.textContent = '0';
    totalReadyEl.textContent  = '0';
    renderRecipeDetail();
    return;
  }
  emptyStateEl.style.display = 'none';
  let readyCount = 0;

  state.todoItems.forEach(item => {
    const recipe = RECIPES.find(r => r.id === item.recipeId);
    if (!recipe) return;

    const totalCount   = recipe.ingredients.length;
    const checkedCount = recipe.ingredients.filter(ing =>
      (state.inventory[ing.item] || 0) >= ing.qty * item.qty
    ).length;
    const isComplete = checkedCount === totalCount;
    if (isComplete) readyCount++;

    // Smooth progress based on total qty gathered vs total needed
    const totalNeeded   = recipe.ingredients.reduce((s, ing) => s + ing.qty * item.qty, 0);
    const totalGathered = recipe.ingredients.reduce((s, ing) =>
      s + Math.min(ing.qty * item.qty, state.inventory[ing.item] || 0), 0);
    const progressPct = totalNeeded > 0 ? Math.round(totalGathered / totalNeeded * 100) : 0;

    const itemEl = document.createElement('div');
    itemEl.className = ['todo-item', isComplete ? 'is-complete' : '', item.expanded ? 'expanded' : ''].filter(Boolean).join(' ');
    itemEl.dataset.id = item.id;

    // Build ingredient rows — qty stepper per ingredient
    const ingredientRows = recipe.ingredients.map(ing => {
      const have      = state.inventory[ing.item] || 0;
      const need      = ing.qty * item.qty;
      const done      = have >= need;
      const queued    = !done && isIngredientBeingCrafted(ing.item);
      const ingIcon   = getItemIcon(ing.item);
      const iconHtml  = ingIcon
        ? `<img class="ing-icon-img" src="${ingIcon.iconUrl}" alt="${ing.item}"
             onerror="this.style.display='none';this.nextElementSibling.style.display='inline'"
           ><span class="ing-icon-fallback" style="display:none">${ingIcon.icon || '?'}</span>`
        : `<span class="ing-icon-fallback">?</span>`;
      return `
        <div class="ingredient-row${done ? ' complete' : ''}${queued ? ' queued-ingredient' : ''}">
          <div class="ing-icon-wrap">${iconHtml}</div>
          <span class="ingredient-label">${ing.item}</span>
          ${queued ? '<span class="ingr-queue-dot" title="Queued for crafting"></span>' : ''}
          <div class="ing-qty-wrap">
            <button class="ing-qty-btn" data-action="dec" data-item="${ing.item}">−</button>
            <input type="number" class="ing-qty-input" data-item="${ing.item}"
              value="${have}" min="0">
            <span class="ing-qty-sep">/</span>
            <span class="ing-qty-needed">${need}</span>
            ${done ? '<span class="ing-complete-check">✓</span>' : ''}
            <button class="ing-qty-btn" data-action="inc" data-item="${ing.item}">+</button>
          </div>
        </div>`;
    }).join('');

    itemEl.innerHTML = `
      <div class="todo-item-header">
        <div class="todo-item-icon-wrap">
          <img class="todo-item-img" src="${recipe.iconUrl}" alt="${recipe.name}" width="28" height="28"
            onerror="this.style.display='none';this.nextElementSibling.style.display='inline'">
          <span class="icon-fallback" style="display:none">${recipe.icon}</span>
        </div>
        <div class="todo-item-info">
          <div class="todo-item-name">${recipe.name}</div>
          <div class="todo-item-progress">${checkedCount}/${totalCount} ingredients</div>
        </div>
        <div class="todo-item-controls">
          <div class="qty-mini">
            <button class="qty-mini-btn" data-action="dec">−</button>
            <input type="number" class="qty-input" value="${item.qty}" min="1">
            <button class="qty-mini-btn" data-action="inc">+</button>
          </div>
          <button class="todo-item-remove" title="Remove">✕</button>
        </div>
        <span class="todo-collapse-icon">▼</span>
      </div>
      <div class="todo-ingredients">
        <div class="ingr-progress-bar">
          <div class="ingr-progress-fill" style="width:${progressPct}%"></div>
        </div>
        ${ingredientRows}
        <div class="todo-ingr-actions">
          <button class="mark-crafted-btn" ${isComplete ? '' : 'disabled'}>Mark as Crafted ✓</button>
        </div>
      </div>
    `;

    itemEl.querySelector('.todo-item-header').addEventListener('click', e => {
      if (e.target.closest('.todo-item-controls')) return;
      item.expanded = !item.expanded;
      saveState();
      renderTodoList();
    });

    const qtyInput = itemEl.querySelector('.qty-input');
    qtyInput.addEventListener('click',  e => e.stopPropagation());
    qtyInput.addEventListener('change', e => {
      const val = parseInt(e.target.value, 10);
      if (!isNaN(val) && val >= 1) { item.qty = val; saveState(); renderTodoList(); }
      else e.target.value = item.qty;
    });

    itemEl.querySelectorAll('.qty-mini-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        if (btn.dataset.action === 'inc') item.qty++;
        else if (btn.dataset.action === 'dec' && item.qty > 1) item.qty--;
        saveState();
        renderTodoList();
      });
    });

    itemEl.querySelector('.todo-item-remove').addEventListener('click', e => {
      e.stopPropagation();
      state.todoItems = state.todoItems.filter(t => t.id !== item.id);
      saveState();
      renderTodoList();
    });

    itemEl.querySelectorAll('.ing-qty-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const ingName = btn.dataset.item;
        let   curr    = state.inventory[ingName] || 0;
        if (btn.dataset.action === 'inc') curr = curr + 1;
        else                              curr = Math.max(0, curr - 1);
        if (curr <= 0) delete state.inventory[ingName];
        else state.inventory[ingName] = curr;
        saveState();
        renderTodoList();
      });
    });

    itemEl.querySelectorAll('.ing-qty-input').forEach(input => {
      input.addEventListener('click', e => e.stopPropagation());
      input.addEventListener('change', e => {
        const ingName = input.dataset.item;
        const val     = parseInt(e.target.value, 10);
        const newVal  = isNaN(val) ? 0 : Math.max(0, val);
        if (newVal <= 0) delete state.inventory[ingName];
        else state.inventory[ingName] = newVal;
        saveState();
        renderTodoList();
      });
    });

    itemEl.querySelector('.mark-crafted-btn').addEventListener('click', e => {
      e.stopPropagation();
      craftItem(item, recipe);
      state.todoItems = state.todoItems.filter(t => t.id !== item.id);
      saveState();
      renderTodoList();
    });

    todoListEl.appendChild(itemEl);
  });

  totalQueuedEl.textContent = state.todoItems.length;
  totalReadyEl.textContent  = readyCount;

  // Sync header button visibility
  const anyExpanded  = state.todoItems.some(i => i.expanded);
  toggleCollapseBtnEl.textContent   = anyExpanded ? 'Collapse All' : 'Expand All';
  toggleCollapseBtnEl.style.display = state.todoItems.length ? '' : 'none';

  const completeCount = state.todoItems.filter(i => {
    const r = RECIPES.find(r => r.id === i.recipeId);
    return r && r.ingredients.every(ing => (state.inventory[ing.item] || 0) >= ing.qty * i.qty);
  }).length;
  markAllCraftedBtnEl.style.display  = completeCount > 0 ? '' : 'none';
  markAllCraftedBtnEl.textContent    = `Craft All (${completeCount})`;

  renderResourceSummary();
  renderRecipeDetail();
}

// ── Render: resource summary ──
// Builds a table: Item | Need | Have (editable) | Left (+ queue button)
function renderResourceSummary() {
  if (state.todoItems.length === 0) {
    resourceSummaryEl.style.display = 'none';
    return;
  }

  // Aggregate totals across all queue items
  const totals = {};
  state.todoItems.forEach(item => {
    const recipe = RECIPES.find(r => r.id === item.recipeId);
    if (!recipe) return;
    recipe.ingredients.forEach(ing => {
      totals[ing.item] = (totals[ing.item] || 0) + ing.qty * item.qty;
    });
  });

  resourceListEl.innerHTML = '';

  // Header row
  const header = document.createElement('div');
  header.className = 'rr-headers';
  header.innerHTML = `<span>Item</span><span class="rr-h-r">Need</span><span class="rr-h-r">Have</span><span class="rr-h-r">Left</span>`;
  resourceListEl.appendChild(header);

  Object.entries(totals)
    .sort(([a], [b]) => a.localeCompare(b))
    .forEach(([itemName, total]) => {
      const have      = state.inventory[itemName] || 0;
      const left      = Math.max(0, total - have);
      const satisfied = left === 0;
      const craftable  = RECIPES.find(r => r.name === itemName);
      const iconSource = craftable || MATERIALS[itemName];
      const isQueued   = isIngredientBeingCrafted(itemName);

      const row = document.createElement('div');
      row.className = ['rr-row', satisfied ? 'rr-satisfied' : '', isQueued ? 'rr-queued' : ''].filter(Boolean).join(' ');

      // ── Item cell ──
      const itemCell = document.createElement('div');
      itemCell.className = 'rr-item-cell';

      if (iconSource) {
        const img    = document.createElement('img');
        img.src      = iconSource.iconUrl;
        img.alt      = itemName;
        img.width    = 16; img.height = 16;
        img.className = 'rr-img';
        img.addEventListener('error', () => img.remove());
        itemCell.appendChild(img);
      }

      if (isQueued) {
        const dot = document.createElement('span');
        dot.className = 'rr-queued-dot';
        dot.title = 'This item is in the build queue';
        itemCell.appendChild(dot);
      }

      const nameEl      = document.createElement('span');
      nameEl.className   = 'rr-name';
      nameEl.textContent = itemName;
      itemCell.appendChild(nameEl);
      row.appendChild(itemCell);

      // ── Need cell ──
      const needEl      = document.createElement('span');
      needEl.className   = 'rr-num rr-need-num';
      needEl.textContent = total;
      row.appendChild(needEl);

      // ── Have cell (editable input) ──
      const haveCell  = document.createElement('div');
      haveCell.className = 'rr-have-cell';
      const haveInput = document.createElement('input');
      haveInput.type      = 'number';
      haveInput.min       = '0';
      haveInput.className = 'rr-have-input';
      haveInput.value     = have || '';
      haveInput.placeholder = '0';
      haveInput.addEventListener('click', e => e.stopPropagation());
      haveInput.addEventListener('change', e => {
        const val = parseInt(e.target.value, 10);
        state.inventory[itemName] = isNaN(val) ? 0 : Math.max(0, val);
        saveState();
        renderResourceSummary();
        renderRecipeDetail();
      });
      haveCell.appendChild(haveInput);
      row.appendChild(haveCell);

      // ── Left cell ──
      const leftCell  = document.createElement('div');
      leftCell.className = 'rr-left-cell';

      if (satisfied) {
        const check      = document.createElement('span');
        check.className   = 'rr-check';
        check.textContent = '✓';
        leftCell.appendChild(check);
      } else {
        const leftNum      = document.createElement('span');
        leftNum.className   = 'rr-num rr-left-num';
        leftNum.textContent = left;
        leftCell.appendChild(leftNum);

        if (craftable) {
          const addBtn   = document.createElement('button');
          addBtn.className = 'rr-add-btn';
          addBtn.title   = `Add ${itemName} ×${left} to build queue`;
          addBtn.textContent = '+';
          addBtn.addEventListener('click', e => {
            e.stopPropagation();
            // Queue exactly as many as still needed (accounting for inventory)
            addToQueue(craftable, left);
          });
          leftCell.appendChild(addBtn);
        }
      }

      row.appendChild(leftCell);
      resourceListEl.appendChild(row);
    });

  resourceSummaryEl.style.display = '';
}

// ── Render: inventory view ──
function renderInventory() {
  inventoryViewEl.innerHTML = '';
  const entries = Object.entries(state.inventory).filter(([, qty]) => qty > 0);

  if (entries.length === 0) {
    inventoryViewEl.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">◎</div>
        <p>Inventory is empty.</p>
        <p class="empty-sub">Mark items as crafted to add them here.</p>
      </div>`;
    return;
  }

  const list = document.createElement('div');
  list.className = 'inv-list';

  // Header
  const header = document.createElement('div');
  header.className = 'inv-header';
  header.innerHTML = `<span>Item</span><span class="rr-h-r">Qty</span><span></span>`;
  list.appendChild(header);

  entries.sort(([a], [b]) => a.localeCompare(b)).forEach(([itemName, qty]) => {
    const iconSrc = RECIPES.find(r => r.name === itemName) || MATERIALS[itemName];

    const row = document.createElement('div');
    row.className = 'inv-row';

    // Item cell
    const itemCell = document.createElement('div');
    itemCell.className = 'rr-item-cell';
    if (iconSrc) {
      const img     = document.createElement('img');
      img.src       = iconSrc.iconUrl;
      img.alt       = itemName;
      img.className = 'rr-img';
      img.addEventListener('error', () => img.remove());
      itemCell.appendChild(img);
    }
    const nameEl      = document.createElement('span');
    nameEl.className   = 'rr-name inv-name';
    nameEl.textContent = itemName;
    itemCell.appendChild(nameEl);
    row.appendChild(itemCell);

    // Qty input
    const input       = document.createElement('input');
    input.type        = 'number';
    input.min         = '0';
    input.className   = 'rr-have-input';
    input.value       = qty;
    input.addEventListener('change', e => {
      const val = parseInt(e.target.value, 10);
      if (isNaN(val) || val <= 0) delete state.inventory[itemName];
      else state.inventory[itemName] = val;
      saveState();
      renderInventory();
      renderTodoList();
    });
    row.appendChild(input);

    // Remove button
    const removeBtn       = document.createElement('button');
    removeBtn.className   = 'todo-item-remove';
    removeBtn.textContent = '✕';
    removeBtn.title       = 'Remove from inventory';
    removeBtn.addEventListener('click', () => {
      delete state.inventory[itemName];
      saveState();
      renderInventory();
      renderTodoList();
    });
    row.appendChild(removeBtn);

    list.appendChild(row);
  });

  // Clear all button
  const clearAll       = document.createElement('button');
  clearAll.className   = 'inv-clear-btn';
  clearAll.textContent = 'Clear All';
  clearAll.addEventListener('click', () => {
    state.inventory = {};
    saveState();
    renderInventory();
    renderTodoList();
  });
  list.appendChild(clearAll);

  inventoryViewEl.appendChild(list);
}

// ── Global listeners ──
searchInput.addEventListener('input', e => {
  state.searchQuery = e.target.value;
  renderRecipeGrid();
  const searching = !!e.target.value;
  stationTabsEl.style.opacity  = searching ? '0.4' : '';
  categoryTabsEl.style.opacity = searching ? '0.4' : '';
});

searchInput.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    searchInput.value            = '';
    state.searchQuery            = '';
    stationTabsEl.style.opacity  = '';
    categoryTabsEl.style.opacity = '';
    renderRecipeGrid();
  }
});

markAllCraftedBtnEl.addEventListener('click', () => {
  const completed = state.todoItems.filter(item => {
    const r = RECIPES.find(r => r.id === item.recipeId);
    return r && r.ingredients.every(ing => (state.inventory[ing.item] || 0) >= ing.qty * item.qty);
  });
  completed.forEach(item => craftItem(item, RECIPES.find(r => r.id === item.recipeId)));
  const ids = new Set(completed.map(i => i.id));
  state.todoItems = state.todoItems.filter(i => !ids.has(i.id));
  saveState();
  renderTodoList();
});

toggleCollapseBtnEl.addEventListener('click', () => {
  const anyExpanded = state.todoItems.some(i => i.expanded);
  state.todoItems.forEach(i => { i.expanded = !anyExpanded; });
  saveState();
  renderTodoList();
});

clearCompletedBtn.addEventListener('click', () => {
  state.todoItems = state.todoItems.filter(item => {
    const recipe = RECIPES.find(r => r.id === item.recipeId);
    if (!recipe) return false;
    return !recipe.ingredients.every(ing => (state.inventory[ing.item] || 0) >= ing.qty * item.qty);
  });
  saveState();
  renderTodoList();
});

// ── Init ──
loadState();
state.selectedRecipeId = null; // never persist selection across sessions
renderStationTabs();
renderCategoryTabs();
renderRecipeGrid();
renderRecipeDetail();
renderTodoList();
switchRightTab(state.activeRightTab);
