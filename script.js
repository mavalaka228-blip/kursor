'use strict';
const backdrop = document.getElementById('bookingBackdrop');
const form = document.getElementById('bookingForm');
const result = document.getElementById('bookingSuccess');
const dateInput = document.getElementById('date');
const menu = document.getElementById('mobileNav');
const menuToggle = document.getElementById('menuToggle');
let previousFocus;

const servicePrices = {
  'Мужская стрижка': 2000,
  'Борода и усы': 1200,
  'Стрижка + борода': 2800,
  'Стрижка машинкой': 1000
};
const serviceSelect = document.getElementById('service');
const bookingPrice = document.getElementById('bookingPrice');
function updateBookingPrice() {
  const price = servicePrices[serviceSelect.value];
  bookingPrice.textContent = typeof price === 'number' ? price.toLocaleString('ru-RU') + ' ₽' : 'Уточняется';
}
serviceSelect.addEventListener('change', updateBookingPrice);
updateBookingPrice();

function localDateISO(date) { const d = new Date(date.getTime() - date.getTimezoneOffset() * 60000); return d.toISOString().slice(0,10); }
function openBooking() {
  previousFocus = document.activeElement;
  dateInput.min = localDateISO(new Date());
  backdrop.hidden = false;
  document.body.classList.add('modal-open');
  result.hidden = true;
  form.hidden = false;
  updateBookingPrice();
  document.getElementById('service').focus();
  menu.classList.remove('open');
  menuToggle.setAttribute('aria-expanded','false');
}
function closeBooking() { backdrop.hidden = true; document.body.classList.remove('modal-open'); previousFocus?.focus(); }
document.querySelectorAll('[data-open-booking]').forEach(btn=>btn.addEventListener('click',openBooking));
document.getElementById('closeBooking').addEventListener('click',closeBooking);
backdrop.addEventListener('click',event=>{if(event.target===backdrop)closeBooking();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!backdrop.hidden)closeBooking();if(event.key==='Tab'&&!backdrop.hidden){const controls=[...backdrop.querySelectorAll('button:not([hidden]),input:not([hidden]),select:not([hidden])')].filter(el=>el.offsetParent!==null);if(!controls.length)return;const first=controls[0],last=controls[controls.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}}});
form.addEventListener('submit',event=>{
 event.preventDefault();if(!form.reportValidity())return;
 const data=Object.fromEntries(new FormData(form).entries());
 if(data.date<localDateISO(new Date())){dateInput.setCustomValidity('Выберите сегодняшнюю или будущую дату');dateInput.reportValidity();return;}

 const safe=document.createElement('span');safe.textContent=`${data.name}, демозапись: ${data.service}, ${data.date} в ${data.time}. Стоимость: ${bookingPrice.textContent}. Оплата: ${data.payment}.`;
 result.replaceChildren(document.createTextNode('Демозапись создана! '),safe,document.createElement('br'),document.createTextNode('Данные никуда не отправлены. Это пример работы интерфейса.'));
 result.hidden=false;form.hidden=true;
});
dateInput.addEventListener('input',()=>dateInput.setCustomValidity(''));
menuToggle.addEventListener('click',()=>{const isOpen=menu.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(isOpen));});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');}));

// Price-list actions: open the modal with the corresponding service preselected.
document.querySelectorAll('[data-service]').forEach(button => {
  button.addEventListener('click', () => {
    openBooking();
    document.getElementById('service').value = button.dataset.service;
    updateBookingPrice();
  });
});
// Prevent opening an empty mobile navigation during booking.
window.addEventListener('resize', () => {
  if (window.innerWidth > 700) {
    menu.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
});
