(() => {
  const whatsappNumber = '5587981089953';
  const toWhatsApp = (topic) => `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Olá! Gostaria de receber orientação sobre: ${topic}.`)}`;
  document.querySelectorAll('[data-topic]').forEach(link => {
    link.href = toWhatsApp(link.dataset.topic);
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', `${link.dataset.topic}: iniciar conversa de orientação independente pelo WhatsApp, abre em nova aba`);
  });
  const menuBtn = document.querySelector('.menu-button');
  const nav = document.querySelector('#nav');
  const close = () => { menuBtn.setAttribute('aria-expanded', 'false'); menuBtn.setAttribute('aria-label', 'Abrir menu'); nav.classList.remove('is-open'); };
  menuBtn?.addEventListener('click', () => {
    const open = menuBtn.getAttribute('aria-expanded') !== 'true';
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    nav.classList.toggle('is-open', open);
  });
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
  const activate = tab => {
    tabs.forEach(t => {
      const selected = t === tab;
      t.setAttribute('aria-selected', String(selected));
      t.tabIndex = selected ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !selected;
    });
  };
  tabs.forEach((tab,i) => {
    tab.addEventListener('click', () => activate(tab));
    tab.addEventListener('keydown', e => {
      if (!['ArrowLeft','ArrowRight','Home','End'].includes(e.key)) return;
      e.preventDefault();
      const index = e.key === 'Home' ? 0 : e.key === 'End' ? tabs.length - 1 : (i+(e.key==='ArrowRight'?1:-1)+tabs.length) % tabs.length;
      activate(tabs[index]); tabs[index].focus();
    });
  });
  document.getElementById('year').textContent = String(new Date().getFullYear());
})();