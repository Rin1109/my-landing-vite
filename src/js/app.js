// ВСЕ ИМПОРТЫ ВВЕРХУ
// 1. Импорт стилей (Обязательно для Vite, чтобы он видел SCSS)
import "../scss/main.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// --- Логика бургер-меню ---
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

// --- Логика "Show more" ---
const loadMoreBtn = document.querySelector("#load-more");
// Получаем только те карточки, которые изначально скрыты
const productsContainer = document.querySelector("#products-container");

if (loadMoreBtn && productsContainer) {
  loadMoreBtn.addEventListener("click", () => {
    // Получаем все карточки как массив
    const allCards = Array.from(
      productsContainer.querySelectorAll(".product-card"),
    );

    // Проверяем текст кнопки
    if (loadMoreBtn.textContent === "Show more") {
      // ЛОГИКА ОТКРЫТИЯ
      const hiddenCards = productsContainer.querySelectorAll(
        ".product-card.is-hidden",
      );
      const cardsToOpen = 4;

      for (let i = 0; i < cardsToOpen && i < hiddenCards.length; i++) {
        hiddenCards[i].classList.remove("is-hidden");
      }

      // Если больше скрытых нет — меняем на "Hide cards"
      const remainingHidden = productsContainer.querySelectorAll(
        ".product-card.is-hidden",
      );
      if (remainingHidden.length === 0) {
        loadMoreBtn.textContent = "Hide cards";
      }
    } else {
      // ЛОГИКА СКРЫТИЯ ОБРАТНО
      // 1. Сначала плавно скроллим вверх к началу секции
      productsContainer.scrollIntoView({ behavior: "smooth" });

      // 2. Ждем немного (пока идет скролл), а потом скрываем карточки
      setTimeout(() => {
        allCards.forEach((card, index) => {
          if (index >= 4) {
            card.classList.add("is-hidden");
          }
        });
        loadMoreBtn.textContent = "Show more";
      }, 400); // 400мс — это время, пока глаз следит за скроллом
    }
  });
}

// --- Инициализация Swiper ---
const swiper = new Swiper(".sec5-cards", {
  modules: [Navigation, Pagination],
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
