import { fetchApi } from "../api/fetchApi.js";
import { clearHTML } from "../render/clearHTML.js";
import { openModal } from "../render/renderModal.js";

export async function displaySelProduct(post) {
  document.title = "Mountain Life | " + `${post.title.rendered}`;
  //console.log(post);
  const selPostContainer = document.querySelector(".selPostContainer");
  clearHTML(selPostContainer);
  const headerImgDiv = document.createElement(`div`);
  headerImgDiv.className = "card-area";
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

  // backgroundImg.appendChild(img1)

  postImg1.appendChild(img1);
  //cardDiv.appendChild(caption1);
  postImg1.appendChild(backgroundWrapper);
  headerImgDiv.appendChild(postImg1);
  headerImgDiv.appendChild(caption1);

  // Create location and posts page link
  const pageLocation = document.createElement("p");
  pageLocation.className = "fw-light";
  const postsLink = document.createElement("a");
  postsLink.href = "/html/blog_posts.html";
  postsLink.innerText = "Posts page";
  postsLink.className = "fw-light";
  postsLink.title = "Go to all posts page";
  pageLocation.appendChild(postsLink); // Append the postsLink element
  pageLocation.innerHTML += `  /  ${post.title.rendered}`; // Append the title as HTML string
  cardDiv.appendChild(pageLocation);

  // Create blog title
  const h1Post = document.createElement("h1");
  h1Post.innerText = post.title.rendered;
  h1Post.className = "h1Post";
  const line = document.createElement("div");
  line.className = "line";
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
  (tagcatArea.className = "tagcatArea"), "flex";

  // Create div to display categories
  const catArea = document.createElement("div");
  (catArea.className = "catArea"), "flex";
  // Create p for tags
  const catPTitle = document.createElement("p");
  catPTitle.innerText = "Categories:";
  (catPTitle.className = "catPTitle"), "flex";

  const catP = document.createElement("a");
  (catP.className = "catP"), "flex";

  const categoryIds = post.categories;

  // Fetch category names for each category ID
  const categoryPromises = categoryIds.map(async (categoryId) => {
    const categoryUrl = `https://kineon.no/wp-json/wp/v2/categories/${categoryId}`;
    const categoryResponse = await fetch(categoryUrl);
    const categoryDetails = await categoryResponse.json();
    return { id: categoryId, name: categoryDetails.name };
  });

  const categoryNames = await Promise.all(categoryPromises);

  categoryNames.forEach(function (categorie) {
    const catLinks = document.createElement("a");
    catLinks.className = "flex";
    catLinks.innerHTML = categorie.name + `,`;
    catLinks.id = categorie.id;
    catP.appendChild(catLinks);
  });

  catArea.appendChild(catPTitle);
  catArea.appendChild(catP);

  // Create area for tags
  // Create div to display tags and categories
  const tagArea = document.createElement("div");
  (tagArea.className = "catArea"), "flex";
  // Create p for tags
  const tagPTitle = document.createElement("p");
  tagPTitle.innerText = "Tags:";
  (tagPTitle.className = "catPTitle"), "flex";

  const tagP = document.createElement("a");
  (tagP.className = "catP"), "flex";

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
    tagLinks.className = "flex";
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
    postImg.className = "blogCard-images";
    const imageAlts = image.getAttribute("alt");
    postImg.src = imgSrc;
    postImg.addEventListener("click", function () {
      imagePath = image.getAttribute("src");
      imageAlt = img1.getAttribute("alt");
      currentImageIndex = index;
      openModal(imagePath, imageAlts, images, imagesLength, currentImageIndex);
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

  selPostContainer.appendChild(headerImgDiv);
  selPostContainer.appendChild(cardDiv);
  // selPostContainer.appendChild(imagesContainer);
  // selPostContainer.appendChild(tagcatArea);
}

export async function getComments(post) {
  console.log(post);
  const postId = post.id;
  const url =
    "https://www.kineon.no/wp-json/wp/v2/comments" + `?post=${postId}`;
  try {
    const responseC = await fetch(url);
    if (!responseC.ok) {
      throw new Error(`API request failed with status: ` + responseC.status);
    }
    const comments = await responseC.json();

    displayComments(comments, postId);
  } catch (error) {
    console.log("Error selectedMovie: " + error);
    return;
  }
}

export async function displayComments(comments, postId) {
  console.log(comments);
  console.log(postId);

  const containerComments = document.getElementById("containerComments");
  containerComments.className = "containerComments";

  const h2Cmt = document.getElementById("h2Cmt");
  h2Cmt.innerHTML = `Comments (${comments.length})`;

  const commentDiv = document.createElement("div");
  commentDiv.className = "cmtBox";

  if (comments.length === 0) {
    const cmtPar = document.createElement(`p`);
    cmtPar.innerText = "There is no comments yet on this post.";
    commentDiv.appendChild(cmtPar);
  } else {
    comments.forEach(function (comment) {
      const cmtBoxInfo = document.createElement("div");
      cmtBoxInfo.className = "cmtBox-info";
      const cmtBoxInfoH3 = document.createElement("h3");
      cmtBoxInfoH3.className = "cmtBox-info_h3";
      cmtBoxInfoH3.innerHTML = comment.author_name;
      const cmtBoxInfoP = document.createElement("p");
      cmtBoxInfoP.className = "cmtBox-info_p";
      const formattedDate = new Date(comment.date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      cmtBoxInfoP.innerHTML = formattedDate;
      cmtBoxInfo.appendChild(cmtBoxInfoH3);
      cmtBoxInfo.appendChild(cmtBoxInfoP);
      const cmtBoxText = document.createElement("p");
      cmtBoxText.innerHTML = comment.content.rendered;
      cmtBoxText.className = "cmtBox-text";
      commentDiv.appendChild(cmtBoxInfo);
      commentDiv.appendChild(cmtBoxText);
    });
  }

  // console.log(commentDiv);
  containerComments.appendChild(commentDiv);

  function handleSubmit(event) {
    event.preventDefault();

    // Retrieve user input values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const comment = document.getElementById("comment").value;

    const commentData = {
      author_name: name,
      author_email: email,
      content: comment,
      post: postId,
    };

    // Send comment data to WordPress REST API
    fetch("https://kineon.no/wp-json/wp/v2/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to post comment");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Comment posted successfully:", data);
      })
      .catch((error) => {
        console.error("Error posting comment:", error);
      });
  }
  document
    .getElementById("commentForm")
    .addEventListener("submit", handleSubmit);
}
