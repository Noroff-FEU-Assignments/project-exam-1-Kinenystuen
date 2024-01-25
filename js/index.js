
import { fetchApi } from "./api/fetchApi.js";
import { fetchSelApi } from "./api/fetchSelApi.js";

import { openModal } from "./render/renderModal.js";



export async function dropdownMenu() {
    const navMenu = document.querySelector(".nav-menu");
    const hamburgerMenu = document.querySelector(".hamburger_icon");

    hamburgerMenu.addEventListener("click", () => {
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



// function menuButton() {
//     const button = document.getElementById("menuButton");

//     button.addEventListener("click", function() {
//         console.log("this is clicked")
//     })
// }
// menuButton();