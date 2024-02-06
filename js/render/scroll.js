//
// functions to make elements slowly dissapear or appear when scrolling
//
const headerTitle = document.querySelector(".headerTitle");
const carouselContainer = document.querySelector(".sectionCarousel");
const headerContainer = document.querySelector(".headerContainer");

export function scrollIn(element) {
    window.addEventListener("scroll", function() {
        var rect = element.getBoundingClientRect();
        var distanceFromTop = rect.top -200;
        var opacity = 1 - (distanceFromTop / 600);
        opacity = Math.min(1, Math.max(0, opacity));
        element.style.opacity = opacity;
    });
}
scrollIn(carouselContainer);

export function scrollOut100(element) {
    window.addEventListener("scroll", function() {
        var scrollPosition = window.scrollY;
        var opacity = 1 - (scrollPosition / 100); // Change number as for when it should disapear
        opacity = Math.min(1, Math.max(0, opacity));
        element.style.opacity = opacity;
      });
}
scrollOut100(headerTitle);

export function scrollOut600(element) {
    window.addEventListener("scroll", function() {
        var rect = element.getBoundingClientRect();
        var distanceFromBottom = window.innerHeight - rect.bottom;
        var opacity = 1 - (distanceFromBottom / 600); // Change number as for when it should disappear
        opacity = Math.min(1, Math.max(0, opacity));
        element.style.opacity = opacity;
    });
}
scrollOut600(headerContainer);

//
//
// function to make the header nav menu appear at the homepage when header image is scrolled past
const headerHome = document.querySelector('.headerHome');
const container = document.querySelector(".headerContainer");
const offset = 100;
const triggerBottom = container.getBoundingClientRect().bottom - offset;
// Add scroll event listener
export function scrollheader() {
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const isPastTrigger = triggerBottom <= scrollPosition;
        if (isPastTrigger) {
            headerHome.classList.add('visible');
        } else {
            headerHome.classList.remove('visible');
        }
    });
}
scrollheader();

