//
// functions to make elements slowly dissapear or appear when scrolling
//
const headerTitle = document.querySelector(".headerTitle");
const carouselContainer = document.querySelector(".sectionCarousel");
const headerContainer = document.querySelector(".headerContainer");
const sectionInfo = document.getElementById("sectionInfo");

export function scrollIn() {
    window.addEventListener("scroll", function() {
        var rect = carouselContainer.getBoundingClientRect();
        var distanceFromTop = rect.top -200;
        var opacity = 1 - (distanceFromTop / 800);
        opacity = Math.min(1, Math.max(0, opacity));
        carouselContainer.style.opacity = opacity;
    });
}
if (document.querySelector(".sectionCarousel")) {
    scrollIn();
}

export function scrollOut100() {
    window.addEventListener("scroll", function() {
        var scrollPosition = window.scrollY;
        var opacity = 1 - (scrollPosition / 400); // Change number as for when it should disapear
        opacity = Math.min(1, Math.max(0, opacity));
        headerTitle.style.opacity = opacity;
      });
}
if (document.querySelector(".headerTitle")) {
    scrollOut100();
}

export function scrollOut600() {
    window.addEventListener("scroll", function() {
        var rect = headerContainer.getBoundingClientRect();
        var distanceFromBottom = window.innerHeight - rect.bottom;
        var opacity = 1 - (distanceFromBottom / 700); // Change number as for when it should disappear
        opacity = Math.min(1, Math.max(0, opacity));
        headerContainer.style.opacity = opacity;
    });
}
if (document.querySelector(".headerContainer")) {
    scrollOut600();
}


//
//
// function to make the header nav menu appear at the homepage when header image is scrolled past
const headerHome = document.querySelector('.headerHome');
const container = document.querySelector(".headerContainer");
const offset = 100;

// Add scroll event listener
export function scrollheader() {
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const triggerBottom = container.getBoundingClientRect().bottom - offset;
        const isPastTrigger = triggerBottom <= scrollPosition;
        if (isPastTrigger) {
            headerHome.classList.add('visible');
        } else {
            headerHome.classList.remove('visible');
        }
    });
}
if(document.querySelector(".headerContainer")) {
    scrollheader();
}

export function scrollIcon() {
    
const scrollIcon = document.getElementById("goDownIcon");

// Function to pulse the icon
function pulseIcon() {
    scrollIcon.classList.add('pulse');
}

// Start pulsing the icon after 3 seconds
setTimeout(() => {
    pulseIcon();
}, 3000);

// Event listener to remove pulsing when scrolling starts
window.addEventListener('scroll', function() {
    // If the user has scrolled, remove the pulsing effect
    if (window.scrollY > 0) {
        scrollIcon.classList.remove('pulse');
    }
    else {
        scrollIcon.classList.add('pulse');   
    }
});

// Function to handle smooth scrolling to the section
scrollIcon.addEventListener("click", function() {
    const sectionPos = sectionInfo.getBoundingClientRect().top;
    const scrollTo = window.scrollY + sectionPos - (window.innerHeight * 0.2);
    
    window.scrollTo({
        top: scrollTo,
        behavior: "smooth"
    });
});

}
if (document.getElementById("sectionInfo")) {
    scrollIcon();
}


// Arrow up
if (document.getElementById("arrowUpButton")) {
    window.addEventListener("scroll", function() {
        var arrowUpButton = document.getElementById("arrowUpButton");
        if (window.scrollY > 300) { // Adjust the scroll position as needed
            arrowUpButton.style.display = "block";
        } else {
            arrowUpButton.style.display = "none";
        }
    });
    
    document.getElementById("arrowUpButton").addEventListener("click", function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
