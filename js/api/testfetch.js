// Replace 'http://squareeyes.local' with your WordPress site URL
const apiBase = 'https://www.bawkposts.no';
const blogPosts = '/wp-json/wp/v2/posts';
const showAllBlogPosts = '?per_page=50';
const show6blogPosts = '?per_page=6';
const page2 = '?page=2';
const _embed = '&_embed=1';
const embedNoPosts = '?_embed=1';

// Full URLs
export const fullURL = apiBase + blogPosts + embedNoPosts;


const apiUrl = 'https://www.kineon.no/wp-json/wp/v2';


// Function to fetch images from a specific post
export async function fetchImages(postId) {
  try {
    // Fetch the post data
    const response = await fetch(`${apiUrl}/media/${postId}`);
    const postData = await response.json();

    // Extract the featured media ID from the post data
    const featuredMediaId = postData.featured_media;

    // Check if featured media ID is available
    if (featuredMediaId) {
      // Fetch the media data
      const mediaResponse = await fetch(`${apiUrl}/media/${featuredMediaId}`);
      const mediaData = await mediaResponse.json();

      // Access the media URL from the media data
      const imageUrl = mediaData.source_url;

      console.log(imageUrl);
    } else {
      console.log('No featured media for this post.');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Replace 'postId' with the ID of the specific post you want to fetch images from
const postId = 101; // Replace with the actual post ID
fetchImages(postId);

