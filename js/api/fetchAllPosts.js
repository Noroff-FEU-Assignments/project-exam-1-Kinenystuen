import { displayMatchingPosts } from "../display/displayMatchingPosts.js";

const baseUrl = "https://www.kineon.no/wp-json/wp/v2/posts";
const perPage = 100;
const allPostsUrl = `${baseUrl}?per_page=${perPage}`;

export async function fetchAllPosts(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`API request failed with status: ` + response.status);
    }
    const posts = await response.json();
    if (document.getElementById("sectionSimilarPosts")) {
        displayMatchingPosts(posts);
    }
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}
fetchAllPosts(allPostsUrl);
