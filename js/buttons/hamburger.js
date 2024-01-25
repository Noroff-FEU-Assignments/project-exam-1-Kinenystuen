
const navMenu = document.getElementById("nav-menu");
const hamburgerMenu = document.getElementById("hamburgerButton");

hamburgerMenu.addEventListener("click", () => {
  const visibility = navMenu.getAttribute("data-visible");

  if (visibility === "false") {
    navMenu.setAttribute("data-visible", true);
    hamburgerMenu.setAttribute("aria-expanded", true);
  } else if (visibility === "true") {
    navMenu.setAttribute("data-visible", false);
    hamburgerMenu.setAttribute("aria-expanded", false);
  }
});

