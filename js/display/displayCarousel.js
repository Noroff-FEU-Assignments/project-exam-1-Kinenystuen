import { fetchApi } from "../api/fetchApi.js";
import { clearHTML } from "../render/clearHTML.js";

export async function displayCarousel(posts) {
    // Sort posts by date in descending order
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Take the first 4 posts
    const latestPosts = posts.slice(0, 6);

    const carouselContainer = document.querySelector('.carouselContainer');
    clearHTML(carouselContainer);
    let slideIndex = 1;

    function createCarouselDiv(post, index, total) {
        const carouselDiv = document.createElement('div');
        carouselDiv.className = 'carouselDiv';

        const carouselP = document.createElement('p');
        carouselP.className = 'numbertext';
        carouselP.innerText = `${index + 1} / ${total}`;

        const leftButton = document.createElement('button');
        leftButton.className = 'leftButton';
        leftButton.innerHTML = '&#10094;';

        const rightButton = document.createElement('button');
        rightButton.className = 'rightButton';
        rightButton.innerHTML = '&#10095;';

        const parser = new DOMParser();
        const doc = parser.parseFromString(post.content.rendered, 'text/html');

        const images = doc.querySelectorAll('img');
        const image = images[0].attributes.src.nodeValue;

        const carouselImg = document.createElement('img');
        carouselImg.src = image;
        carouselImg.className = 'carouselImg';

        const title = document.createElement('h2');
        title.className = 'carouselTitle';
        title.innerHTML = post.title.rendered;

        const titleLink = document.createElement(`a`);
        titleLink.href = `/html/blog_post.html?id=${post.id}`;
        titleLink.appendChild(title);

        carouselDiv.appendChild(carouselImg);
        carouselDiv.appendChild(carouselP);
        carouselDiv.appendChild(titleLink);
        carouselDiv.appendChild(leftButton);
        carouselDiv.appendChild(rightButton);

        // Add click event listeners to the buttons
        leftButton.addEventListener('click', function () {
            plusSlides(-1);
        });

        rightButton.addEventListener('click', function () {
            plusSlides(1);
        });

        return carouselDiv;
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function showSlides(n) {
        let i;
        const slides = document.getElementsByClassName("carouselDiv");
        const captionText = document.getElementById("caption");

        if (n > slides.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = slides.length }

        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        slides[slideIndex - 1].style.display = "block";
        captionText.innerHTML = slides[slideIndex - 1].querySelector('img').alt;
    }

    // Append the carousel divs to the container
    latestPosts.forEach((post, index) => {
        const carouselDiv = createCarouselDiv(post, index, latestPosts.length);
        carouselContainer.appendChild(carouselDiv);
    });

    // Show the initial slide
    showSlides(slideIndex);
}

// Fetch your posts from the API
fetchApi(/* Your API URL here */)
    .then(posts => displayCarousel(posts))
    .catch(error => console.error(error));
