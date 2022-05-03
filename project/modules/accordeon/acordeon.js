export const bindAccordeon = (accSelector, pb) => {
  //const accordeounList = document.querySelector(accSelector);
  const accordeounList = accSelector;
  const accordeons = accordeounList.querySelectorAll(".accordeon");

  const openSet = (control, content) => {
    control.setAttribute("aria-expanded", true);
    content.setAttribute("aria-hidden", false);
    content.style.maxHeight = content.scrollHeight + pb + "px";
  };

  const closeSet = (control, content) => {
    control.setAttribute("aria-expanded", false);
    content.setAttribute("aria-hidden", true);
    content.style.maxHeight = 0;
  };

  accordeons.forEach((item) => {
    item.addEventListener("click", (e) => {
      const self = e.currentTarget;
      const control = self.querySelector(".accordeon__control");
      const content = self.querySelector(".accordeon__content");
      if (accordeounList.classList.contains("single")) {
        accordeons.forEach((el) => {
          if (el !== self && el.classList.contains("open")) {
            el.classList.remove("open");
            const control = el.querySelector(".accordeon__control");
            const content = el.querySelector(".accordeon__content");
						closeSet(control, content);
          }
        });
        self.classList.toggle("open");
      } else {
        self.classList.toggle("open");
      }

      if (self.classList.contains("open")) {
        openSet(control, content);
      } else {
        closeSet(control, content);
      }
    });
  });
};


