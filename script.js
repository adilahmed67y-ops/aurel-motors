const filterButtons = document.querySelectorAll(".filter-button");
const carCards = document.querySelectorAll(".car-card");
const searchInput = document.querySelector("#car-search");
const emptyState = document.querySelector("#empty-state");
let activeFilter = "all";

function updateCars() {
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  carCards.forEach((card) => {
    const matchesCategory = activeFilter === "all" || card.dataset.category === activeFilter;
    const matchesSearch = card.dataset.name.toLowerCase().includes(query);
    const isVisible = matchesCategory && matchesSearch;
    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  emptyState.hidden = visibleCount > 0;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((filter) => filter.classList.toggle("is-active", filter === button));
    updateCars();
  });
});

searchInput.addEventListener("input", updateCars);

document.querySelectorAll(".save-button").forEach((button) => {
  button.addEventListener("click", () => {
    const isSaved = button.getAttribute("aria-pressed") === "true";
    button.setAttribute("aria-pressed", String(!isSaved));
    button.textContent = isSaved ? "♡" : "♥";
  });
});

document.querySelectorAll(".arrow-button").forEach((button) => {
  button.addEventListener("click", () => {
    const carName = button.closest(".car-card").dataset.name;
    const subject = encodeURIComponent(`Tell me about the ${carName}`);
    window.location.href = `mailto:hello@aurelmotors.example?subject=${subject}`;
  });
});

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  mainNav.classList.toggle("is-open", !isOpen);
});
mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();
