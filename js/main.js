document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  const filterBar = document.querySelector('.filter-bar');
  if (filterBar) {
    filterBar.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.toggle('active', b === btn));
      const type = btn.dataset.type;
      document.querySelectorAll('.card[data-type]').forEach(card => {
        card.hidden = type !== 'all' && card.dataset.type !== type;
      });
    });
  }

  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const expanded = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', String(!expanded));
      trigger.nextElementSibling.hidden = expanded;
    });
  });

  const form = document.getElementById('booking-form');
  if (form) {
    // F1: [Book] links pass their item via the URL hash (#item=...) so the
    // select arrives pre-filled and no context is lost entering the form.
    const requested = new URLSearchParams(location.hash.slice(1)).get('item');
    if (requested) {
      const select = form.elements['item'];
      const known = Array.from(select.options).some(o => o.value === requested);
      if (!known) select.add(new Option(requested, requested));
      select.value = requested;
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.elements['name'].value.trim();
      const item = form.elements['item'].value;
      const party = form.elements['party'].value;
      const conf = document.getElementById('booking-confirmation');
      conf.textContent = `Thanks, ${name}! Your ${item} request was received for a party of ${party}. We'll email you within one business day to confirm availability. (Prototype only — no real booking.)`;
      conf.hidden = false;
      conf.setAttribute('tabindex', '-1');
      conf.focus();
    });
  }
});
