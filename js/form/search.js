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
  const removeSearch = document.createElement("p")
  removeSearch.innerHTML = "Remove search";
  removeSearch.classList = "removeSearch";

  // Retrieve the search value from local storage
  const searchValue = localStorage.getItem("searchValue");

  // Check if there's a search value in local storage
  if (searchValue) {
    localStorage.removeItem("searchValue");
    const newUrl = baseUrl + posts + `?search=${searchValue}`;
    postsContainer.innerHTML = "";
    filterResult.innerHTML = `Search result for "${searchValue}"`;
    filterResult.appendChild(removeSearch);
    await fetchApi(newUrl);
  }
  removeSearch.addEventListener("click", function() {
    const newUrl = baseUrl + posts;
    filterResult.innerHTML = "";
    fetchApi(newUrl);
  })
};
