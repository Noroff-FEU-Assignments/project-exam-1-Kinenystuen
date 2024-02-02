import { fetchApi } from "../api/fetchApi.js";
import { clearHTML } from "../render/clearHTML.js";

// export async function displayCarousel(posts) {
//   // Sort posts by date in descending order
//   posts.sort((a, b) => new Date(b.date) - new Date(a.date));

//   // Take the first 4 posts
//   const latestPosts = posts.slice(0, 6);

//   const carouselContainer = document.querySelector(".carouselContainer");
//   clearHTML(carouselContainer);
//   let slideIndex = 1;

//   function createCarouselDiv(post, index, total) {
//     const carouselDiv = document.createElement("div");
//     carouselDiv.className = "carouselDiv";

//     const carouselP = document.createElement("p");
//     carouselP.className = "numbertext";
//     carouselP.innerText = `${index + 1} / ${total}`;

//     const leftButton = document.createElement("button");
//     leftButton.className = "leftButton";
//     leftButton.innerHTML = "&#10094;";

//     const rightButton = document.createElement("button");
//     rightButton.className = "rightButton";
//     rightButton.innerHTML = "&#10095;";

//     const parser = new DOMParser();
//     const doc = parser.parseFromString(post.content.rendered, "text/html");

//     const images = doc.querySelectorAll("img");
//     const image = images[0].attributes.src.nodeValue;

//     const carouselImg = document.createElement("img");
//     carouselImg.src = image;
//     carouselImg.className = "carouselImg";

//     const title = document.createElement("h2");
//     title.className = "carouselTitle";
//     title.innerHTML = post.title.rendered;

//     const titleLink = document.createElement(`a`);
//     titleLink.href = `/html/blog_post.html?id=${post.id}`;
//     titleLink.appendChild(title);

//     carouselDiv.appendChild(carouselImg);
//     carouselDiv.appendChild(carouselP);
//     carouselDiv.appendChild(titleLink);
//     carouselDiv.appendChild(leftButton);
//     carouselDiv.appendChild(rightButton);

//     // Add click event listeners to the buttons
//     leftButton.addEventListener("click", function () {
//       plusSlides(-1);
//     });

//     rightButton.addEventListener("click", function () {
//       plusSlides(1);
//     });

//     return carouselDiv;
//   }

//   function plusSlides(n) {
//     showSlides((slideIndex += n));
//   }

//   function showSlides(n) {
//     let i;
//     const slides = document.getElementsByClassName("carouselDiv");
//     const captionText = document.getElementById("caption");

//     if (n > slides.length) {
//       slideIndex = 1;
//     }
//     if (n < 1) {
//       slideIndex = slides.length;
//     }

//     for (i = 0; i < slides.length; i++) {
//       slides[i].style.display = "none";
//     }

//     slides[slideIndex - 1].style.display = "block";
//     //captionText.innerHTML = slides[slideIndex - 1].querySelector("img").alt;
//   }

//   // Append the carousel divs to the container
//   latestPosts.forEach((post, index) => {
//     const carouselDiv = createCarouselDiv(post, index, latestPosts.length);
//     carouselContainer.appendChild(carouselDiv);
//   });

//   // Show the initial slide
//   showSlides(slideIndex);
// }



// /* test carousel */

export async function displayCarousel(posts) {

const carouselContainer = document.querySelector(".carousel-container");
carouselContainer.innerHTML = ""; // Clear existing posts
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
    }
    else {
        return 4;
    }
}

function showPosts(posts) {
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  // Take the first 6 posts
  const latestPosts = posts.slice(0, 8);

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
    image.alt = post.title.rendered;
    image.className = "carousel-img";
    const title = document.createElement("h3");
    title.className = "carousel-title"
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
    const totalCards = document.querySelectorAll(".carousel-card").length -1; 

    const carouselWidth = carousel.clientWidth / cardsVisible;

    if (direction === "left") {
        currentIndex = Math.max(currentIndex - 1, 0);
        carousel.style.transform = `translateX(-${currentIndex * carouselWidth * cardsVisible}px)`;
        shownCards = shownCards - cardsVisible;
    } else if (direction === "right") {
        currentIndex = Math.min(currentIndex +1, totalCards / cardsVisible);
        carousel.style.transform = `translateX(-${currentIndex * carouselWidth * cardsVisible}px)`;
        shownCards = shownCards + cardsVisible;
    }
    console.log(shownCards);
        if (currentIndex === 0) {
            leftArrow.style.display = "none";
        }
        else {
            leftArrow.style.display = "block";
        }
        if (shownCards >= 8) {
            rightArrow.style.display = "none";
        }
        else {
            rightArrow.style.display = "block";
        }
  }

leftArrow.addEventListener("click", () => {
    moveCarousel("left");
} )
rightArrow.addEventListener("click", () => {
    moveCarousel("right");
});

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