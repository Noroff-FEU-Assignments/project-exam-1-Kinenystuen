import { fetchApi } from "../api/fetchApi.js";

if (document.getElementById("search-inputH")) {
  searchFunction();
}

export async function searchFunction() {
  const searchInput = document.querySelector("#search-inputH");

  searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      // Store the search value in local storage
      const searchValue = searchInput.value.trim();
      localStorage.setItem("searchValue", searchValue);

      // Navigate to the blog_posts.html page
      window.location.href = "/html/blog_posts.html";
    }
  });
}

window.onload = async function () {
  const postsContainer = document.querySelector(".postsContainer");
  const filterResult = document.getElementById("filterResult");

  const baseUrl = "https://www.kineon.no/wp-json/";
  const posts = "wp/v2/posts";
  const removeSearch = document.createElement("p");
  removeSearch.innerHTML = "Remove search";
  removeSearch.classList = "removeSearch";

  // Retrieve the search value from local storage
  const searchValue = localStorage.getItem("searchValue");
  const storedCategoryDetails = JSON.parse(
    localStorage.getItem("categoryDetails")
  );
  const selectElement = document.getElementById("category");
  const storedTagDetails = JSON.parse(localStorage.getItem("tagDetails"));

  // searchValue display
  if (searchValue) {
    localStorage.removeItem("searchValue");
    const newUrl = baseUrl + posts + `?search=${searchValue}`;
    postsContainer.innerHTML = "";
    filterResult.innerHTML = `Search result for "${searchValue}"`;
    filterResult.appendChild(removeSearch);
    setTimeout(async () => {
      await fetchApi(newUrl);
    }, 500); // to be sure that this fetches last
  }

  // category display
  if (storedCategoryDetails) {
    const categoryId = storedCategoryDetails.categoryId;
    const categoryName = storedCategoryDetails.categoryName;
    localStorage.removeItem("categoryDetails");
    const newUrl = baseUrl + posts + `?categories=${categoryId}`;
    console.log(newUrl);
    postsContainer.innerHTML = "";
    filterResult.innerHTML = `Category: ${categoryName}`;

    // Finding the matching id
    const options = selectElement.options;
    for (let i = 0; i < options.length; i++) {
      if (options[i].value === categoryId.toString()) {
        options[i].selected = true;
        break;
      }
    }
    setTimeout(async () => {
      await fetchApi(newUrl);
    }, 500);
  }

  // tag display
  if (storedTagDetails) {
    const tagId = storedTagDetails.tagId;
    const tagName = storedTagDetails.tagName;
    localStorage.removeItem("tagDetails");
    const newUrl = baseUrl + posts + `?tags=${tagId}`;
    console.log(newUrl);
    postsContainer.innerHTML = "";
    filterResult.innerHTML = `Tag: ${tagName}`;
    filterResult.appendChild(removeSearch);

    setTimeout(async () => {
      await fetchApi(newUrl);
    }, 500);
  }
  if (document.querySelector(".removeSearch")) {
    document
      .querySelector(".removeSearch")
      .addEventListener("click", function () {
        const newUrl = baseUrl + posts;
        fetchApi(newUrl);
        filterResult.innerHTML = "";
      });
  }
};
