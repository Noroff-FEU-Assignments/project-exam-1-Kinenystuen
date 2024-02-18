import { fetchApi, totalPosts } from "../api/fetchApi.js";
import { clearHTML } from "../render/clearHTML.js";
import { loaderArea } from "../render/loader.js";

const postsContainer = document.querySelector(".postsContainer");
const baseUrl = "https://www.kineon.no/wp-json/";
const posts = "wp/v2/posts";
const embed = "?_embed";
let newUrl;

let loadedPostsLength;
let morePostsButton;
let lessPostsButton;

export async function displayPosts(posts) {
  const postsContainer = document.querySelector(".postsContainer");
  clearHTML(postsContainer);
  const loaderArea = document.querySelector(".loaderArea");
  clearHTML(loaderArea);
  posts.forEach((post) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(post.content.rendered, `text/html`);

    //finds the img url inside the "doc" content.rendered then attributes.src.nodeValue
    const images = doc.querySelectorAll("img");
    const image = images[0].attributes.src.nodeValue;
    const cardImg = document.createElement(`img`);

    const paragraphs = doc.querySelectorAll(`p`);
    const paragraph = paragraphs[0].innerHTML;

    const cardDiv = document.createElement(`a`);
    cardDiv.className = "card";
    cardDiv.href = `/html/blog_post.html?id=${post.id}`

    // if there is a img it will load otherwise give a message that it dosnt exist
    if (images) {
      cardImg.className = "cardImg";
      cardImg.src = image;
      cardImg.alt = `Image for blog post about ${post.title.rendered}`;
      cardDiv.append(cardImg);
    } else {
      const noImage = document.createElement("p");
      noImage.innerText = "No image available";
      noImage.className = "cardImg";
      cardDiv.append(noImage);
    }

    const cardTextContainer = document.createElement(`div`);
    cardTextContainer.className = "cardTextContainer";

    const cardPContainer = document.createElement(`div`);
    cardPContainer.className = "cardPContainer";

    const cardText = document.createElement(`p`);
    if (paragraphs) {
      cardText.className = "cardText";
      cardText.innerHTML = paragraph;
      cardPContainer.appendChild(cardText);
    } else {
      const noText = document.createElement(`p`);
      noText.innerText = `No text available`;
      noText.className = "cardText";
      cardPContainer.appendChild(cardText);
    }

    const cardTitle = document.createElement(`h2`);
    cardTitle.innerText = post.title.rendered;

    const cardTitleLink = document.createElement(`a`);
    cardTitleLink.href = `/html/blog_post.html?id=${post.id}`;
    cardTitleLink.className = "cardLink";
    cardTitleLink.appendChild(cardTitle);

    // Create a read button and area to go to selected post
    const cardLinkDiv = document.createElement("div");
    cardLinkDiv.className = "buttonArea";
    const cardLinkArea = document.createElement("div");
    cardLinkDiv.className = "divButton";
    const cardLink = document.createElement(`a`);
    cardLink.href = `/html/blog_post.html?id=${post.id}`;
    cardLink.className = "divButton_a";
    //cardLink.classList.add("readButton");
    cardLink.innerText = "Read more...";
    cardLinkDiv.appendChild(cardLink);

    cardTextContainer.appendChild(cardTitleLink);
    cardTextContainer.appendChild(cardPContainer);
    cardTextContainer.appendChild(cardLinkDiv);

    cardDiv.appendChild(cardImg);
    cardDiv.appendChild(cardTextContainer);
    
    postsContainer.appendChild(cardDiv);
  });
  loadedPostsLength = posts.length;

  const visibleBlogPosts = document.querySelectorAll(".visibleBlogPosts");

  visibleBlogPosts.forEach((element) => {
    element.innerText = `Visible blog posts: ${loadedPostsLength}/${totalPosts}`;
  });
  showMorePosts();
  showLessPosts();
}

export async function showMorePosts() {
  const morePostsContainer = document.querySelector(`.morePostsContainer`);
  clearHTML(morePostsContainer);

  const morePostDiv = document.createElement(`div`);
  morePostsButton = document.createElement(`button`);
  morePostsButton.innerText = "Load more posts";
  morePostsButton.className = "morePostsButton";

  morePostDiv.appendChild(morePostsButton);
  morePostsContainer.appendChild(morePostDiv);
  if (loadedPostsLength >= totalPosts) {
    morePostsButton.style.display = `none`;
  }
  morePostsButton.onclick = async function () {
    morePostsContainer.appendChild(loaderArea);
    loaderArea.style.display = "block";
    loaderArea.classList.add("absC");
    setTimeout(() => {
      morePostsContainer.removeChild(loaderArea);
    }, 2000);

    if (loadedPostsLength < totalPosts) {
      loadedPostsLength += 5;
      lessPostsButton.style.display = `block`;
    }
    newUrl = baseUrl + posts + `?per_page=${loadedPostsLength}`;
    fetchApi(newUrl);
  };
}

export async function showLessPosts() {
  const lessPostsContainer = document.querySelector(`.lessPostsContainer`);
  const morePostsContainer = document.querySelector(`.morePostsContainer`);
  clearHTML(lessPostsContainer);

  const lessPostDiv = document.createElement(`div`);
  lessPostsButton = document.createElement(`button`);
  lessPostsButton.innerText = "Show less posts";
  lessPostsButton.style.display = `none`;
  lessPostsButton.className = "lessPostsButton";

  lessPostDiv.appendChild(lessPostsButton);
  lessPostsContainer.appendChild(lessPostDiv);
  if (loadedPostsLength > 10) {
    lessPostsButton.style.display = `block`;
  }

  lessPostsButton.onclick = async function (event) {
    morePostsContainer.appendChild(loaderArea);
    loaderArea.style.display = "block";
    if (loadedPostsLength === 10) {
      lessPostsButton.style.display = `none`;
    }
    if (loadedPostsLength > 10) {
      loadedPostsLength -= 5;
      lessPostsButton.style.display = `flex`;
    }

    newUrl = baseUrl + posts + `?per_page=${loadedPostsLength}`;
    fetchApi(newUrl);
  };

  /* 
  Filtering blog posts 
  */

  const categoryDropdown = document.getElementById("category");
  const filterResult = document.getElementById("filterResult");
  categoryDropdown.addEventListener("change", function (event) {
    if (event.target.value === "true") {
      newUrl = baseUrl + posts + embed + "?categories=true";
      filterResult.innerHTML = "";
    } else {
      const catChosen = event.target.value;
      const catName = event.target.selectedOptions[0].getAttribute("name");
      newUrl = baseUrl + posts + `?categories=${catChosen}`;
      filterResult.innerHTML = `Category: ${catName}`;
    }

    postsContainer.innerHTML = "";
    fetchApi(newUrl);
  });

  const searchInput = document.querySelector("#search-input");
  searchInput.onkeyup = function () {
    const newUrl = baseUrl + posts + `?search=${searchInput.value}`;
    postsContainer.innerHTML = "";
    fetchApi(newUrl);
    filterResult.innerHTML = `Search results for: "${searchInput.value}"`;
    if (searchInput.value === "") {
      filterResult.innerHTML = "";
    }
  };
}
