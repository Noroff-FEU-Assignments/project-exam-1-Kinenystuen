import { displayPosts, showMorePosts } from "../display/displayPosts.js"; 
import { displayCarousel } from "../display/displaycarousel.js";


const baseUrl = "https://www.kineon.no/wp-json/wp/v2/posts";

export let totalPosts;

export async function fetchApi(url) {
    try {
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error(`API request failed with status: `+ response.status)
        }
        const posts = await response.json();
        totalPosts = response.headers.get('X-WP-Total');
        console.log(posts);
        
        displayPosts(posts);
        displayCarousel(posts);
        return posts;
    }
    catch (error) {
        console.log("Error: " + error);
    }

}

fetchApi(baseUrl);