const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.count);
    const start = performance.now();
    const duration = 1100;
    const tick = now => {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor(target * (1 - Math.pow(1 - progress, 3)));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    counterObserver.unobserve(el);
  });
}, { threshold: .7 });
document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

const industryData = {
  hospitality: {
    title: 'Restaurant booking agent',
    messages: [
      ['customer', 'Do you have a table for four tomorrow evening?'],
      ['agent', 'Yes. I have 7:00pm or 8:30pm available. Which works best?'],
      ['customer', '7:00pm please.'],
      ['agent success', 'Booked. I’ve sent the confirmation and dietary requirements form.']
    ]
  },
  healthcare: {
    title: 'Patient access agent',
    messages: [
      ['customer', 'I need to move my consultation to next week.'],
      ['agent', 'I can help. Dr Shah has Tuesday at 2:20pm or Thursday at 11:00am.'],
      ['customer', 'Thursday works.'],
      ['agent success', 'Rescheduled. Your updated confirmation is on its way.']
    ]
  },
  property: {
    title: 'Property enquiry agent',
    messages: [
      ['customer', 'Is the two-bedroom flat on King Street still available?'],
      ['agent', 'Yes. It is available from 12 August. Shall I arrange a viewing?'],
      ['customer', 'Saturday morning would be ideal.'],
      ['agent success', 'Viewing booked for 10:30am. The agent and prospect have been notified.']
    ]
  },
  professional: {
    title: 'Client intake agent',
    messages: [
      ['customer', 'Can someone advise on setting up a UK subsidiary?'],
      ['agent', 'Yes. I’ll ask three questions to match you with the right specialist.'],
      ['customer', 'We are a US company with 14 employees.'],
      ['agent success', 'Qualified and routed. A corporate adviser will call at 3:00pm.']
    ]
  }
};

document.querySelectorAll('.industry-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.industry-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const data = industryData[tab.dataset.industry];
    document.querySelector('#demo-title').textContent = data.title;
    const container = document.querySelector('#demo-messages');
    container.innerHTML = data.messages.map(([type, text]) => `<div class="message ${type}">${text}</div>`).join('');
  });
});

const form = document.querySelector('#contact-form');
form?.addEventListener('submit', event => {
  event.preventDefault();
  const status = form.querySelector('.form-status');
  status.textContent = 'Thanks — your request has been captured. Connect this form to your CRM or email provider before launch.';
  form.reset();
});
