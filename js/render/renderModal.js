
let modal = "";
export async function openModal(imageSrc, imageAlt) {
    modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const captionText = document.getElementById(`caption`);
  
    // checks is there is alt text for the image
    if (!imageAlt) {
        imageAlt = `No caption`;
    }


    modal.style.display = 'block';
    modalImage.src = imageSrc;
    modalImage.alt = 'Image Preview';
    captionText.innerHTML = imageAlt;
    console.log(imageAlt);
    console.log(imageSrc)
  }
  
// Get the <span> element that closes the modal
let span = document.querySelector(".close");

// When the user clicks on <span> (x), close the modal
if (span) {
  span.addEventListener("click", function () {
    modal.style.display = "none"
});
} 
  window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
  };
  