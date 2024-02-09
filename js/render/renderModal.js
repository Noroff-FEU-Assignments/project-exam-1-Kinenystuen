

let modal = "";
export async function openModal(imageSrc, imageAlt, images, imagesLength, currentImageIndex) {
  modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  const captionText = document.getElementById(`caption`);

  // checks is there is alt text for the image
  if (!imageAlt) {
    //imageAlt = `No caption`;
  }

  modal.style.display = "block";
  modal.classList.add("modalActive");
  modalImage.src = imageSrc;
  modalImage.alt = "Image Preview";
  captionText.innerHTML = imageAlt;

  
  // Function to navigate to the next image
  function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % imagesLength;
    const nextImage = images[currentImageIndex];
  
    // Get attributes of the next image
    const nextImagePath = nextImage.getAttribute("src");
    const nextImageAlt = nextImage.getAttribute("alt");
    openModal(nextImagePath, nextImageAlt, images, imagesLength, currentImageIndex);
  }

  // Function to navigate to the previous image
  function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + imagesLength) % imagesLength;
    console.log("Previous image index:", currentImageIndex); // Add this line
    const nextImage = images[currentImageIndex];
  
    // Get attributes of the next image
    const prevImagePath = nextImage.getAttribute("src");
    const prevImageAlt = nextImage.getAttribute("alt");
    openModal(prevImagePath, prevImageAlt, images, imagesLength, currentImageIndex);
  }

  // If else to check is the modal is open
  // Eventlistener for moving between the images
  if (modal.classList.contains("modalActive")) {
    document.addEventListener("keydown", function (event) {
      if (event.key === "ArrowRight") {
        nextImage();
      }
      if (event.key === "ArrowLeft") {
        prevImage();
      }
    });    
  }else {
    document.removeEventListener("keydown", function (event) {
      if (event.key === "ArrowRight") {
        nextImage();
      }
      if (event.key === "ArrowLeft") {
        prevImage();
      }
    });
  }
  
  // Create touch event listener for swiping between images
  let startX;
  let endX;
  

  if (modal.classList.contains("modalActive")) {
    modal.addEventListener("touchstart", function (event) {
      startX = event.touches[0].clientX;
    });

    modal.addEventListener("touchmove", function (event) {
      endX = event.touches[0].clientX;
    });
    modal.addEventListener("touchend", function (event) {
      const threshold = 20; // fingermove length

      const touchEndX = event.changedTouches[0].clientX;

      if (startX - touchEndX > threshold) {
        // Swiped left
        nextImage();
      } else if (touchEndX - startX > threshold) {
        // Swiped right
        prevImage();
      }
    });
  }
  else  {}

}

function closeModal() {
  modal.style.display = "none";
  modal.classList.remove("modalActive");
}

// Get the <span> element that closes the modal
let span = document.querySelector(".close");

// When the user clicks on <span> (x), close the modal
if (span) {
  span.addEventListener("click", function () {
    closeModal();
  });
}
window.onclick = function (event) {
  if (event.target === modal) {
    closeModal();
  }
};

// Event listener for keydown event
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" || event.key === "Esc" || event.keyCode === 27) {
    closeModal();
  }
});
