
import { fetchApi } from "./api/fetchApi.js";
import { fetchSelApi } from "./api/fetchSelApi.js";

import { dropdownMenu } from "./buttons/hamburger.js";

import { openModal } from "./render/renderModal.js";

import { validateForm } from "./contact.js";



window.addEventListener('resize', () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });