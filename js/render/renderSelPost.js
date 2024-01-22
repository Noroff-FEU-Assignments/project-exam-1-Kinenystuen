import { clearHTML } from "./clearHTML.js";
import { openModal } from "./renderModal.js";

export function displaySelProduct(post) {
  document.title = "Mountain Life | " + `${post.title.rendered}`;
  console.log(post);
  const selPostContainer = document.querySelector(".selPostContainer");
  clearHTML(selPostContainer);
  const cardDiv = document.createElement(`div`);
  (cardDiv.classList = "grid400"), "gridcenter";

  // Fetch content.rendered data
  const parser = new DOMParser();
  const doc = parser.parseFromString(post.content.rendered, `text/html`);

  //finds the img url inside the "doc" content.rendered then attributes.src.nodeValue
  const images = doc.querySelectorAll("img");
  const paragraphs = doc.querySelectorAll(`p`);
  //console.log(paragraphs);
  console.log(images);

  const postImg1 = document.createElement("figure"); // Create a figure element

  const img1 = document.createElement("img");
  const image1 = images[0].attributes.src.nodeValue;
  const altText = images[0].nextElementSibling;
  const caption1 = document.createElement(`figcaption`);
  // Checks if the innerText element isn't undefined or null
  if (
    altText !== null &&
    altText !== undefined &&
    altText.innerText !== null &&
    altText.innerText !== undefined
  ) {
    img1.alt = altText.innerText.trim();
    caption1.textContent = altText.innerText.trim();
  }

  img1.className = "blogCard-img";
  img1.src = image1;
  img1.addEventListener("click", function () {
    const imagePath = img1.getAttribute("src");
    const imageAlt = img1.getAttribute("alt");
    openModal(imagePath, imageAlt);
  });

  postImg1.appendChild(img1); // Append img to figure
  postImg1.appendChild(caption1); // Append caption to figure
  cardDiv.appendChild(postImg1); // Append figure to the cardDiv

  // Fetching paragraphs for content.rendered html and displaying each of them
  let postPar;
  paragraphs.forEach(function (paragraph) {
    //console.log(paragraph);
    postPar = document.createElement(`p`);
    const paragraphText = paragraph.innerText;
    postPar.className = "";
    postPar.innerHTML = paragraphText;
    cardDiv.appendChild(postPar);
  });

  // Create a div area just for images
  const imagesDiv = document.createElement(`div`);
  imagesDiv.className = "";

  // Title for img area
  const imagesTitle = document.createElement(`h3`);
  imagesTitle.innerText = `Images:`;
  imagesTitle.className = "";

  // Fetches the images in the content.rendered object and "jumps" over the first img as this is already displayed
  let postImg;
  let isFirstImage = true;
  let isSecImage = true;

  images.forEach(function (image) {
    if (isFirstImage) {
      isFirstImage = false;
      return; // Skip the first image
    }
    if (isSecImage) {
      imagesDiv.appendChild(imagesTitle);
    }

    console.log(image.attributes.src.nodeValue);
    postImg = document.createElement("img");
    const imgSrc = image.attributes.src.nodeValue;
    postImg.className = "blogCard-images";
    postImg.src = imgSrc;
    postImg.addEventListener("click", function () {
      const imagePath = image.getAttribute("src");
      const imageAlt = img1.getAttribute("alt");
      openModal(imagePath, imageAlt);
    });

    imagesDiv.appendChild(postImg);
  });

  // Create blog title
  const h1Post = document.querySelector(`.h1Post`);
  h1Post.innerHTML = `Blog post: ${post.title.rendered}`;

  selPostContainer.appendChild(cardDiv);
  selPostContainer.appendChild(imagesDiv);
}
