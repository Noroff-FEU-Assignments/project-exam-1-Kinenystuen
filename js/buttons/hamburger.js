/* wudhw */

export async function dropdownMenu() {
  const navMenu = document.querySelector(".nav-menu");
  const hamburgerMenu = document.querySelector(".hamburger_icon");

  hamburgerMenu.addEventListener("click", () => {
    console.log("clicked")
      const visibility = navMenu.getAttribute("data-visible");
      console.log("clicked")
      if (visibility === "false") {
        navMenu.setAttribute("data-visible", true);
        hamburgerMenu.setAttribute("aria-expanded", true);
      } else if (visibility === "true") {
        navMenu.setAttribute("data-visible", false);
        hamburgerMenu.setAttribute("aria-expanded", false);
      }
    });
}
dropdownMenu();