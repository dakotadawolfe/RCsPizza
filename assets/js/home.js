/**
 * RC's NYC Pizza & Pasta - Home page: render location cards from locations.json
 */
(function () {
  'use strict';

  var LOCATIONS_URL = 'assets/data/locations.json';
  var FALLBACK_IMAGE = 'https://rcsnycpizza.com/wp-content/uploads/2018/02/rcs-pizza-slice-1024x683.jpg';
  var container = document.getElementById('home-locations');

  if (!container) return;

  function escapeHtml(text) {
    if (text == null || text === '') return '';
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function render(locations) {
    container.innerHTML = '';
    if (!locations || !locations.length) {
      container.innerHTML = '<p class="section-subtitle">No locations available.</p>';
      return;
    }
    locations.forEach(function (loc) {
      var card = document.createElement('article');
      card.className = 'location-card';

      var name = loc.name ? String(loc.name) : '';
      var imgSrc = (loc.image && String(loc.image).trim()) ? loc.image : FALLBACK_IMAGE;
      var imgAlt = name ? escapeHtml(name) + ' storefront' : 'Location storefront';

      var img = document.createElement('img');
      img.src = imgSrc;
      img.alt = imgAlt;
      img.loading = 'lazy';
      img.decoding = 'async';
      card.appendChild(img);

      if (name) {
        var h3 = document.createElement('h3');
        h3.textContent = name;
        card.appendChild(h3);
      }

      if (loc.address) {
        var address = document.createElement('p');
        address.className = 'address';
        address.textContent = loc.address;
        card.appendChild(address);
      }

      if (loc.phone || loc.phoneRaw) {
        var phone = document.createElement('p');
        phone.className = 'phone';
        var phoneLink = document.createElement('a');
        var raw = loc.phoneRaw ? String(loc.phoneRaw).replace(/\D/g, '') : (loc.phone ? String(loc.phone).replace(/\D/g, '') : '');
        phoneLink.href = raw ? 'tel:+1' + raw : '#';
        phoneLink.textContent = loc.phone || loc.phoneRaw || '';
        phone.appendChild(phoneLink);
        card.appendChild(phone);
      }

      if (loc.hoursSummary) {
        var hours = document.createElement('p');
        hours.className = 'hours';
        hours.textContent = loc.hoursSummary;
        card.appendChild(hours);
      }

      var actions = document.createElement('div');
      actions.className = 'actions';

      var orderBtn = document.createElement('a');
      orderBtn.href = loc.orderUrl || '#';
      orderBtn.className = 'btn btn-primary';
      orderBtn.textContent = 'Order Now';
      orderBtn.setAttribute('target', '_blank');
      orderBtn.setAttribute('rel', 'noopener');
      actions.appendChild(orderBtn);

      var directionsBtn = document.createElement('a');
      directionsBtn.href = loc.mapsUrl || '#';
      directionsBtn.className = 'btn btn-outline';
      directionsBtn.textContent = 'Directions';
      directionsBtn.setAttribute('target', '_blank');
      directionsBtn.setAttribute('rel', 'noopener');
      actions.appendChild(directionsBtn);

      card.appendChild(actions);
      container.appendChild(card);
    });
  }

  function showError(msg) {
    container.innerHTML = '<p class="section-subtitle">' + escapeHtml(msg) + '</p>';
  }

  fetch(LOCATIONS_URL)
    .then(function (res) {
      if (!res.ok) throw new Error('Locations could not be loaded. Please try again later.');
      return res.json();
    })
    .then(function (data) {
      var locations = data.locations || [];
      render(locations);
    })
    .catch(function () {
      showError('Locations could not be loaded. Please try again later.');
    });
})();
