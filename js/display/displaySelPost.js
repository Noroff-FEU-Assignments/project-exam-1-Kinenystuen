import { fetchApi } from "../api/fetchApi.js";
import { clearHTML } from "../render/clearHTML.js";
import { openModal } from "../render/renderModal.js";

export async function displaySelProduct(post) {
  document.title = "Mountain Life | " + `${post.title.rendered}`;
  console.log(post);
  const selPostContainer = document.querySelector(".selPostContainer");
  clearHTML(selPostContainer);
  const cardDiv = document.createElement(`div`);
  cardDiv.classList = "";

  // Fetch content.rendered data
  const parser = new DOMParser();
  const doc = parser.parseFromString(post.content.rendered, `text/html`);

  //finds the img url inside the "doc" content.rendered then attributes.src.nodeValue
  const images = doc.querySelectorAll("img");
  const paragraphs = doc.querySelectorAll(`p`);

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

  postImg1.appendChild(img1);
  postImg1.appendChild(caption1);
  cardDiv.appendChild(postImg1);

  const paragraphDiv = document.createElement("div");
  paragraphDiv.classList = "paragraphDiv","grid400", "gridcenter";
  // Fetching paragraphs for content.rendered html and displaying each of them
  let postPar;
  paragraphs.forEach(function (paragraph) {
    postPar = document.createElement(`p`);
    const paragraphText = paragraph.innerText;
    postPar.className = "";
    postPar.innerHTML = paragraphText;
    paragraphDiv.appendChild(postPar);
  });

  cardDiv.appendChild(paragraphDiv)



  // Tags and categories
  //
  const tagcatArea = document.createElement("div");
  tagcatArea.className = "tagcatArea";
  // Create div to display categories
  const catArea = document.createElement("div");
  catArea.className = "catArea";
  // Create p for tags
  const catPTitle = document.createElement("p");
  catPTitle.innerText = "Categories:";
  catPTitle.className = "catPTitle";
  
  const catP = document.createElement("a");
  catP.className = "catP";
  

  // Fetching categories
// Assuming you have fetched a post and have its details in the postDetails variable
const categoryIds = post.categories;

// Fetch category names for each category ID
const categoryPromises = categoryIds.map(async (categoryId) => {
  const categoryUrl = `https://kineon.no/wp-json/wp/v2/categories/${categoryId}`;
  const categoryResponse = await fetch(categoryUrl);
  const categoryDetails = await categoryResponse.json();
  return { id: categoryId, name: categoryDetails.name };
});

// Wait for all category promises to resolve
const categoryNames = await Promise.all(categoryPromises);

// Now, categoryNames is an array containing the names of the categories associated with the post.
console.log(categoryNames);
categoryNames.forEach(function (categorie){
  const catLinks = document.createElement("a");
  catLinks.className = "catLinks";
  catLinks.innerHTML = categorie.name + `,`;
  catLinks.id = categorie.id;
  catP.appendChild(catLinks);

});

catArea.appendChild(catPTitle);
catArea.appendChild(catP);

// Create area for tags

  // Create div to display tags and categories
  const tagArea = document.createElement("div");
  tagArea.className = "catArea";
  // Create p for tags
  const tagPTitle = document.createElement("p");
  tagPTitle.innerText = "Tags:";
  tagPTitle.className = "catPTitle";
  
  const tagP = document.createElement("a");
  tagP.className = "catP";
  

  // Fetching categories
// Assuming you have fetched a post and have its details in the postDetails variable
const tagsIds = post.tags;

// Fetch category names for each category ID
const tagsPromises = tagsIds.map(async (tagId) => {
  const tagsUrl = `https://kineon.no/wp-json/wp/v2/tags/${tagId}`;
  const categoryResponse = await fetch(tagsUrl);
  const tagsDetails = await categoryResponse.json();
  return { id: tagId, name: tagsDetails.name };
});

// Wait for all category promises to resolve
const tagsNames = await Promise.all(tagsPromises);

// Now, categoryNames is an array containing the names of the categories associated with the post.
console.log(tagsNames);
tagsNames.forEach(function (tags){
  const tagLinks = document.createElement("a");
  tagLinks.className = "catLinks";
  tagLinks.innerHTML = tags.name + `,`;
  tagLinks.id = tags.id;
  tagP.appendChild(tagLinks);

});

tagArea.appendChild(tagPTitle);
tagArea.appendChild(tagP);



  // Create a div area just for images
  const imagesContainer = document.createElement(`div`);
  const imagesDiv = document.createElement(`div`);
  imagesDiv.id = "imagesDiv";
  imagesDiv.className = "gallery-grid";

  // Title for img area
  const imagesTitle = document.createElement(`h3`);
  imagesTitle.innerText = `Images:`;
  imagesTitle.className = "";

  // Fetches the images in the content.rendered object and "jumps" over the first img as this is already displayed
  let postImg;
  let isFirstImage = true;
  let hasImages = false;

  let currentImageIndex = 0;

  images.forEach(function (image, index) {
    if (isFirstImage) {
      isFirstImage = false;
      return; // Skip the first image
    }
    if (image.value > 0) {
      imagesContainer.appendChild(imagesTitle);
    }

    postImg = document.createElement("img");
    const imgSrc = image.attributes.src.nodeValue;
    postImg.className = "blogCard-images";
    const imageAlts = image.getAttribute("alt");
    postImg.src = imgSrc;
    postImg.addEventListener("click", function () {
      const imagePath = image.getAttribute("src");
      const imageAlt = img1.getAttribute("alt");
      openModal(imagePath, imageAlts);
      currentImageIndex = index;
    });

    imagesDiv.appendChild(postImg);
    hasImages = true;
  });

  // Function to navigate to the next image
  function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    const nextImagePath = images[currentImageIndex].getAttribute("src");
    const nextImageAlt = images[currentImageIndex].getAttribute("alt");
    openModal(nextImagePath, nextImageAlt);
  }

  // Function to navigate to the previous image
  function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    const prevImagePath = images[currentImageIndex].getAttribute("src");
    const prevImageAlt = images[currentImageIndex].getAttribute("alt");
    openModal(prevImagePath, prevImageAlt);
  }

  // Eventlistener for moving between the images
  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight") {
      nextImage();
    }
    if (event.key === "ArrowLeft") {
      prevImage();
    }
  });

  // Testing out if fingermovement on phones work
  let startX;
  let endX;

  imagesContainer.addEventListener("touchstart", function (e) {
    startX = e.touches[0].clientX;
  });

  imagesContainer.addEventListener("touchmove", function (e) {
    endX = e.touches[0].clientX;
  });

  imagesContainer.addEventListener("touchend", function () {
    const threshold = 50; // fingermove length

    if (startX - endX > threshold) {
      // Swiped left
      nextImage();
    } else if (endX - startX > threshold) {
      // Swiped right
      previousImage();
    }
  });


  // Checking if there is any images to display, if so add title "images"
  if (hasImages) {
    imagesContainer.appendChild(imagesTitle);
  }
  imagesContainer.appendChild(imagesDiv);

  // Create blog title
  const h1Post = document.querySelector(`.h1Post`);
  h1Post.innerHTML = `Blog post: ${post.title.rendered}`;

  tagcatArea.appendChild(catArea);
  tagcatArea.appendChild(tagArea);

  selPostContainer.appendChild(cardDiv);
  selPostContainer.appendChild(imagesContainer);
  selPostContainer.appendChild(tagcatArea);
}
