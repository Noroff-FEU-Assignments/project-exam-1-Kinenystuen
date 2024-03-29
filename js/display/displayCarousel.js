import { fetchApi } from "../api/fetchApi.js";
import { clearHTML } from "../render/clearHTML.js";

export async function displayCarousel(posts) {
  const carouselContainer = document.querySelector(".carousel-container");
  clearHTML(carouselContainer);
  const carousel = document.createElement("div");
  carousel.className = "carousel";

  const leftArrow = document.querySelector(".arrow.left");
  const rightArrow = document.querySelector(".arrow.right");

  carouselContainer.appendChild(carousel);

  let currentIndex = 0;
  let cardsVisible = cardsToShow();

  function cardsToShow() {
    const windowWidth = window.innerWidth;
    if (windowWidth < 250 * 2) {
      return 1;
    }
    if (windowWidth < 250 * 3) {
      return 2;
    }
    if (windowWidth < 250 * 4) {
      return 3;
    } else {
      return 4;
    }
  }

  function showPosts(posts) {
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    const latestPosts = posts.slice(0, 8); // take the first 8 posts
    console.log(posts)
    latestPosts.forEach((post) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(post.content.rendered, "text/html");

      const images = doc.querySelectorAll("img");
      const imageElement = images[0].attributes.src.nodeValue;

      const card = document.createElement("a");
      card.className = "cardLink";
      card.classList.add("carousel-card");
      card.href = `/html/blog_post.html?id=${post.id}`;
      const image = document.createElement("img");
      image.src = imageElement;
      image.alt = `Image for blog post about ${post.title.rendered}`;
      image.className = "carousel-img";
      const title = document.createElement("h3");
      title.className = "carousel-title";
      title.textContent = post.title.rendered;
      card.appendChild(image);
      card.appendChild(title);
      carousel.appendChild(card);
    });

    updateCarouselWidth();
    adjustCarousel();
  }
  showPosts(posts);
  let shownCards = cardsVisible;

  function moveCarousel(direction) {
    const totalCards = document.querySelectorAll(".carousel-card").length - 1;

    const carouselWidth = carousel.clientWidth / cardsVisible;

    if (direction === "left") {
      currentIndex = Math.max(currentIndex - 1, 0);
      carousel.style.transform = `translateX(-${
        currentIndex * carouselWidth * cardsVisible
      }px)`;
      shownCards = shownCards - cardsVisible;
    } else if (direction === "right") {
      currentIndex = Math.min(currentIndex + 1, totalCards / cardsVisible);
      carousel.style.transform = `translateX(-${
        currentIndex * carouselWidth * cardsVisible
      }px)`;
      shownCards = shownCards + cardsVisible;
    }
    if (currentIndex === 0) {
      leftArrow.style.display = "none";
    } else {
      leftArrow.style.display = "block";
    }
    if (shownCards >= 8) {
      rightArrow.style.display = "none";
    } else {
      rightArrow.style.display = "block";
    }
  }

  leftArrow.addEventListener("click", () => {
    moveCarousel("left");
  });
  rightArrow.addEventListener("click", () => {
    moveCarousel("right");
  });

  // Create touch event listener for swiping between images
  let startX;
  let endX;
  if (document.querySelector(".carousel-container")) {
  carouselContainer.addEventListener("touchstart", function (event) {
    startX = event.touches[0].clientX;
  });

  carouselContainer.addEventListener("touchmove", function (event) {
    endX = event.touches[0].clientX;
  });
  carouselContainer.addEventListener("touchend", function (event) {
    const threshold = 20; // fingermove length

    const touchEndX = event.changedTouches[0].clientX;

    if (startX - touchEndX > threshold) {
      // Swiped left
      moveCarousel("right");
    } else if (touchEndX - startX > threshold) {
      // Swiped right
      moveCarousel("left");
    }
  });
  }

  // Change the flex calc depending on how many cards that is showing
  function updateCarouselWidth() {
    const carouselCard = document.querySelectorAll(".carousel-card");
    carouselCard.forEach((card) => {
      card.style.flex = `0 0 calc(${100 / cardsVisible}% - 1.25rem)`;
    });
  }

  // Event listener to adjust carouselwhen resizing window
  window.addEventListener("resize", () => {
    cardsVisible = cardsToShow();
    updateCarouselWidth();
    adjustCarousel();
    moveCarousel();
  });

  function adjustCarousel() {
    const carouselWidth = carousel.clientWidth / cardsVisible;
    const newTransformValue = -currentIndex * carouselWidth * cardsVisible;
    carousel.style.transform = `translateX(${newTransformValue}px)`;
  }
}
