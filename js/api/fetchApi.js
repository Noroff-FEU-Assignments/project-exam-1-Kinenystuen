import { renderPosts } from "../render/renderPosts.js";


const baseUrl = "https://www.kineon.no";
const blogPosts = `/wp-json/wp/v2/posts`
const _embed = `&_embed=1`;
const _embedNoPosts = `?_embed=1`

const fullURL = baseUrl + blogPosts;

export async function fetchApi() {
    try {
        const response = await fetch(fullURL);
        if(!response.ok) {
            throw new Error(`API request failed with status: `+ response.status)
        }
        const posts = await response.json();
        console.log(posts);

        renderPosts(posts);
        return posts;
    }
    catch (error) {
        console.log("Error: " + error);
    }

}

fetchApi();