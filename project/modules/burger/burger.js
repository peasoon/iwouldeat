export const bindBurger = (burgerBtn, burgerMenu) => {
  burgerBtn.addEventListener("click", () => {
    burgerMenu.classList.toggle("active");
		burgerBtn.classList.toggle("close");
  });
};
