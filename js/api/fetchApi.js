import { displayPosts, showMorePosts } from "../display/displayPosts.js";
import { displayCarousel } from "../display/displaycarousel.js";
import { scrollheader, scrollIn, scrollOut100, scrollOut600, scrollIcon } from "../render/scroll.js";

const baseUrl = "https://www.kineon.no/wp-json/";
const posts = "wp/v2/posts";
const embed = "?_embed";
const fullUrl = baseUrl + posts + embed;

const currentUrl = window.location.href;


export let totalPosts;

export async function fetchApi(url) {
  try {
    const response = await fetch(url);
    console.log(url)
    if (!response.ok) {
      throw new Error(`API request failed with status: ` + response.status);
    }
    const posts = await response.json();
    totalPosts = response.headers.get("X-WP-Total");
    console.log(posts);

    // checking currentUrl 
    if (currentUrl.includes("blog_posts")) {
        displayPosts(posts);
    }
    if (currentUrl === window.location.origin || currentUrl === window.location.origin + "/" || currentUrl.includes("index.html")) {
        // displayCarousel(posts);
        displayCarousel(posts);
        //scrolls
        scrollOut600();
        scrollOut100();
        scrollIn();
        scrollheader();
        scrollIcon();
    }
    
    return posts;
  } catch (error) {
    console.log("Error: " + error);
  }
}

fetchApi(fullUrl);