import "../styles/reset.scss";
import "../styles/styles.scss";

const checkboxes = {
  requirements: ["minimum", "recomended"],
versions: ["standard", "limited"],
};

const classes = {
  opened: 'opened',
  active: 'active',
}

const header = document.querySelector('.header');
const menuButton = document.querySelector('.header-menu__button');
const menuLink = document.querySelectorAll(".menu-link");
const checkbox = document.querySelectorAll ('.checkbox');
const faqItem = document.querySelectorAll('.faq-item');

const toggleMenu = () => header.classList.toggle(classes.opened);

const scrollToSection = (e) => {
  e.preventDefault();
  const href = e.currentTarget.getAttribute("href");

  if (!href && !href.startsWith("#")) return;

  const section = href.slice(1)
  const top = document.getElementById(section)?.offsetTop || 0;
  window, scrollTo({ top, behavior: "smooth" });
}
//------------таймер------------------/

const formatValue = (value) => (value < 10 ? `0${value}` : value);

const getTimerValues = (diff) => ({
  seconds: (diff / 1000) % 60,
  minutes: (diff / (1000 * 60)) % 60,
  hours: (diff / (1000 * 3600)) % 24,
  days: (diff / (1000 * 3600 * 24)) % 30,
});

const setTimerValues = (values) => {
  Object.entries(values).forEach(([key, value]) => {
    const timerValue = document.getElementById(key);
    timerValue.innerText = formatValue(Math.floor(value));
  });
};

const startTimer = (date) => {
  const id = setInterval (() => {
    const diff = new Date(date).getTime() - new Date().getTime();

    if (diff < 0) {
      clearInterval(id);
      return;
    }
    setTimerValues(getTimerValues(diff));
  }, 1000)
}

//----------- чекбокс--------------/
const handleCheckbox = ({ currentTarget: { checked, name}} ) => {
  const { active } = classes;
  const value = checkboxes[name][Number(checked)];
  const list = document.getElementById(value);
  const tabs = document.querySelectorAll(`[data-${name}]`);
  const siblings = list.parentElement.children;

  for (const item of siblings) item.classList.remove(active);
  for (const tab of tabs) {
    tab.classList.remove(active);
    tab.dataset[name] === value && tab.classList.add(active);
  }
  list.classList.add(active);
  }

  //---------------Swiper-------------------/

  //----------------FAQ----------------------/
const handleFaqItem = ({ currentTarget: target}) => {
  target.classList.toggle(classes.opened);
  const isOpened = target.classList.contains(classes.opened);
  const height = target.querySelector("p").clientHeight;
  const content = target.querySelector(".faq-item__content");

  content.style.height = `${isOpened ? height : 0}px`
}

startTimer("April 05, 2024 00:00:00");     //  время до нконца отсчета
menuButton.addEventListener('click', toggleMenu);
menuLink.forEach((link) => link.addEventListener("click", scrollToSection));
checkbox.forEach((box) => box.addEventListener("click", handleCheckbox));
faqItem.forEach((item) => item.addEventListener("click", handleFaqItem));
