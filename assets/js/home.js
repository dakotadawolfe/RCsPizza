/**
 * RC's NYC Pizza & Pasta - Homepage: render location cards from locations.json
 */
(function () {
  'use strict';

  var LOCATIONS_URL = 'assets/data/locations.json';
  var container = document.getElementById('home-locations');

  if (!container) return;

  function render(locations) {
    container.innerHTML = '';
    locations.forEach(function (loc) {
      var card = document.createElement('article');
      card.className = 'location-card';

      var h3 = document.createElement('h3');
      h3.textContent = loc.name;
      card.appendChild(h3);

      var address = document.createElement('p');
      address.className = 'address';
      address.textContent = loc.address;
      card.appendChild(address);

      var phone = document.createElement('p');
      phone.className = 'phone';
      var phoneLink = document.createElement('a');
      phoneLink.href = 'tel:+1' + (loc.phoneRaw || loc.phone.replace(/\D/g, ''));
      phoneLink.textContent = loc.phone;
      phone.appendChild(phoneLink);
      card.appendChild(phone);

      var hours = document.createElement('p');
      hours.className = 'hours';
      hours.textContent = loc.hoursSummary || '';
      card.appendChild(hours);

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

  var xhr = new XMLHttpRequest();
  xhr.open('GET', LOCATIONS_URL, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return;
    if (xhr.status !== 200) {
      container.innerHTML = '<p class="section-subtitle">Locations could not be loaded. Please try again later.</p>';
      return;
    }
    try {
      var data = JSON.parse(xhr.responseText);
      var locations = data.locations || [];
      render(locations);
    } catch (e) {
      container.innerHTML = '<p class="section-subtitle">Location data is invalid.</p>';
    }
  };
  xhr.send();
})();
