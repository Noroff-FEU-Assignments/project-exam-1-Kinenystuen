import { displaySelProduct } from "../render/renderSelPost.js"; 

// Finds the id in the queryString
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const idSelectedPost = params.get("id");


export const selUrl = "https://kineon.no/wp-json/wp/v2/posts/" + idSelectedPost;

export async function fetchSelApi(url) {
    try {
      const responseSM = await fetch(url);
      // If the url is wrong, then this (throw new Error) will make an error
      if (!responseSM.ok) {
        throw new Error(`API request failed with status: ` + responseSM.status);
      }
      const post = await responseSM.json();
      displaySelProduct(post);

      return post;
  
    } catch (error) {
      console.log("Error selectedMovie: " + error);
    }
  }
  
  fetchSelApi(selUrl);