import { displayPosts, showMorePosts } from "../display/displayPosts.js";
import { displayCarousel } from "../display/displaycarousel.js";

const baseUrl = "https://www.kineon.no/wp-json/";
const posts = "wp/v2/posts";
const embed = "?_embed";
const fullUrl = baseUrl + posts + embed;

const currentUrl = window.location.href;

export let totalPosts;

export async function fetchApi(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API request failed with status: ` + response.status);
    } else {
      const posts = await response.json();
      totalPosts = response.headers.get("X-WP-Total");

      // checking currentUrl
      if (currentUrl.includes("blog_posts")) {
        displayPosts(posts);
      }
      if (
        currentUrl === window.location.origin ||
        currentUrl === window.location.origin + "/" ||
        currentUrl.includes("index.html")
      ) {
        // displayCarousel(posts);
        displayCarousel(posts);
      }

      return posts;
    }
  } catch (error) {
    console.log("Error: " + error);
  }
}

fetchApi(fullUrl);
