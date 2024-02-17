import { fetchApi } from "../api/fetchApi.js";
import { clearHTML } from "../render/clearHTML.js";
import { openModal } from "../render/renderModal.js";

export async function displaySelProduct(post) {
  document.title = "Mountain Life | " + `${post.title.rendered}`;
  // Header, content
  const selPostHeader = document.getElementById("selPostHeader");
  const selPostContent = document.getElementById("selPostContent");

  clearHTML(selPostHeader);
  clearHTML(selPostContent);
  // const headerImgDiv = document.createElement(`div`);
  // headerImgDiv.className = "card-area";
  const cardDiv = document.createElement(`div`);
  cardDiv.classList.add("card-area", "padding1rem");

  // Fetch content.rendered data
  const parser = new DOMParser();
  const doc = parser.parseFromString(post.content.rendered, `text/html`);

  //finds the img url inside the "doc" content.rendered then attributes.src.nodeValue
  const images = doc.querySelectorAll("img");
  const paragraphs = doc.querySelectorAll(`p`);

  const postImg1 = document.createElement("figure"); // Create a figure element for the img
  const backgroundWrapper = document.createElement("div"); // Create area for the background overlay
  const backImg = document.createElement("back-img");
  const overlay = document.createElement("div"); // Create div to make an overlay to the postImg1 image
  postImg1.className = "background-img";
  backgroundWrapper.className = "background-wrapper";
  backImg.className = "back-img";
  overlay.className = "background-overlay";

  const img1 = document.createElement("img");
  const image1 = images[0].attributes.src.nodeValue;
  const altText = images[0].nextElementSibling;
  const caption1 = document.createElement(`figcaption`);
  caption1.classList.add = "background_figcaption";
  backImg.style.backgroundImage = `url(${image1})`;
  backgroundWrapper.appendChild(overlay);
  backgroundWrapper.appendChild(backImg);

  // Checks if the innerText element isn't undefined or null
  if (
    altText !== null &&
    altText !== undefined &&
    altText.innerText !== null &&
    altText.innerText !== undefined
  ) {
    img1.alt = altText.innerText.trim();
    caption1.textContent = altText.innerText.trim();
    caption1.className = "background_figcaption";
  }

  img1.className = "blogCard-img";
  img1.src = image1;
  img1.addEventListener("click", function () {
    const imagePath = img1.getAttribute("src");
    const imageAlts = img1.getAttribute("alt");
    openModal(imagePath, imageAlts, images, imagesLength, currentImageIndex);
  });

  postImg1.appendChild(img1);
  postImg1.appendChild(backgroundWrapper);
  selPostHeader.appendChild(postImg1);
  selPostHeader.appendChild(caption1);

  // Create location and posts page link
  const selPostName = document.getElementById("selPostName");
  const postsLink = document.createElement("a");
  postsLink.href = "/html/blog_posts.html";
  postsLink.innerText = "Posts page";
  postsLink.className = "fw-light light_green";
  postsLink.title = "Go to all posts page";
  selPostName.appendChild(postsLink);
  selPostName.innerHTML += `  /  ${post.title.rendered}`;

  // Create blog title
  const h1Post = document.getElementById("h1Post");
  h1Post.innerText = post.title.rendered;
  h1Post.className = "h1Post";
  const line = document.createElement("div");
  line.className = "line";
  cardDiv.appendChild(selPostName);
  cardDiv.appendChild(h1Post);
  cardDiv.appendChild(line);

  // Create admin text and puplished date
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const informationPost = document.createElement("div");
  informationPost.className = "flex_spacebetween";
  informationPost.classList.add("informationLine");
  const postedBy = document.createElement("p");
  postedBy.innerHTML = `Posted by: ${post._embedded.author[0].name}`;
  const published = document.createElement("p");
  published.innerHTML = `Published: ${formattedDate}`;
  published.className = "teAlign";

  informationPost.appendChild(postedBy);
  informationPost.appendChild(published);
  cardDiv.appendChild(informationPost);

  const paragraphDiv = document.createElement("div");
  (paragraphDiv.classList = "grid400-fill"), "gridcenter";
  // Fetching paragraphs for content.rendered html and displaying each of them
  let postPar;
  paragraphs.forEach(function (paragraph) {
    postPar = document.createElement(`p`);
    const paragraphText = paragraph.innerText;
    postPar.className = "flex";
    postPar.innerHTML = paragraphText;
    paragraphDiv.appendChild(postPar);
  });

  cardDiv.appendChild(paragraphDiv);

  // Tags and categories
  //
  const tagcatArea = document.createElement("div");
  tagcatArea.className = "tagcatArea margin_R5p";

  // Create div to display categories
  const catArea = document.createElement("div");
  catArea.className = "catArea margin_R5p";
  // Create p for tags
  const catPTitle = document.createElement("p");
  catPTitle.innerText = "Categories:";
  catPTitle.className = "catPTitle margin_R5p";

  const catP = document.createElement("a");
  catP.className = "catP margin_R5p";

  const categoryIds = post.categories;

  // Fetch category names for each category ID
  const categoryPromises = categoryIds.map(async (categoryId) => {
    const categoryUrl = `https://kineon.no/wp-json/wp/v2/categories/${categoryId}`;
    const categoryResponse = await fetch(categoryUrl);
    const categoryDetails = await categoryResponse.json();
    return { type: "category", id: categoryId, name: categoryDetails.name };
  });

  const categoryNames = await Promise.all(categoryPromises);

  categoryNames.forEach(function (category) {
    const catLinks = document.createElement("a");
    catLinks.className = "flex category-link";
    catLinks.innerHTML = "- " + category.name;
    catLinks.id = category.id;
    catLinks.title = category.name;
    catP.appendChild(catLinks);

    catLinks.addEventListener("click", function (event) {
      event.preventDefault();

      const categoryDetails = {
        categoryId: event.target.id,
        categoryName: event.target.title.trim(),
      };

      // Store category details in localStorage and then locate to blog_posts page
      localStorage.setItem("categoryDetails", JSON.stringify(categoryDetails));

      window.location.href = "/html/blog_posts.html";
    });
  });

  catArea.appendChild(catPTitle);
  catArea.appendChild(catP);

  // Create area for tags
  // Create div to display tags and categories
  const tagArea = document.createElement("div");
  tagArea.className = "catArea margin_R5p";
  // Create p for tags
  const tagPTitle = document.createElement("p");
  tagPTitle.innerText = "Tags:";
  tagPTitle.className = "catPTitle margin_R5p";

  const tagP = document.createElement("a");
  tagP.className = "catP margin_R5p";

  // Fetching categories
  const tagsIds = post.tags;

  // Fetch category names for each category ID
  const tagsPromises = tagsIds.map(async (tagId) => {
    const tagsUrl = `https://kineon.no/wp-json/wp/v2/tags/${tagId}`;
    const categoryResponse = await fetch(tagsUrl);
    const tagsDetails = await categoryResponse.json();
    return { id: tagId, name: tagsDetails.name };
  });

  const tagsNames = await Promise.all(tagsPromises);
  tagsNames.forEach(function (tags) {
    const tagLinks = document.createElement("a");
    tagLinks.className = "flex tag-link";
    tagLinks.innerHTML = "-  " +tags.name;
    tagLinks.id = tags.id;
    tagLinks.title = tags.name;
    tagP.appendChild(tagLinks);

    tagLinks.addEventListener("click", function (event) {
      event.preventDefault();

      const tagDetails = {
        tagId: event.target.id,
        tagName: event.target.title.trim(),
      };

      // Store tag details in localStorage and then locate to blog_posts page
      localStorage.setItem("tagDetails", JSON.stringify(tagDetails));

      window.location.href = "/html/blog_posts.html";
    });
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
  let imagePath;
  let imageAlt;
  let imagesLength = images.length;

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
    const imgAlt = image.nextElementSibling;
    postImg.className = "blogCard-images";
    // const imageAlt = image.getAttribute("alt");
    postImg.src = imgSrc;
    postImg.alt = imgAlt;
    postImg.addEventListener("click", function () {
      imagePath = image.getAttribute("src");
      imageAlt = imgAlt.textContent;
      currentImageIndex = index;
      openModal(imagePath, imageAlt, images, imagesLength, currentImageIndex);
    });

    imagesDiv.appendChild(postImg);
    hasImages = true;
  });

  // Checking if there is any images to display, if so add title "images"
  if (hasImages) {
    imagesContainer.appendChild(imagesTitle);
  }
  imagesContainer.appendChild(imagesDiv);

  tagcatArea.appendChild(catArea);
  tagcatArea.appendChild(tagArea);

  cardDiv.appendChild(imagesContainer);
  cardDiv.appendChild(tagcatArea);
  selPostContent.appendChild(cardDiv);
}
