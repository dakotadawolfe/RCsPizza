/**
 * RC's NYC Pizza & Pasta - Menu page: load and filter from menu.json
 */
(function () {
  'use strict';

  var MENU_URL = 'assets/data/menu.json';
  var container = document.getElementById('menu-items');
  var filtersEl = document.getElementById('menu-filters');
  var disclaimerEl = document.getElementById('menu-disclaimer');

  if (!container) return;

  var menuData = null;
  var activeCategory = 'all';

  function renderFilters(categories) {
    if (!filtersEl) return;
    var allBtn = document.createElement('button');
    allBtn.type = 'button';
    allBtn.className = 'btn active';
    allBtn.setAttribute('data-category', 'all');
    allBtn.textContent = 'All';
    filtersEl.appendChild(allBtn);

    categories.forEach(function (cat) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'btn';
      btn.setAttribute('data-category', cat.id);
      btn.textContent = cat.name;
      filtersEl.appendChild(btn);
    });
  }

  function renderItems(items) {
    var filtered = activeCategory === 'all'
      ? items
      : items.filter(function (item) { return item.category === activeCategory; });

    container.innerHTML = '';
    if (filtered.length === 0) {
      container.innerHTML = '<p class="section-subtitle">No items in this category.</p>';
      return;
    }

    filtered.forEach(function (item) {
      var card = document.createElement('div');
      card.className = 'menu-item';
      var name = document.createElement('h3');
      name.textContent = item.name;
      card.appendChild(name);
      if (item.description) {
        var desc = document.createElement('p');
        desc.className = 'description';
        desc.textContent = item.description;
        card.appendChild(desc);
      }
      if (item.sizes && item.sizes.length) {
        var sizes = document.createElement('p');
        sizes.className = 'sizes';
        sizes.textContent = item.sizes.join(' • ');
        card.appendChild(sizes);
      }
      if (item.price != null && item.price !== '') {
        var price = document.createElement('p');
        price.className = 'price';
        price.textContent = typeof item.price === 'string' ? item.price : '$' + Number(item.price).toFixed(2);
        card.appendChild(price);
      }
      container.appendChild(card);
    });
  }

  function setActiveFilter(categoryId) {
    activeCategory = categoryId;
    var btns = filtersEl ? filtersEl.querySelectorAll('.btn') : [];
    btns.forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-category') === categoryId);
    });
    if (menuData && menuData.items) renderItems(menuData.items);
  }

  function init() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', MENU_URL, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      if (xhr.status !== 200) {
        container.innerHTML = '<p class="section-subtitle">Menu could not be loaded. Please try again later.</p>';
        return;
      }
      try {
        menuData = JSON.parse(xhr.responseText);
        if (menuData.categories) renderFilters(menuData.categories);
        if (menuData.items) renderItems(menuData.items);
      } catch (e) {
        container.innerHTML = '<p class="section-subtitle">Menu data is invalid.</p>';
      }
    };
    xhr.send();
  }

  if (filtersEl) {
    filtersEl.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-category]');
      if (btn) setActiveFilter(btn.getAttribute('data-category'));
    });
  }

  init();
})();
