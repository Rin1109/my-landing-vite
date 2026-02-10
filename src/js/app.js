// 1. Импорт стилей (Обязательно для Vite, чтобы он видел SCSS)
import "../scss/main.scss";

// 2. Логика бургер-меню
const burgerBtn = document.querySelector("#burgerBtn");
const navMenu = document.querySelector(".nav");

// Проверяем, существует ли кнопка, прежде чем вешать событие
if (burgerBtn && navMenu) {
  burgerBtn.addEventListener("click", () => {
    // Переключаем класс видимости для меню
    navMenu.classList.toggle("visible");

    // Логика смены иконки внутри кнопки (с гамбургера на крестик)
    const icons = burgerBtn.querySelectorAll("img");
    icons.forEach((icon) => {
      icon.classList.toggle("hidden");
    });

    // Блокируем скролл страницы при открытом меню (по желанию)
    document.body.classList.toggle("no-scroll");
  });
}

import "@fortawesome/fontawesome-free/css/all.min.css";
